import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response, type NextFunction } from 'express';
import WebSocket from 'ws';
import { PackStore, RoomCluster, generatePackWithAi } from '@partynode/game-engine';
import type {
  ContentPack,
  GameMode,
  GatewayToNodeMessage,
  NodeToGatewayMessage
} from '@partynode/shared';
import { renderLocalStudioHtml } from './studioHtml.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nodePort = Number(process.env.NODE_PORT || 8080);
const gatewayWsUrl = process.env.GATEWAY_WS_URL || 'ws://localhost:3001/ws/node';
const pairingToken = process.env.PAIRING_TOKEN || 'pn_dev_local_token';
const nodeName = process.env.NODE_NAME || 'Community Self-Hosted Node';
const adminKey = (process.env.NODE_ADMIN_KEY || '').trim();
const dataDir = process.env.NODE_DATA_DIR || path.resolve(__dirname, '../../../data/node');
const NODE_VERSION = '1.1.0';

const packStore = new PackStore(path.join(dataDir, 'custom-packs.json'));

let tunnelWs: WebSocket | null = null;
let tunnelConnected = false;
let pairedGuildId: string | null = null;
let reconnectAttempt = 0;

const cluster = new RoomCluster(packStore, (instanceId, playerId, event) => {
  if (tunnelWs && tunnelWs.readyState === WebSocket.OPEN) {
    const out: NodeToGatewayMessage = {
      type: 'send_to_player',
      instanceId,
      playerId,
      event
    };
    tunnelWs.send(JSON.stringify(out));
  }
});
cluster.startTicker();

function connectTunnel(): void {
  if (!pairingToken) {
    console.warn('[Self-Hosted Node] No PAIRING_TOKEN set! Waiting for configuration...');
    return;
  }

  const ws = new WebSocket(gatewayWsUrl, {
    headers: {
      Authorization: `Bearer ${pairingToken}`
    }
  });
  tunnelWs = ws;

  ws.on('open', () => {
    tunnelConnected = true;
    reconnectAttempt = 0;
    console.log(`[Self-Hosted Node] Connected outbound tunnel to ${gatewayWsUrl}`);
    const hello: NodeToGatewayMessage = {
      type: 'node_hello',
      nodeName,
      nodeVersion: NODE_VERSION
    };
    ws.send(JSON.stringify(hello));
  });

  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(String(raw)) as GatewayToNodeMessage;
      if (msg.type === 'tunnel_welcome') {
        pairedGuildId = msg.guildId;
        console.log(`[Self-Hosted Node] Paired & active for Discord Guild: ${msg.guildId}`);
      } else if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong', ts: msg.ts } satisfies NodeToGatewayMessage));
      } else if (msg.type === 'hosting_update') {
        if (pairedGuildId) {
          cluster.updateGuildHosting(pairedGuildId, msg.hosting);
        }
      } else if (msg.type === 'player_join') {
        const gid = pairedGuildId ?? msg.hosting.guildId;
        const room = cluster.getOrCreateRoom(msg.instanceId, gid, msg.hosting);
        room.updateHostingInfo(msg.hosting);
        room.joinPlayer(msg.player);
      } else if (msg.type === 'player_leave') {
        cluster.getRoom(msg.instanceId)?.leavePlayer(msg.playerId);
      } else if (msg.type === 'player_action') {
        cluster.getRoom(msg.instanceId)?.handleAction(msg.playerId, msg.isAdmin, msg.action);
      }
    } catch (err) {
      console.warn('[Self-Hosted Node] Error processing tunnel message:', err);
    }
  });

  ws.on('close', (code, reason) => {
    tunnelConnected = false;
    const reasonText = reason.toString() || 'closed';
    console.warn(`[Self-Hosted Node] Tunnel disconnected (${code}: ${reasonText}). Reconnecting...`);
    scheduleReconnect();
  });

  ws.on('error', (err) => {
    console.warn(`[Self-Hosted Node] Tunnel connection error: ${err.message}`);
  });
}

function scheduleReconnect(): void {
  reconnectAttempt++;
  const baseDelay = Math.min(15_000, 1000 * Math.pow(1.6, reconnectAttempt));
  const jitter = Math.floor(Math.random() * 500);
  setTimeout(() => connectTunnel(), baseDelay + jitter);
}

// ============================================================================
// Local Pack Studio HTTP Server (:8080)
// ============================================================================
const app = express();
app.use(express.json({ limit: '4mb' }));

function checkAdminKey(req: Request, res: Response, next: NextFunction): void {
  if (!adminKey) {
    next();
    return;
  }
  const provided = String(req.headers['x-node-admin-key'] || '');
  if (provided !== adminKey) {
    res.status(401).json({ error: 'Invalid or missing NODE_ADMIN_KEY.' });
    return;
  }
  next();
}

app.get('/', (_req, res) => {
  res.type('html').send(renderLocalStudioHtml(nodeName));
});

app.get('/api/status', (_req, res) => {
  res.json({
    ok: true,
    nodeName,
    nodeVersion: NODE_VERSION,
    tunnelConnected,
    guildId: pairedGuildId,
    gatewayWsUrl,
    aiConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_BASE_URL),
    activeRooms: cluster.getActiveRoomSummaries()
  });
});

app.get('/api/packs', checkAdminKey, (_req, res) => {
  res.json(packStore.getAllPacks());
});

app.post('/api/ai/generate', checkAdminKey, async (req, res) => {
  try {
    const { game, topic, count, familyFriendly, apiKey } = req.body ?? {};
    const result = await generatePackWithAi({
      game: (game || 'punchline_clash') as GameMode,
      topic: String(topic || 'Party Night'),
      count: Number(count) || 6,
      familyFriendly: Boolean(familyFriendly),
      apiKey: apiKey ? String(apiKey) : undefined
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.post('/api/packs', checkAdminKey, (req, res) => {
  const pack = req.body as ContentPack;
  const result = packStore.upsertCustomPack(pack);
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }
  for (const summary of cluster.getActiveRoomSummaries()) {
    cluster.getRoom(summary.instanceId)?.broadcastSnapshots();
  }
  res.json({ ok: true, pack: result.pack });
});

app.delete('/api/packs/:packId', checkAdminKey, (req, res) => {
  const result = packStore.deleteCustomPack(String(req.params.packId));
  if (!result.ok) {
    res.status(400).json({ error: result.error });
    return;
  }
  for (const summary of cluster.getActiveRoomSummaries()) {
    cluster.getRoom(summary.instanceId)?.broadcastSnapshots();
  }
  res.json({ ok: true });
});

app.listen(nodePort, '0.0.0.0', () => {
  console.log(`[Self-Hosted Node] Local Pack Studio UI running at http://localhost:${nodePort}`);
  connectTunnel();
});
