import fs from 'node:fs';
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

export interface NodeSavedConfig {
  nodeName: string;
  gatewayWsUrl: string;
  pairingToken: string;
  adminKey: string;
  geminiApiKey: string;
  openaiBaseUrl: string;
  openaiApiKey: string;
  openaiModel: string;
}

const isProd = process.env.NODE_ENV === 'production';
const nodePort = Number(process.env.NODE_PORT || 8080);
const dataDir = process.env.NODE_DATA_DIR || path.resolve(__dirname, '../../../data/node');
const configFilePath = path.join(dataDir, 'node-config.json');
const NODE_VERSION = '1.2.0';

function parseQuickPairCode(rawInput: string): { gatewayWsUrl: string; pairingToken: string } | null {
  const trimmed = rawInput.trim();
  if (!trimmed.startsWith('pnpair_')) return null;
  try {
    const json = Buffer.from(trimmed.slice('pnpair_'.length), 'base64url').toString('utf8');
    const parsed = JSON.parse(json) as { gatewayWsUrl?: string; pairingToken?: string };
    if (parsed.gatewayWsUrl && parsed.pairingToken) {
      return {
        gatewayWsUrl: String(parsed.gatewayWsUrl).trim(),
        pairingToken: String(parsed.pairingToken).trim()
      };
    }
  } catch {
    // Ignore invalid quick-pair payload
  }
  return null;
}

function loadNodeConfig(): NodeSavedConfig {
  const defaults: NodeSavedConfig = {
    nodeName: process.env.NODE_NAME || 'My Community PartyNode',
    gatewayWsUrl: process.env.GATEWAY_WS_URL || (isProd ? '' : 'ws://localhost:3001/ws/node'),
    pairingToken: process.env.PAIRING_TOKEN || (isProd ? '' : 'pn_dev_local_token'),
    adminKey: (process.env.NODE_ADMIN_KEY || '').trim(),
    geminiApiKey: (process.env.GEMINI_API_KEY || '').trim(),
    openaiBaseUrl: (process.env.OPENAI_BASE_URL || '').trim(),
    openaiApiKey: (process.env.OPENAI_API_KEY || '').trim(),
    openaiModel: (process.env.OPENAI_MODEL || '').trim()
  };

  try {
    if (fs.existsSync(configFilePath)) {
      const saved = JSON.parse(fs.readFileSync(configFilePath, 'utf8')) as Partial<NodeSavedConfig>;
      return {
        nodeName: saved.nodeName ?? defaults.nodeName,
        gatewayWsUrl: saved.gatewayWsUrl ?? defaults.gatewayWsUrl,
        pairingToken: saved.pairingToken ?? defaults.pairingToken,
        adminKey: saved.adminKey ?? defaults.adminKey,
        geminiApiKey: saved.geminiApiKey ?? defaults.geminiApiKey,
        openaiBaseUrl: saved.openaiBaseUrl ?? defaults.openaiBaseUrl,
        openaiApiKey: saved.openaiApiKey ?? defaults.openaiApiKey,
        openaiModel: saved.openaiModel ?? defaults.openaiModel
      };
    }
  } catch (err) {
    console.warn('[Self-Hosted Node] Could not read node-config.json, using defaults:', err);
  }
  return defaults;
}

function saveNodeConfig(cfg: NodeSavedConfig): void {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(configFilePath, JSON.stringify(cfg, null, 2), { encoding: 'utf8', mode: 0o600 });
}

function syncAiEnvFromConfig(cfg: NodeSavedConfig): void {
  process.env.GEMINI_API_KEY = cfg.geminiApiKey || '';
  process.env.OPENAI_BASE_URL = cfg.openaiBaseUrl || '';
  process.env.OPENAI_API_KEY = cfg.openaiApiKey || '';
  process.env.OPENAI_MODEL = cfg.openaiModel || '';
}

function maskTokenHint(token: string): string | null {
  if (!token) return null;
  if (token.length <= 12) return '••••••••';
  return `${token.slice(0, 8)}••••${token.slice(-4)}`;
}

let nodeConfig = loadNodeConfig();
syncAiEnvFromConfig(nodeConfig);

const packStore = new PackStore(path.join(dataDir, 'custom-packs.json'));

let tunnelWs: WebSocket | null = null;
let tunnelConnected = false;
let pairedGuildId: string | null = null;
let lastTunnelError: string | null = null;
let reconnectAttempt = 0;
let reconnectTimer: NodeJS.Timeout | null = null;

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

function clearReconnectTimer(): void {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
}

function disconnectCurrentTunnel(): void {
  clearReconnectTimer();
  if (tunnelWs) {
    const old = tunnelWs;
    tunnelWs = null;
    old.removeAllListeners();
    try {
      old.close(1000, 'Reconfiguring node');
    } catch {
      old.terminate();
    }
  }
  tunnelConnected = false;
  pairedGuildId = null;
}

function connectTunnel(): void {
  clearReconnectTimer();

  if (!nodeConfig.pairingToken || !nodeConfig.gatewayWsUrl) {
    tunnelConnected = false;
    pairedGuildId = null;
    console.log(
      `[Self-Hosted Node] Waiting for browser setup at http://localhost:${nodePort} (no Gateway URL / Pairing Token configured yet).`
    );
    return;
  }

  let ws: WebSocket;
  try {
    ws = new WebSocket(nodeConfig.gatewayWsUrl, {
      headers: {
        Authorization: `Bearer ${nodeConfig.pairingToken}`
      }
    });
  } catch (err) {
    lastTunnelError = `Invalid Gateway WebSocket URL: ${(err as Error).message}`;
    tunnelConnected = false;
    return;
  }

  tunnelWs = ws;

  ws.on('open', () => {
    if (tunnelWs !== ws) return;
    tunnelConnected = true;
    lastTunnelError = null;
    reconnectAttempt = 0;
    console.log(`[Self-Hosted Node] Connected outbound tunnel to ${nodeConfig.gatewayWsUrl}`);
    const hello: NodeToGatewayMessage = {
      type: 'node_hello',
      nodeName: nodeConfig.nodeName,
      nodeVersion: NODE_VERSION
    };
    ws.send(JSON.stringify(hello));
  });

  ws.on('message', (raw) => {
    if (tunnelWs !== ws) return;
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
    if (tunnelWs !== ws) return;
    tunnelConnected = false;
    const reasonText = reason.toString() || 'closed';
    if (code === 4001 || code === 4002) {
      lastTunnelError = `Rejected by Gateway (${reasonText}). Generate or paste a fresh Pairing Token from Discord.`;
      console.warn(`[Self-Hosted Node] ${lastTunnelError}`);
      return; // Don't loop forever on a revoked token; wait for user to save new token in browser UI
    }
    lastTunnelError = `Disconnected (${code}: ${reasonText}) — retrying automatically...`;
    console.warn(`[Self-Hosted Node] Tunnel disconnected (${code}: ${reasonText}). Reconnecting...`);
    scheduleReconnect();
  });

  ws.on('error', (err) => {
    if (tunnelWs !== ws) return;
    lastTunnelError = err.message;
    console.warn(`[Self-Hosted Node] Tunnel connection error: ${err.message}`);
  });
}

function scheduleReconnect(): void {
  clearReconnectTimer();
  if (!nodeConfig.pairingToken || !nodeConfig.gatewayWsUrl) return;
  reconnectAttempt++;
  const baseDelay = Math.min(15_000, 1000 * Math.pow(1.6, reconnectAttempt));
  const jitter = Math.floor(Math.random() * 500);
  reconnectTimer = setTimeout(() => connectTunnel(), baseDelay + jitter);
}

function reconnectTunnelNow(): void {
  disconnectCurrentTunnel();
  reconnectAttempt = 0;
  lastTunnelError = null;
  connectTunnel();
}

// ============================================================================
// Local Browser Setup & Pack Studio HTTP Server (:8080)
// ============================================================================
const app = express();
app.use(express.json({ limit: '4mb' }));

function checkAdminKey(req: Request, res: Response, next: NextFunction): void {
  if (!nodeConfig.adminKey) {
    next();
    return;
  }
  const provided = String(req.headers['x-node-admin-key'] || '');
  if (provided !== nodeConfig.adminKey) {
    res.status(401).json({ error: 'Local Studio is password-protected. Enter your Admin Password.' });
    return;
  }
  next();
}

app.get('/', (_req, res) => {
  res.type('html').send(renderLocalStudioHtml(nodeConfig.nodeName));
});

app.get('/api/status', (_req, res) => {
  const needsSetup = !nodeConfig.pairingToken || !nodeConfig.gatewayWsUrl;
  res.json({
    ok: true,
    nodeName: nodeConfig.nodeName,
    nodeVersion: NODE_VERSION,
    needsSetup,
    tunnelConnected,
    lastTunnelError,
    guildId: pairedGuildId,
    gatewayWsUrl: nodeConfig.gatewayWsUrl,
    hasAdminKey: Boolean(nodeConfig.adminKey),
    aiConfigured: Boolean(nodeConfig.geminiApiKey || nodeConfig.openaiBaseUrl),
    activeRooms: cluster.getActiveRoomSummaries()
  });
});

app.get('/api/config', checkAdminKey, (_req, res) => {
  res.json({
    nodeName: nodeConfig.nodeName,
    gatewayWsUrl: nodeConfig.gatewayWsUrl,
    hasPairingToken: Boolean(nodeConfig.pairingToken),
    pairingTokenHint: maskTokenHint(nodeConfig.pairingToken),
    hasAdminKey: Boolean(nodeConfig.adminKey),
    geminiConfigured: Boolean(nodeConfig.geminiApiKey),
    openaiBaseUrl: nodeConfig.openaiBaseUrl,
    openaiKeyConfigured: Boolean(nodeConfig.openaiApiKey),
    openaiModel: nodeConfig.openaiModel
  });
});

app.post('/api/config', checkAdminKey, (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;

  let nextGatewayUrl =
    typeof body.gatewayWsUrl === 'string' ? body.gatewayWsUrl.trim() : nodeConfig.gatewayWsUrl;
  let nextPairingToken =
    typeof body.pairingToken === 'string' && body.pairingToken.trim()
      ? body.pairingToken.trim()
      : nodeConfig.pairingToken;

  // Support 1-click Quick-Pair Code in either quickPairCode or pairingToken field
  const quickCode =
    (typeof body.quickPairCode === 'string' && body.quickPairCode.trim()) ||
    (typeof body.pairingToken === 'string' && body.pairingToken.trim().startsWith('pnpair_')
      ? body.pairingToken.trim()
      : '');

  if (quickCode) {
    const decoded = parseQuickPairCode(quickCode);
    if (!decoded) {
      res.status(400).json({ error: 'Invalid Quick-Pair Code format. Copy the full pnpair_... code from Discord.' });
      return;
    }
    nextGatewayUrl = decoded.gatewayWsUrl;
    nextPairingToken = decoded.pairingToken;
  }

  // Normalize https:// -> wss:// and http:// -> ws:// if user pasted a regular HTTP URL
  if (nextGatewayUrl) {
    nextGatewayUrl = nextGatewayUrl
      .replace(/^https:\/\//i, 'wss://')
      .replace(/^http:\/\//i, 'ws://');
    if (!nextGatewayUrl.endsWith('/ws/node')) {
      nextGatewayUrl = nextGatewayUrl.replace(/\/$/, '') + '/ws/node';
    }
  }

  const nextNodeName =
    typeof body.nodeName === 'string' && body.nodeName.trim()
      ? body.nodeName.trim().slice(0, 50)
      : nodeConfig.nodeName;

  let nextAdminKey = nodeConfig.adminKey;
  if (body.clearAdminKey === true) {
    nextAdminKey = '';
  } else if (typeof body.newAdminKey === 'string' && body.newAdminKey.trim()) {
    nextAdminKey = body.newAdminKey.trim();
  }

  let nextGeminiKey = nodeConfig.geminiApiKey;
  if (body.clearGeminiKey === true) {
    nextGeminiKey = '';
  } else if (typeof body.geminiApiKey === 'string' && body.geminiApiKey.trim()) {
    nextGeminiKey = body.geminiApiKey.trim();
  }

  let nextOpenaiKey = nodeConfig.openaiApiKey;
  if (body.clearOpenaiKey === true) {
    nextOpenaiKey = '';
  } else if (typeof body.openaiApiKey === 'string' && body.openaiApiKey.trim()) {
    nextOpenaiKey = body.openaiApiKey.trim();
  }

  const nextOpenaiBaseUrl =
    typeof body.openaiBaseUrl === 'string' ? body.openaiBaseUrl.trim() : nodeConfig.openaiBaseUrl;
  const nextOpenaiModel =
    typeof body.openaiModel === 'string' ? body.openaiModel.trim() : nodeConfig.openaiModel;

  nodeConfig = {
    nodeName: nextNodeName,
    gatewayWsUrl: nextGatewayUrl,
    pairingToken: nextPairingToken,
    adminKey: nextAdminKey,
    geminiApiKey: nextGeminiKey,
    openaiBaseUrl: nextOpenaiBaseUrl,
    openaiApiKey: nextOpenaiKey,
    openaiModel: nextOpenaiModel
  };

  saveNodeConfig(nodeConfig);
  syncAiEnvFromConfig(nodeConfig);
  reconnectTunnelNow();

  res.json({
    ok: true,
    nodeName: nodeConfig.nodeName,
    gatewayWsUrl: nodeConfig.gatewayWsUrl,
    pairingTokenHint: maskTokenHint(nodeConfig.pairingToken),
    hasAdminKey: Boolean(nodeConfig.adminKey),
    aiConfigured: Boolean(nodeConfig.geminiApiKey || nodeConfig.openaiBaseUrl)
  });
});

app.post('/api/reconnect', checkAdminKey, (_req, res) => {
  reconnectTunnelNow();
  res.json({ ok: true });
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
  console.log(`[Self-Hosted Node] Browser Setup & Pack Studio UI running at http://localhost:${nodePort}`);
  connectTunnel();
});
