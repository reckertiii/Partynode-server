# PartyNode Server — Self-Hosted Discord Game Node

Run your own private, customizable game server for the **PartyNode** Discord Voice Activity—with **zero port forwarding, zero SSL certificates, and zero configuration files needed at install**.

Everything (your Discord Pairing Code, Server Display Name, optional AI Pack Generator keys, and optional Local Web Password) is configured **directly in your browser at `http://localhost:8080`** (or `http://<your-server-ip>:8080`) after starting the container!

---

## 1. Install Container (Zero Env Vars Needed!)

Paste into **Portainer Stacks**, **Dockge**, or save as `docker-compose.yml` and run `docker compose up -d`:

```yaml
services:
  partynode-host:
    image: ghcr.io/reckertiii/partynode-node:latest
    container_name: partynode-host
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - partynode_node_data:/app/data

volumes:
  partynode_node_data:
```

*(Or run as a single command: `docker run -d --name partynode-host -p 8080:8080 -v partynode_node_data:/app/data --restart unless-stopped ghcr.io/reckertiii/partynode-node:latest`)*

---

## 2. Configure & Pair in Your Browser (`:8080`)

1. Join a Voice Channel in your Discord server and launch **PartyNode**.
2. Click **`Host Node`** in the top bar (requires Discord **`Manage Server`** permission) -> **`Generate Server Pairing Token`** -> **Copy Quick-Pair Code** (`pnpair_...`).
3. Open **`http://localhost:8080`** (or `http://<your-server-ip>:8080`) in your browser.
4. Paste your **Quick-Pair Code** (and optionally add a Gemini API Key or Local Ollama URL for 1-click AI packs, or set an Admin Password) and click **`Save & Connect Now`**!

Within 1 second, your Discord Activity badge turns green (`🟢 Self-Hosted Node`), and all settings & custom packs are saved persistently inside `partynode_node_data`.

---

## Supported Party Games
- **Punchline Clash** (*Quiplash-style* head-to-head comedy prompts + 3-medal Final Showdown)
- **Bluff Battle** (*Fibbage-style* truth-and-lies deception with fuzzy Truth Guard + 😂 Best Bluff bonuses)
- **Survey Showdown** (*Family Feud-style* ranked survey flip board with Auto-Judge + optional Live MC Answer Sheet)
- **BlitzQuiz** (*Kahoot-style* speed & hot-streak 4-pad trivia)
