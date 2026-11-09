# PartyNode Server — Self-Hosted Discord Game Node

Run your own private, customizable game server for the **PartyNode** Discord Voice Activity—with **zero port forwarding, zero SSL certificates, and zero domain setup**.

Your node connects **outbound** over encrypted WebSockets (`wss://`) to the PartyNode Gateway, executes all game rooms locally on your hardware (`amd64` or `arm64` / Raspberry Pi / NAS / VPS / PC), and stores all of your server's custom content packs locally in `./partynode-data`.

## Supported Party Games
- **Punchline Clash** (*Quiplash-style* head-to-head comedy prompts + 3-medal Final Showdown)
- **Bluff Battle** (*Fibbage-style* truth-and-lies deception with fuzzy Truth Guard + 😂 Best Bluff bonuses)
- **Survey Showdown** (*Family Feud-style* ranked survey flip board with Auto-Judge + optional Live MC Answer Sheet)
- **BlitzQuiz** (*Kahoot-style* speed & hot-streak 4-pad trivia)

---

## Quick Start (30 Seconds with Docker)

1. Join a Voice Channel in your Discord server and launch **PartyNode**.
2. Click **`Host Node`** in the top bar (requires Discord's **`Manage Server`** permission) and click **`Generate Server Pairing Token`**.
3. Copy the ready-to-run `docker-compose.yml` snippet shown inside Discord and run:

```bash
docker compose up -d
```

Within 2 seconds, your Discord Activity badge will turn green (`🟢 Self-Hosted Node`)!

---

## Build & Run from Source

Prefer inspecting and building this repository yourself?

```bash
git clone https://github.com/reckertiii/Partynode-server.git
cd Partynode-server
cp .env.example .env
# Edit .env with your GATEWAY_WS_URL and PAIRING_TOKEN from Discord
docker compose up -d --build
```

---

## Local Pack Studio & Optional AI Generator

While your node is running, you can create, import (CSV/Excel/JSON), and manage custom packs in **two places**:
1. **Directly inside Discord:** Click **`Pack Studio`** in the top bar of the PartyNode Activity.
2. **Locally in your browser:** Open `http://localhost:8080` on your host machine.

### Optional 1-Click AI Topic Generator
Want to generate full trivia, survey, bluff, or prompt packs from any topic? Add either of these to your `.env`:
- **Google Gemini:** `GEMINI_API_KEY=your_key_here`
- **Local Ollama / OpenAI-compatible server:**
  ```env
  OPENAI_BASE_URL=http://host.docker.internal:11434/v1
  OPENAI_MODEL=llama3.1
  ```

---

## Privacy & Security
- **No inbound ports to the internet:** Only outbound `wss://` is used to talk to the Discord Activity Gateway.
- **Local data ownership:** All custom question packs live on your machine inside `./partynode-data/custom-packs.json`.
- **LAN studio lock:** Set `NODE_ADMIN_KEY` in `.env` if you want password protection on `http://localhost:8080`.
