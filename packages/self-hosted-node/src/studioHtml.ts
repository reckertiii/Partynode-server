export function renderLocalStudioHtml(initialNodeName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${initialNodeName} — Node Setup & Pack Studio</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #090d16; color: #f1f5f9; }
    header { background: #111827; border-bottom: 1px solid #1f2937; padding: 18px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .badge { padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
    .online { background: rgba(16, 185, 129, 0.18); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .setup { background: rgba(245, 158, 11, 0.18); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.45); }
    .offline { background: rgba(239, 68, 68, 0.18); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
    .container { max-width: 1180px; margin: 22px auto; padding: 0 20px; }
    .grid-main { display: grid; grid-template-columns: 350px 1fr; gap: 24px; margin-top: 20px; }
    @media (max-width: 860px) { .grid-main { grid-template-columns: 1fr; } }
    .panel { background: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 20px; }
    .setup-card { background: linear-gradient(145deg, #131b31, #0f172a); border: 1px solid #4f46e5; border-radius: 16px; padding: 22px; box-shadow: 0 18px 40px rgba(0,0,0,0.45); }
    h1 { margin: 0; font-size: 20px; }
    h2 { margin: 0 0 14px; font-size: 16px; color: #cbd5e1; }
    label { display: block; font-size: 12px; font-weight: 600; color: #94a3b8; margin-bottom: 5px; }
    button { cursor: pointer; background: #6366f1; color: white; border: none; padding: 9px 14px; border-radius: 8px; font-weight: 600; font-size: 12px; transition: background 0.15s; }
    button:hover { background: #4f46e5; }
    button.emerald { background: #059669; }
    button.emerald:hover { background: #10b981; }
    button.secondary { background: #1f2937; color: #e2e8f0; border: 1px solid #374151; }
    button.secondary:hover { background: #334155; }
    button.danger { background: #dc2626; }
    input, select, textarea { width: 100%; background: #0b0f19; border: 1px solid #334155; color: #f8fafc; border-radius: 8px; padding: 9px 11px; font-size: 13px; margin-bottom: 12px; font-family: inherit; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #6366f1; }
    textarea.code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; min-height: 350px; font-size: 12px; line-height: 1.5; }
    .pack-item { padding: 11px 12px; border: 1px solid #1f2937; border-radius: 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; background: #0d1321; cursor: pointer; }
    .pack-item:hover { border-color: #6366f1; }
    .tag { font-size: 11px; padding: 2px 7px; border-radius: 6px; background: #1e293b; color: #94a3b8; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; }
    .cols-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .cols-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    @media (max-width: 760px) { .cols-2, .cols-3 { grid-template-columns: 1fr; } }
    .ai-box { background: #0d1324; border: 1px solid #3730a3; border-radius: 12px; padding: 14px; margin-bottom: 14px; }
    .quick-box { background: rgba(99, 102, 241, 0.1); border: 1px dashed rgba(129, 140, 248, 0.55); border-radius: 12px; padding: 14px; margin-bottom: 16px; }
    .hint { font-size: 11px; color: #94a3b8; margin-top: -8px; margin-bottom: 12px; }
    .auth-bar { background: #1e1b4b; border: 1px solid #4338ca; border-radius: 12px; padding: 12px 16px; margin-bottom: 16px; display: none; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1 id="headerTitle">🎮 ${initialNodeName} — Node Console & Pack Studio</h1>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;" id="substatus">Checking node configuration...</div>
    </div>
    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
      <div id="tunnelBadge" class="badge setup">Checking...</div>
      <button class="secondary" onclick="toggleSettingsDrawer()">⚙️ Node Settings</button>
    </div>
  </header>

  <div class="container">
    <!-- Password Unlock Bar (shown only if Admin Password is enabled) -->
    <div id="authBar" class="auth-bar">
      <div style="font-size:13px;font-weight:600;color:#e0e7ff;">🔒 This Node Console is protected by an Admin Password.</div>
      <div style="display:flex;gap:8px;align-items:center;">
        <input type="password" id="adminKeyInput" placeholder="Enter Admin Password" style="margin:0;width:220px;" onkeydown="if(event.key==='Enter')unlockConsole()" />
        <button onclick="unlockConsole()">Unlock</button>
      </div>
    </div>

    <!-- Local Browser Node Setup & Configuration Drawer -->
    <section id="settingsDrawer" class="setup-card" style="display:none;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px;">
        <div>
          <h2 style="margin:0;color:#fff;font-size:18px;">⚡ Server Connection & Node Setup</h2>
          <p style="margin:4px 0 0;font-size:13px;color:#94a3b8;">
            Configure everything right here in your browser—saved persistently to your Docker volume with zero container restarts needed.
          </p>
        </div>
        <button class="secondary" onclick="toggleSettingsDrawer()">Hide</button>
      </div>

      <div class="quick-box">
        <label style="color:#c7d2fe;">🚀 1-Click Quick-Pair Code (from Discord → "Host Node" button)</label>
        <input id="cfgQuickPair" placeholder="Paste pnpair_... code from Discord to auto-fill Gateway URL & Token!" oninput="handleQuickPairPaste(this.value)" style="margin-bottom:4px;" />
        <div style="font-size:11px;color:#a5b4fc;">
          In your Discord server, launch <strong>PartyNode</strong> in a Voice Channel → click <strong>Host Node</strong> → click <strong>Generate Server Pairing Token</strong>, then paste the Quick-Pair Code here.
        </div>
      </div>

      <div class="cols-3">
        <div>
          <label>Node Display Name (shown in Discord)</label>
          <input id="cfgNodeName" placeholder="My Community PartyNode" />
        </div>
        <div>
          <label>Gateway WebSocket URL</label>
          <input id="cfgGatewayUrl" placeholder="wss://partynode.yourdomain.com/ws/node" />
        </div>
        <div>
          <label>Server Pairing Token <span id="tokenHintLabel" style="color:#34d399;font-weight:400;"></span></label>
          <input type="password" id="cfgPairingToken" placeholder="Paste pn_live_... (leave blank to keep current)" />
        </div>
      </div>

      <hr style="border:none;border-top:1px solid #1e293b;margin:10px 0 16px;" />

      <div style="font-size:13px;font-weight:700;color:#cbd5e1;margin-bottom:10px;">✨ Optional: AI Pack Generator & Local Security</div>
      <div class="cols-2">
        <div>
          <label>Google Gemini API Key <span id="geminiHintLabel" style="color:#34d399;font-weight:400;"></span></label>
          <input type="password" id="cfgGeminiKey" placeholder="Optional AIza... key for 1-click AI packs (leave blank to keep)" />
          <div class="hint">Powers 1-click AI pack generation in both Discord and this local studio.</div>
        </div>
        <div>
          <label>Local Web Console Password <span id="adminHintLabel" style="color:#fbbf24;font-weight:400;"></span></label>
          <div style="display:flex;gap:8px;">
            <input type="password" id="cfgNewAdminKey" placeholder="Optional password to lock port 8080 on your LAN" style="margin-bottom:12px;" />
            <button class="secondary" id="clearAdminBtn" onclick="saveNodeSettings(true)" style="display:none;margin-bottom:12px;white-space:nowrap;">Remove Lock</button>
          </div>
        </div>
      </div>

      <details style="margin-bottom:14px;">
        <summary style="cursor:pointer;font-size:12px;color:#94a3b8;font-weight:600;">Advanced: Local Ollama / OpenAI-Compatible Endpoint (Optional)</summary>
        <div class="cols-3" style="margin-top:10px;">
          <div>
            <label>OpenAI / Ollama Base URL</label>
            <input id="cfgOpenaiUrl" placeholder="http://host.docker.internal:11434/v1" />
          </div>
          <div>
            <label>Model Name</label>
            <input id="cfgOpenaiModel" placeholder="llama3.1 or gpt-4o-mini" />
          </div>
          <div>
            <label>API Key (if required)</label>
            <input type="password" id="cfgOpenaiKey" placeholder="Optional sk-..." />
          </div>
        </div>
      </details>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div id="cfgMsg" style="font-size:13px;font-weight:600;"></div>
        <div style="display:flex;gap:8px;">
          <button class="secondary" onclick="triggerReconnect()">Reconnect Tunnel</button>
          <button class="emerald" onclick="saveNodeSettings(false)" style="padding:10px 20px;font-size:13px;">💾 Save & Connect Now</button>
        </div>
      </div>
    </section>

    <!-- Pack Studio Grid -->
    <div class="grid-main">
      <section class="panel">
        <h2>Installed Content Packs</h2>
        <div class="row">
          <button onclick="loadTemplate('punchline_clash')">+ Punchline</button>
          <button onclick="loadTemplate('bluff_battle')">+ Bluff Battle</button>
          <button onclick="loadTemplate('survey_showdown')">+ Survey</button>
          <button onclick="loadTemplate('blitz_quiz')">+ BlitzQuiz</button>
        </div>
        <div id="packList"></div>
      </section>

      <section class="panel">
        <div class="ai-box">
          <div style="font-weight:700;font-size:13px;margin-bottom:8px;color:#a5b4fc;">✨ 1-Click AI Pack Generator (Gemini 3.8 Flash / Ollama)</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
            <select id="aiGame">
              <option value="punchline_clash">Punchline Clash</option>
              <option value="bluff_battle">Bluff Battle</option>
              <option value="survey_showdown">Survey Showdown</option>
              <option value="blitz_quiz">BlitzQuiz</option>
            </select>
            <input id="aiTopic" placeholder="Topic (e.g. 90s Cartoons, Elden Ring, Our Server)" />
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <input type="password" id="aiKey" placeholder="Optional one-time Gemini API Key (or save permanently in Node Settings above)" style="margin:0;" />
            <button onclick="generateAi()" style="white-space:nowrap;padding:9px 16px;">Generate Pack</button>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <h2 style="margin:0;">Pack JSON Editor (Visual & CSV Builder also inside Discord!)</h2>
          <div class="row" style="margin:0;">
            <button class="secondary" onclick="exportJson()">Download .json</button>
            <button class="danger" id="deleteBtn" onclick="deleteCurrent()" style="display:none;">Delete</button>
            <button onclick="savePack()">Save to Node</button>
          </div>
        </div>
        <textarea id="editor" class="code" spellcheck="false"></textarea>
        <div id="msg" style="font-size:13px;margin-top:8px;min-height:20px;"></div>
      </section>
    </div>
  </div>

  <script>
    let allPacks = [];
    let selectedPack = null;
    let autoOpenedSetup = false;

    function getStoredAdminKey() {
      return sessionStorage.getItem('partynode_admin_key') || '';
    }

    function headers() {
      const key = getStoredAdminKey();
      const h = { 'Content-Type': 'application/json' };
      if (key) h['x-node-admin-key'] = key;
      return h;
    }

    function unlockConsole() {
      const val = document.getElementById('adminKeyInput').value.trim();
      sessionStorage.setItem('partynode_admin_key', val);
      loadConfigIntoForm();
      refreshPacks();
    }

    function toggleSettingsDrawer(forceState) {
      const el = document.getElementById('settingsDrawer');
      const show = typeof forceState === 'boolean' ? forceState : el.style.display === 'none';
      el.style.display = show ? 'block' : 'none';
      if (show) loadConfigIntoForm();
    }

    function handleQuickPairPaste(val) {
      const trimmed = val.trim();
      if (!trimmed.startsWith('pnpair_')) return;
      try {
        const b64 = trimmed.slice(7).replace(/-/g, '+').replace(/_/g, '/');
        const json = JSON.parse(atob(b64));
        if (json.gatewayWsUrl) document.getElementById('cfgGatewayUrl').value = json.gatewayWsUrl;
        if (json.pairingToken) document.getElementById('cfgPairingToken').value = json.pairingToken;
        setCfgMsg('✨ Quick-Pair Code decoded! Click "Save & Connect Now" to go online.', '#34d399');
      } catch {
        // Backend will validate on save as well
      }
    }

    async function loadConfigIntoForm() {
      const res = await fetch('/api/config', { headers: headers() });
      if (res.status === 401) {
        document.getElementById('authBar').style.display = 'flex';
        return;
      }
      document.getElementById('authBar').style.display = 'none';
      if (!res.ok) return;
      const cfg = await res.json();
      document.getElementById('cfgNodeName').value = cfg.nodeName || '';
      document.getElementById('cfgGatewayUrl').value = cfg.gatewayWsUrl || '';
      document.getElementById('cfgOpenaiUrl').value = cfg.openaiBaseUrl || '';
      document.getElementById('cfgOpenaiModel').value = cfg.openaiModel || '';
      document.getElementById('tokenHintLabel').textContent = cfg.pairingTokenHint ? '(Saved: ' + cfg.pairingTokenHint + ')' : '(Not set yet)';
      document.getElementById('geminiHintLabel').textContent = cfg.geminiConfigured ? '(✓ Key saved)' : '';
      document.getElementById('adminHintLabel').textContent = cfg.hasAdminKey ? '(🔒 Enabled)' : '';
      document.getElementById('clearAdminBtn').style.display = cfg.hasAdminKey ? 'inline-block' : 'none';
    }

    async function saveNodeSettings(clearAdminKey) {
      const newAdminVal = document.getElementById('cfgNewAdminKey').value.trim();
      const payload = {
        quickPairCode: document.getElementById('cfgQuickPair').value.trim(),
        nodeName: document.getElementById('cfgNodeName').value.trim(),
        gatewayWsUrl: document.getElementById('cfgGatewayUrl').value.trim(),
        pairingToken: document.getElementById('cfgPairingToken').value.trim(),
        geminiApiKey: document.getElementById('cfgGeminiKey').value.trim(),
        openaiBaseUrl: document.getElementById('cfgOpenaiUrl').value.trim(),
        openaiModel: document.getElementById('cfgOpenaiModel').value.trim(),
        openaiApiKey: document.getElementById('cfgOpenaiKey').value.trim(),
        newAdminKey: newAdminVal,
        clearAdminKey: Boolean(clearAdminKey)
      };

      setCfgMsg('Saving & connecting...', '#a5b4fc');
      try {
        const res = await fetch('/api/config', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to save configuration');

        if (clearAdminKey) {
          sessionStorage.removeItem('partynode_admin_key');
        } else if (newAdminVal) {
          sessionStorage.setItem('partynode_admin_key', newAdminVal);
        }

        document.getElementById('cfgQuickPair').value = '';
        document.getElementById('cfgPairingToken').value = '';
        document.getElementById('cfgGeminiKey').value = '';
        document.getElementById('cfgNewAdminKey').value = '';
        document.getElementById('cfgOpenaiKey').value = '';

        setCfgMsg('✅ Saved! Connecting to PartyNode Gateway...', '#34d399');
        await loadConfigIntoForm();
        setTimeout(refreshStatus, 700);
      } catch (e) {
        setCfgMsg('❌ ' + e.message, '#f87171');
      }
    }

    async function triggerReconnect() {
      await fetch('/api/reconnect', { method: 'POST', headers: headers() });
      setCfgMsg('🔄 Reconnecting outbound WebSocket tunnel...', '#60a5fa');
      setTimeout(refreshStatus, 800);
    }

    function setCfgMsg(text, color) {
      const el = document.getElementById('cfgMsg');
      el.style.color = color;
      el.textContent = text;
    }

    async function refreshStatus() {
      const res = await fetch('/api/status');
      const data = await res.json();
      document.getElementById('headerTitle').textContent = '🎮 ' + data.nodeName + ' — Node Console & Pack Studio';
      const badge = document.getElementById('tunnelBadge');
      const sub = document.getElementById('substatus');

      if (data.hasAdminKey && !getStoredAdminKey()) {
        document.getElementById('authBar').style.display = 'flex';
      }

      if (data.needsSetup) {
        badge.className = 'badge setup';
        badge.textContent = '⚡ Setup Required — Paste Quick-Pair Code Below';
        sub.textContent = 'No Gateway URL or Pairing Token configured yet • Active Rooms: 0';
        if (!autoOpenedSetup) {
          autoOpenedSetup = true;
          toggleSettingsDrawer(true);
        }
      } else if (data.tunnelConnected) {
        badge.className = 'badge online';
        badge.textContent = '🟢 Tunnel Online (Guild: ' + (data.guildId || 'Paired') + ')';
        sub.textContent = 'Gateway: ' + data.gatewayWsUrl + ' • Active Voice Rooms: ' + data.activeRooms.length + (data.aiConfigured ? ' • ✨ AI Ready' : '');
      } else {
        badge.className = 'badge offline';
        badge.textContent = '🔴 Disconnected';
        sub.textContent = (data.lastTunnelError || 'Connecting to ' + data.gatewayWsUrl + '...');
        if (!autoOpenedSetup) {
          autoOpenedSetup = true;
          toggleSettingsDrawer(true);
        }
      }
    }

    async function refreshPacks() {
      const res = await fetch('/api/packs', { headers: headers() });
      if (res.status === 401) {
        document.getElementById('authBar').style.display = 'flex';
        return;
      }
      if (!res.ok) return;
      allPacks = await res.json();
      const list = document.getElementById('packList');
      list.innerHTML = '';
      for (const p of allPacks) {
        const div = document.createElement('div');
        div.className = 'pack-item';
        div.onclick = () => selectPack(p);
        div.innerHTML = '<div><div style="font-weight:600;font-size:14px;">' + p.title + '</div><div style="font-size:12px;color:#94a3b8;">' + p.game + '</div></div><span class="tag">' + (p.builtIn ? 'Built-in' : 'Custom') + '</span>';
        list.appendChild(div);
      }
      if (!selectedPack && allPacks.length) selectPack(allPacks[0]);
    }

    function selectPack(p) {
      selectedPack = p;
      document.getElementById('editor').value = JSON.stringify(p, null, 2);
      document.getElementById('deleteBtn').style.display = p.builtIn ? 'none' : 'inline-block';
    }

    async function generateAi() {
      const game = document.getElementById('aiGame').value;
      const topic = document.getElementById('aiTopic').value.trim() || 'Game Night';
      const apiKey = document.getElementById('aiKey').value.trim();
      setMsg('✨ Generating "' + topic + '" pack...', '#a5b4fc');
      try {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify({ game, topic, count: 6, familyFriendly: true, apiKey })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed');
        selectPack(data.pack);
        if (data.provider === 'offline-scaffold') {
          setMsg('⚠️ No Gemini API key configured — loaded an editable starter template instead. Add your free AIza... key in Node Settings above!', '#fbbf24');
        } else {
          setMsg('✨ Generated via ' + data.provider + '! Click "Save to Node" to publish.', '#34d399');
        }
      } catch (e) {
        setMsg('❌ ' + e.message, '#f87171');
      }
    }

    function loadTemplate(game) {
      const suffix = Math.floor(1000 + Math.random() * 9000);
      let tpl;
      if (game === 'punchline_clash') {
        tpl = {
          id: 'custom-punchline-' + suffix,
          game: 'punchline_clash',
          title: 'Inside Jokes #' + suffix,
          description: 'Custom prompts written for our server!',
          author: 'Server Admin',
          familyFriendly: true,
          builtIn: false,
          updatedAt: new Date().toISOString(),
          prompts: [
            'The real reason the server owner pinged @everyone at 2 AM.',
            'What happens in General chat when the mods fall asleep.',
            'The worst possible custom role name in this server.',
            'Why nobody trusts our squad leader with driving vehicles in games.'
          ],
          finalPrompts: ['Write the new official motto for this Discord server.']
        };
      } else if (game === 'bluff_battle') {
        tpl = {
          id: 'custom-bluff-' + suffix,
          game: 'bluff_battle',
          title: 'Server Bluff Battle #' + suffix,
          description: 'Real weird facts & inside lore with blanks.',
          author: 'Server Admin',
          familyFriendly: true,
          builtIn: false,
          updatedAt: new Date().toISOString(),
          questions: [
            {
              id: 'bb1',
              category: 'Server Lore',
              prompt: 'During our longest gaming marathon, someone accidentally ordered 12 _______ at midnight.',
              truth: 'Garlic breads',
              decoys: ['Pineapple pizzas', 'Party platters', 'Cups of ranch']
            }
          ]
        };
      } else if (game === 'survey_showdown') {
        tpl = {
          id: 'custom-survey-' + suffix,
          game: 'survey_showdown',
          title: 'Community Survey #' + suffix,
          description: 'Custom ranked survey board with fuzzy aliases.',
          author: 'Server Admin',
          familyFriendly: true,
          builtIn: false,
          updatedAt: new Date().toISOString(),
          questions: [
            {
              id: 'q1',
              prompt: 'Name a game our friend group installs, plays once, and never opens again.',
              answers: [
                { text: 'Survival Crafting Games', points: 40, aliases: ['minecraft', 'valheim', 'rust', 'ark'] },
                { text: 'Co-op Horror Games', points: 30, aliases: ['phasmophobia', 'lethal company', 'horror'] },
                { text: 'MMORPGs', points: 20, aliases: ['wow', 'ffxiv', 'mmo'] },
                { text: 'Fighting Games', points: 10, aliases: ['smash', 'street fighter', 'tekken'] }
              ]
            }
          ]
        };
      } else {
        tpl = {
          id: 'custom-blitz-' + suffix,
          game: 'blitz_quiz',
          title: 'Trivia Night #' + suffix,
          description: 'Fast 4-button trivia for our community.',
          author: 'Server Admin',
          familyFriendly: true,
          builtIn: false,
          updatedAt: new Date().toISOString(),
          questions: [
            {
              id: 'bq1',
              category: 'Server Lore',
              prompt: 'What year was our Discord server originally created?',
              options: ['2020', '2022', '2024', '2026'],
              correctIndex: 2,
              timeLimitSec: 15
            }
          ]
        };
      }
      selectPack(tpl);
      setMsg('Template loaded! Edit and click "Save to Node".', '#60a5fa');
    }

    async function savePack() {
      try {
        const parsed = JSON.parse(document.getElementById('editor').value);
        if (parsed.builtIn) {
          parsed.id = parsed.id.replace(/^builtin-/, 'custom-') + '-remix';
          parsed.title = parsed.title + ' (Remix)';
          parsed.builtIn = false;
        }
        const res = await fetch('/api/packs', {
          method: 'POST',
          headers: headers(),
          body: JSON.stringify(parsed)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to save');
        setMsg('✅ Saved pack "' + data.pack.title + '"! Live in Discord immediately.', '#34d399');
        selectedPack = data.pack;
        await refreshPacks();
      } catch (e) {
        setMsg('❌ ' + e.message, '#f87171');
      }
    }

    async function deleteCurrent() {
      if (!selectedPack || selectedPack.builtIn) return;
      if (!confirm('Delete custom pack "' + selectedPack.title + '"?')) return;
      const res = await fetch('/api/packs/' + encodeURIComponent(selectedPack.id), {
        method: 'DELETE',
        headers: headers()
      });
      if (res.ok) {
        selectedPack = null;
        setMsg('Deleted pack.', '#fbbf24');
        await refreshPacks();
      }
    }

    function exportJson() {
      const blob = new Blob([document.getElementById('editor').value], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = ((selectedPack && selectedPack.id) || 'partynode-pack') + '.json';
      a.click();
    }

    function setMsg(text, color) {
      const el = document.getElementById('msg');
      el.style.color = color;
      el.textContent = text;
    }

    refreshStatus();
    refreshPacks();
    setInterval(refreshStatus, 4000);
  </script>
</body>
</html>`;
}
