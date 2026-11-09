export function renderLocalStudioHtml(nodeName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${nodeName} — Local Pack Studio</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #090d16; color: #f1f5f9; }
    header { background: #111827; border-bottom: 1px solid #1f2937; padding: 18px 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .badge { padding: 6px 12px; border-radius: 999px; font-size: 13px; font-weight: 600; }
    .online { background: rgba(16, 185, 129, 0.18); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .offline { background: rgba(239, 68, 68, 0.18); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); }
    main { max-width: 1180px; margin: 28px auto; padding: 0 20px; display: grid; grid-template-columns: 350px 1fr; gap: 24px; }
    @media (max-width: 860px) { main { grid-template-columns: 1fr; } }
    .panel { background: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 20px; }
    h1 { margin: 0; font-size: 20px; }
    h2 { margin: 0 0 14px; font-size: 16px; color: #cbd5e1; }
    button { cursor: pointer; background: #6366f1; color: white; border: none; padding: 8px 13px; border-radius: 8px; font-weight: 600; font-size: 12px; }
    button:hover { background: #4f46e5; }
    button.secondary { background: #1f2937; color: #e2e8f0; border: 1px solid #374151; }
    button.danger { background: #dc2626; }
    input, select, textarea { width: 100%; background: #0b0f19; border: 1px solid #334155; color: #f8fafc; border-radius: 8px; padding: 8px 11px; font-size: 13px; margin-bottom: 10px; font-family: inherit; }
    textarea.code { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; min-height: 350px; font-size: 12px; line-height: 1.5; }
    .pack-item { padding: 11px 12px; border: 1px solid #1f2937; border-radius: 10px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; background: #0d1321; cursor: pointer; }
    .pack-item:hover { border-color: #6366f1; }
    .tag { font-size: 11px; padding: 2px 7px; border-radius: 6px; background: #1e293b; color: #94a3b8; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
    .ai-box { background: #0d1324; border: 1px solid #3730a3; border-radius: 12px; padding: 14px; margin-bottom: 14px; }
    #msg { font-size: 13px; margin-top: 8px; min-height: 20px; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>🎮 ${nodeName} — Self-Hosted Node & Pack Studio</h1>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;" id="substatus">Checking Gateway tunnel...</div>
    </div>
    <div id="tunnelBadge" class="badge offline">Connecting...</div>
  </header>
  <main>
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
          <input type="password" id="aiKey" placeholder="Optional Gemini API Key (if not set in .env)" style="margin:0;" />
          <button onclick="generateAi()" style="white-space:nowrap;padding:9px 16px;">Generate Pack</button>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h2 style="margin:0;">Pack JSON Editor (Full Visual Builder also available inside Discord!)</h2>
        <div class="row" style="margin:0;">
          <button class="secondary" onclick="exportJson()">Download .json</button>
          <button class="danger" id="deleteBtn" onclick="deleteCurrent()" style="display:none;">Delete</button>
          <button onclick="savePack()">Save to Node</button>
        </div>
      </div>
      <input type="password" id="adminKey" placeholder="Optional NODE_ADMIN_KEY (leave blank if not configured)" />
      <textarea id="editor" class="code" spellcheck="false"></textarea>
      <div id="msg"></div>
    </section>
  </main>
  <script>
    let allPacks = [];
    let selectedPack = null;

    function headers() {
      const key = document.getElementById('adminKey').value.trim();
      const h = { 'Content-Type': 'application/json' };
      if (key) h['x-node-admin-key'] = key;
      return h;
    }

    async function refreshStatus() {
      const res = await fetch('/api/status');
      const data = await res.json();
      const badge = document.getElementById('tunnelBadge');
      const sub = document.getElementById('substatus');
      if (data.tunnelConnected) {
        badge.className = 'badge online';
        badge.textContent = '🟢 Tunnel Online (Guild: ' + (data.guildId || 'Paired') + ')';
      } else {
        badge.className = 'badge offline';
        badge.textContent = '🔴 Tunnel Disconnected — Retrying';
      }
      sub.textContent = 'Gateway: ' + data.gatewayWsUrl + ' • Active Voice Channel Rooms: ' + data.activeRooms.length;
    }

    async function refreshPacks() {
      const res = await fetch('/api/packs', { headers: headers() });
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
        setMsg('✨ Generated via ' + data.provider + '! Click "Save to Node" to publish.', '#34d399');
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
