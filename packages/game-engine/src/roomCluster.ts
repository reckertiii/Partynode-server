import type {
  ActiveScreen,
  BlitzPack,
  BluffPack,
  ClientAction,
  GameMode,
  GuildHostingInfo,
  PlayerProfile,
  PunchlinePack,
  RoomSnapshot,
  ServerEvent,
  SurveyPack
} from '@partynode/shared';
import { PackStore } from './packStore.js';
import { generatePackWithAi } from './aiPackGenerator.js';
import { PunchlineClashEngine } from './engines/punchlineClash.js';
import { BluffBattleEngine } from './engines/bluffBattle.js';
import { SurveyShowdownEngine } from './engines/surveyShowdown.js';
import { BlitzQuizEngine } from './engines/blitzQuiz.js';

export type EmitToPlayerFn = (instanceId: string, playerId: string, event: ServerEvent) => void;

export class RoomSession {
  public readonly instanceId: string;
  public readonly guildId: string;
  private hosting: GuildHostingInfo;
  private readonly packStore: PackStore;
  private readonly emit: EmitToPlayerFn;

  private players = new Map<string, PlayerProfile>();
  private kickedIds = new Set<string>();
  private leaderId: string | null = null;
  private familyFriendly = true;
  private selectedGame: GameMode = 'punchline_clash';
  private selectedPackId = 'builtin-megamix-punchline';
  private screen: ActiveScreen = 'lobby';
  private usedItemHistory = new Map<string, Set<string>>();
  private readonly deterministicOrder: boolean;

  private punchlineEngine: PunchlineClashEngine | null = null;
  private bluffEngine: BluffBattleEngine | null = null;
  private surveyEngine: SurveyShowdownEngine | null = null;
  private blitzEngine: BlitzQuizEngine | null = null;

  public lastActivityAt = Date.now();

  constructor(
    instanceId: string,
    guildId: string,
    hosting: GuildHostingInfo,
    packStore: PackStore,
    emit: EmitToPlayerFn,
    options?: { deterministicOrder?: boolean }
  ) {
    this.instanceId = instanceId;
    this.guildId = guildId;
    this.hosting = hosting;
    this.packStore = packStore;
    this.emit = emit;
    this.deterministicOrder = options?.deterministicOrder ?? false;
  }

  private drawMatchSlice<T>(
    namespace: string,
    items: readonly T[],
    getKey: (item: T) => string,
    desiredCount: number
  ): T[] {
    if (items.length === 0) return [];
    const targetCount = Math.min(desiredCount, items.length);

    if (this.deterministicOrder) {
      return items.slice(0, targetCount);
    }

    let seen = this.usedItemHistory.get(namespace);
    if (!seen) {
      seen = new Set<string>();
      this.usedItemHistory.set(namespace, seen);
    }

    const shuffleArr = (arr: T[]): T[] => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    let unseen = items.filter((item) => !seen!.has(getKey(item)));
    if (unseen.length < targetCount) {
      // Carry over remaining unseen items first, then reset deck for the rest!
      const carryOver = shuffleArr(unseen);
      seen.clear();
      for (const c of carryOver) seen.add(getKey(c));
      const refilled = shuffleArr(items.filter((item) => !seen!.has(getKey(item))));
      const selected = [...carryOver, ...refilled].slice(0, targetCount);
      for (const s of selected) seen.add(getKey(s));
      return selected;
    }

    const selected = shuffleArr(unseen).slice(0, targetCount);
    for (const s of selected) {
      seen.add(getKey(s));
    }
    return selected;
  }

  public updateHostingInfo(hosting: GuildHostingInfo): void {
    this.hosting = hosting;
    this.broadcastSnapshots();
  }

  public getConnectedCount(): number {
    let n = 0;
    for (const p of this.players.values()) {
      if (p.connected) n++;
    }
    return n;
  }

  public joinPlayer(profile: Omit<PlayerProfile, 'connected' | 'score'>): boolean {
    if (this.kickedIds.has(profile.id) && !profile.isAdmin) {
      this.emit(this.instanceId, profile.id, {
        type: 'kicked',
        reason: 'You were removed from this room by the host.'
      });
      return false;
    }

    this.lastActivityAt = Date.now();
    const existing = this.players.get(profile.id);
    if (existing) {
      existing.username = profile.username;
      existing.displayName = profile.displayName;
      existing.avatarUrl = profile.avatarUrl;
      existing.isAdmin = profile.isAdmin;
      existing.connected = true;
    } else {
      this.players.set(profile.id, {
        ...profile,
        connected: true,
        score: 0
      });
    }

    this.ensureLeader();

    if (this.surveyEngine) {
      this.surveyEngine.autoAssignPlayers(this.getConnectedPlayers());
    }

    this.broadcastSnapshots();
    return true;
  }

  public leavePlayer(playerId: string): void {
    const existing = this.players.get(playerId);
    if (!existing) return;
    existing.connected = false;
    this.lastActivityAt = Date.now();
    if (this.leaderId === playerId) {
      this.leaderId = null;
      this.ensureLeader();
    }
    this.broadcastSnapshots();
  }

  private ensureLeader(): void {
    if (this.leaderId) {
      const curr = this.players.get(this.leaderId);
      if (curr && curr.connected) return;
    }
    const connected = this.getConnectedPlayers();
    const admin = connected.find((p) => p.isAdmin);
    this.leaderId = admin ? admin.id : connected[0]?.id ?? null;
  }

  private getConnectedPlayers(): PlayerProfile[] {
    return Array.from(this.players.values()).filter((p) => p.connected);
  }

  private isLeaderOrAdmin(playerId: string): boolean {
    const p = this.players.get(playerId);
    if (!p) return false;
    return p.isAdmin || this.leaderId === playerId;
  }

  private sendToast(playerId: string, level: 'info' | 'success' | 'warning' | 'error', message: string): void {
    this.emit(this.instanceId, playerId, { type: 'toast', level, message });
  }

  private broadcastToast(level: 'info' | 'success' | 'warning' | 'error', message: string): void {
    for (const p of this.players.values()) {
      if (p.connected) {
        this.emit(this.instanceId, p.id, { type: 'toast', level, message });
      }
    }
  }

  public handleAction(playerId: string, isAdminVerified: boolean, action: ClientAction, now = Date.now()): void {
    this.lastActivityAt = now;
    const player = this.players.get(playerId);
    if (!player) return;

    player.isAdmin = isAdminVerified;

    switch (action.type) {
      case 'lobby_configure': {
        if (!this.isLeaderOrAdmin(playerId)) {
          this.sendToast(playerId, 'warning', 'Only the Room Leader or Server Admin can change game settings.');
          return;
        }
        if (this.screen !== 'lobby') return;

        if (typeof action.familyFriendly === 'boolean') {
          this.familyFriendly = action.familyFriendly;
        }
        if (action.selectedGame) {
          this.selectedGame = action.selectedGame;
          const currentPack = this.packStore.getPackById(this.selectedPackId);
          if (!currentPack || currentPack.game !== this.selectedGame) {
            this.selectedPackId = this.packStore.getDefaultPackForGame(
              this.selectedGame,
              this.familyFriendly
            ).id;
          }
        }
        if (action.selectedPackId) {
          const pack = this.packStore.getPackById(action.selectedPackId);
          if (pack && pack.game === this.selectedGame) {
            this.selectedPackId = pack.id;
          }
        }
        this.broadcastSnapshots(now);
        return;
      }

      case 'lobby_start_game': {
        if (!this.isLeaderOrAdmin(playerId)) {
          this.sendToast(playerId, 'warning', 'Waiting for the Room Leader to start the game.');
          return;
        }
        const connected = this.getConnectedPlayers();
        const minPlayers = this.selectedGame === 'blitz_quiz' ? 1 : 2;
        if (connected.length < minPlayers) {
          this.sendToast(
            playerId,
            'warning',
            `Need at least ${minPlayers} players in the room to start ${this.selectedGame.replace('_', ' ')}!`
          );
          return;
        }

        for (const p of this.players.values()) {
          p.score = 0;
        }

        let pack = this.packStore.getPackById(this.selectedPackId);
        if (!pack || pack.game !== this.selectedGame) {
          pack = this.packStore.getDefaultPackForGame(this.selectedGame, this.familyFriendly);
          this.selectedPackId = pack.id;
        }

        this.punchlineEngine = null;
        this.bluffEngine = null;
        this.surveyEngine = null;
        this.blitzEngine = null;

        if (this.selectedGame === 'punchline_clash') {
          const basePack = pack as PunchlinePack;
          const matchPack: PunchlinePack = {
            ...basePack,
            prompts: this.drawMatchSlice(`${basePack.id}:prompts`, basePack.prompts, (p) => p, 18),
            finalPrompts: this.drawMatchSlice(
              `${basePack.id}:finals`,
              basePack.finalPrompts,
              (p) => p,
              2
            )
          };
          this.punchlineEngine = new PunchlineClashEngine(
            matchPack,
            connected,
            this.familyFriendly,
            now
          );
        } else if (this.selectedGame === 'bluff_battle') {
          const basePack = pack as BluffPack;
          const matchPack: BluffPack = {
            ...basePack,
            questions: this.drawMatchSlice(
              `${basePack.id}:questions`,
              basePack.questions,
              (q) => q.id || q.prompt,
              6
            )
          };
          this.bluffEngine = new BluffBattleEngine(matchPack, this.familyFriendly, now);
        } else if (this.selectedGame === 'survey_showdown') {
          const basePack = pack as SurveyPack;
          const matchPack: SurveyPack = {
            ...basePack,
            questions: this.drawMatchSlice(
              `${basePack.id}:questions`,
              basePack.questions,
              (q) => q.id || q.prompt,
              3
            )
          };
          this.surveyEngine = new SurveyShowdownEngine(
            matchPack,
            connected,
            this.familyFriendly
          );
        } else if (this.selectedGame === 'blitz_quiz') {
          const basePack = pack as BlitzPack;
          const matchPack: BlitzPack = {
            ...basePack,
            questions: this.drawMatchSlice(
              `${basePack.id}:questions`,
              basePack.questions,
              (q) => q.id || q.prompt,
              10
            )
          };
          this.blitzEngine = new BlitzQuizEngine(matchPack, now);
        }

        this.screen = this.selectedGame;
        this.broadcastSnapshots(now);
        return;
      }

      case 'return_to_lobby': {
        if (!this.isLeaderOrAdmin(playerId)) {
          this.sendToast(playerId, 'warning', 'Only the Room Leader or Server Admin can return everyone to the lobby.');
          return;
        }
        this.punchlineEngine = null;
        this.bluffEngine = null;
        this.surveyEngine = null;
        this.blitzEngine = null;
        this.screen = 'lobby';
        this.broadcastSnapshots(now);
        return;
      }

      case 'promote_leader': {
        if (!this.isLeaderOrAdmin(playerId)) return;
        const target = this.players.get(action.targetPlayerId);
        if (target && target.connected) {
          this.leaderId = target.id;
          this.broadcastToast('info', `${target.displayName} is now the Room Leader.`);
          this.broadcastSnapshots(now);
        }
        return;
      }

      case 'mod_kick_player': {
        if (!this.isLeaderOrAdmin(playerId)) return;
        if (action.targetPlayerId === playerId) return;
        const target = this.players.get(action.targetPlayerId);
        if (!target || target.isAdmin) {
          this.sendToast(playerId, 'warning', 'Cannot remove a Server Admin.');
          return;
        }
        this.kickedIds.add(target.id);
        target.connected = false;
        this.emit(this.instanceId, target.id, {
          type: 'kicked',
          reason: 'Removed from the session by the Room Host.'
        });
        this.broadcastSnapshots(now);
        return;
      }

      case 'mod_skip_phase': {
        if (!this.isLeaderOrAdmin(playerId)) return;
        if (this.punchlineEngine) {
          this.punchlineEngine.skipCurrentPhase(this.players, now);
        } else if (this.bluffEngine) {
          this.bluffEngine.skipCurrentPhase(this.players, now);
        } else if (this.surveyEngine) {
          this.surveyEngine.skipCurrentPhase(this.getConnectedPlayers(), now);
          this.surveyEngine.syncScoresToProfiles(this.players);
        } else if (this.blitzEngine) {
          this.blitzEngine.skipCurrentPhase(this.players, now);
        }
        this.broadcastSnapshots(now);
        return;
      }

      // ----------------------------------------------------------------------
      // Punchline Clash Actions
      // ----------------------------------------------------------------------
      case 'punchline_submit': {
        if (this.punchlineEngine?.submitPunchline(playerId, action.matchupId, action.text, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'punchline_vote': {
        if (this.punchlineEngine?.submitVote(playerId, action.matchupId, action.choice, this.players, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'punchline_final_submit': {
        if (this.punchlineEngine?.submitFinalEntry(playerId, action.text, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'punchline_final_vote': {
        if (this.punchlineEngine?.submitFinalBallot(playerId, action.entryIds, this.players, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'mod_redact_punchline': {
        if (!this.isLeaderOrAdmin(playerId)) return;
        if (this.punchlineEngine?.redactPunchline(action.matchupId, action.side)) {
          this.broadcastToast('warning', 'Host redacted an answer.');
          this.broadcastSnapshots(now);
        }
        return;
      }

      // ----------------------------------------------------------------------
      // Bluff Battle Actions
      // ----------------------------------------------------------------------
      case 'bluff_submit_lie': {
        if (!this.bluffEngine) return;
        const res = this.bluffEngine.submitLie(playerId, action.text, this.players, now);
        if (!res.ok) {
          if (res.error) this.sendToast(playerId, res.hitTruth ? 'warning' : 'error', res.error);
          return;
        }
        this.broadcastSnapshots(now);
        return;
      }
      case 'bluff_pick_option': {
        if (!this.bluffEngine) return;
        const res = this.bluffEngine.pickOption(playerId, action.optionId, this.players, now);
        if (!res.ok) {
          if (res.error) this.sendToast(playerId, 'warning', res.error);
          return;
        }
        this.broadcastSnapshots(now);
        return;
      }
      case 'bluff_like_option': {
        if (this.bluffEngine?.likeOption(playerId, action.optionId, this.players)) {
          this.broadcastSnapshots(now);
        }
        return;
      }

      // ----------------------------------------------------------------------
      // Survey Showdown Actions
      // ----------------------------------------------------------------------
      case 'survey_join_team': {
        if (!this.surveyEngine) return;
        this.surveyEngine.joinTeam(playerId, action.team, this.getConnectedPlayers());
        this.broadcastSnapshots(now);
        return;
      }
      case 'survey_set_mc': {
        if (!this.surveyEngine) return;
        this.surveyEngine.setMc(playerId, action.claim, this.getConnectedPlayers());
        this.broadcastSnapshots(now);
        return;
      }
      case 'survey_begin_faceoff': {
        if (!this.surveyEngine) return;
        const canStart = this.isLeaderOrAdmin(playerId) || this.surveyEngine.getViewForPlayer(playerId).mcPlayerId === playerId;
        if (!canStart) {
          this.sendToast(playerId, 'warning', 'Room Leader or MC starts the round.');
          return;
        }
        const res = this.surveyEngine.beginRound(1, this.getConnectedPlayers(), now);
        if (!res.ok) {
          this.sendToast(playerId, 'warning', res.error ?? 'Cannot start round.');
          return;
        }
        this.broadcastSnapshots(now);
        return;
      }
      case 'survey_buzz': {
        if (this.surveyEngine?.buzz(playerId, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'survey_submit_guess': {
        if (this.surveyEngine?.submitGuess(playerId, action.text, now)) {
          this.surveyEngine.syncScoresToProfiles(this.players);
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'survey_play_or_pass': {
        if (this.surveyEngine?.choosePlayOrPass(playerId, action.decision, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'survey_mc_judge': {
        if (this.surveyEngine?.mcJudgePending(playerId, action.awardSlotIndex, now)) {
          this.surveyEngine.syncScoresToProfiles(this.players);
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'survey_mc_reveal_slot': {
        if (this.surveyEngine?.mcRevealSlot(playerId, action.slotIndex, this.isLeaderOrAdmin(playerId))) {
          this.broadcastSnapshots(now);
        }
        return;
      }
      case 'survey_next_round': {
        if (!this.surveyEngine) return;
        const view = this.surveyEngine.getViewForPlayer(playerId);
        if (!this.isLeaderOrAdmin(playerId) && view.mcPlayerId !== playerId) return;
        this.surveyEngine.advanceNextRoundOrFinish(this.getConnectedPlayers(), now);
        this.surveyEngine.syncScoresToProfiles(this.players);
        this.broadcastSnapshots(now);
        return;
      }

      // ----------------------------------------------------------------------
      // BlitzQuiz Actions
      // ----------------------------------------------------------------------
      case 'blitz_answer': {
        if (this.blitzEngine?.submitAnswer(playerId, action.optionIndex, this.players, now)) {
          this.broadcastSnapshots(now);
        }
        return;
      }

      // ----------------------------------------------------------------------
      // In-Discord Pack Studio Actions (Server Admins)
      // ----------------------------------------------------------------------
      case 'studio_list_packs': {
        if (!isAdminVerified) {
          this.sendToast(playerId, 'error', 'Only Discord Server Admins (Manage Server) can access Pack Studio.');
          return;
        }
        this.emit(this.instanceId, playerId, {
          type: 'studio_packs_list',
          packs: this.packStore.getAllPacks()
        });
        return;
      }
      case 'studio_get_pack': {
        if (!isAdminVerified) return;
        const found = this.packStore.getPackById(action.packId);
        if (found) {
          this.emit(this.instanceId, playerId, { type: 'studio_pack_detail', pack: found });
        }
        return;
      }
      case 'studio_save_pack': {
        if (!isAdminVerified) {
          this.sendToast(playerId, 'error', 'Only Server Admins can save custom packs.');
          return;
        }
        if (this.hosting.hostingMode === 'demo_sandbox') {
          this.sendToast(
            playerId,
            'warning',
            'Demo Sandbox packs reset on restart! Connect your Self-Hosted Node to store permanent custom packs.'
          );
        }
        const res = this.packStore.upsertCustomPack(action.pack);
        if (!res.ok) {
          this.sendToast(playerId, 'error', res.error ?? 'Invalid pack.');
          return;
        }
        this.sendToast(playerId, 'success', `Saved pack "${res.pack!.title}"!`);
        this.emit(this.instanceId, playerId, {
          type: 'studio_packs_list',
          packs: this.packStore.getAllPacks()
        });
        this.broadcastSnapshots(now);
        return;
      }
      case 'studio_delete_pack': {
        if (!isAdminVerified) return;
        const res = this.packStore.deleteCustomPack(action.packId);
        if (!res.ok) {
          this.sendToast(playerId, 'error', res.error ?? 'Could not delete pack.');
          return;
        }
        this.sendToast(playerId, 'info', 'Custom pack deleted.');
        this.emit(this.instanceId, playerId, {
          type: 'studio_packs_list',
          packs: this.packStore.getAllPacks()
        });
        this.broadcastSnapshots(now);
        return;
      }
      case 'studio_ai_generate': {
        if (!isAdminVerified) {
          this.sendToast(playerId, 'error', 'Only Server Admins can generate packs.');
          return;
        }
        this.sendToast(playerId, 'info', `Generating "${action.topic}" pack...`);
        generatePackWithAi({
          game: action.game,
          topic: action.topic,
          count: action.count,
          familyFriendly: action.familyFriendly,
          apiKey: action.apiKey
        })
          .then(({ pack, provider }) => {
            this.emit(this.instanceId, playerId, {
              type: 'studio_ai_generated',
              pack,
              provider
            });
            if (provider === 'offline-scaffold') {
              this.sendToast(
                playerId,
                'info',
                'Loaded editable topic scaffold! Add GEMINI_API_KEY (or paste a key in AI tab) for full Gemini 3.8 Flash generation.'
              );
            } else {
              this.sendToast(
                playerId,
                'success',
                `✨ Generated "${pack.title}" with ${provider}! Review & click Save.`
              );
            }
          })
          .catch((err: Error) => {
            this.sendToast(playerId, 'error', `AI Generation failed: ${err.message}`);
          });
        return;
      }
    }
  }

  public tick(now = Date.now()): void {
    let changed = false;
    if (this.punchlineEngine) {
      changed = this.punchlineEngine.tick(this.players, now);
    } else if (this.bluffEngine) {
      changed = this.bluffEngine.tick(this.players, now);
    } else if (this.surveyEngine) {
      changed = this.surveyEngine.tick(this.getConnectedPlayers(), now);
      if (changed) this.surveyEngine.syncScoresToProfiles(this.players);
    } else if (this.blitzEngine) {
      changed = this.blitzEngine.tick(this.players, now);
    }
    if (changed) {
      this.broadcastSnapshots(now);
    }
  }

  public getSnapshotForPlayer(playerId: string, now = Date.now()): RoomSnapshot {
    let gameView: RoomSnapshot['gameView'] = null;
    if (this.screen === 'punchline_clash' && this.punchlineEngine) {
      gameView = this.punchlineEngine.getViewForPlayer(playerId, this.players);
    } else if (this.screen === 'bluff_battle' && this.bluffEngine) {
      gameView = this.bluffEngine.getViewForPlayer(playerId, this.players);
    } else if (this.screen === 'survey_showdown' && this.surveyEngine) {
      gameView = this.surveyEngine.getViewForPlayer(playerId);
    } else if (this.screen === 'blitz_quiz' && this.blitzEngine) {
      gameView = this.blitzEngine.getViewForPlayer(playerId);
    }

    return {
      instanceId: this.instanceId,
      guildId: this.guildId,
      leaderId: this.leaderId,
      familyFriendly: this.familyFriendly,
      selectedGame: this.selectedGame,
      selectedPackId: this.selectedPackId,
      availablePacks: this.packStore.getSummaries(this.familyFriendly),
      players: Array.from(this.players.values()),
      hosting: this.hosting,
      screen: this.screen,
      gameView,
      serverNow: now
    };
  }

  public broadcastSnapshots(now = Date.now()): void {
    for (const p of this.players.values()) {
      if (!p.connected) continue;
      this.emit(this.instanceId, p.id, {
        type: 'room_snapshot',
        snapshot: this.getSnapshotForPlayer(p.id, now)
      });
    }
  }
}

export class RoomCluster {
  private rooms = new Map<string, RoomSession>();
  private timer: NodeJS.Timeout | null = null;
  private readonly packStore: PackStore;
  private readonly emit: EmitToPlayerFn;

  constructor(packStore: PackStore, emit: EmitToPlayerFn) {
    this.packStore = packStore;
    this.emit = emit;
  }

  public startTicker(intervalMs = 500): void {
    if (this.timer) return;
    this.timer = setInterval(() => {
      const now = Date.now();
      for (const [id, room] of this.rooms.entries()) {
        room.tick(now);
        if (room.getConnectedCount() === 0 && now - room.lastActivityAt > 5 * 60_000) {
          this.rooms.delete(id);
        }
      }
    }, intervalMs);
  }

  public stopTicker(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public getOrCreateRoom(instanceId: string, guildId: string, hosting: GuildHostingInfo): RoomSession {
    let room = this.rooms.get(instanceId);
    if (!room) {
      room = new RoomSession(instanceId, guildId, hosting, this.packStore, this.emit);
      this.rooms.set(instanceId, room);
    }
    return room;
  }

  public getRoom(instanceId: string): RoomSession | undefined {
    return this.rooms.get(instanceId);
  }

  public getActiveRoomSummaries(): Array<{ instanceId: string; guildId: string; connectedPlayers: number }> {
    return Array.from(this.rooms.values()).map((r) => ({
      instanceId: r.instanceId,
      guildId: r.guildId,
      connectedPlayers: r.getConnectedCount()
    }));
  }

  public updateGuildHosting(guildId: string, hosting: GuildHostingInfo): void {
    for (const room of this.rooms.values()) {
      if (room.guildId === guildId) {
        room.updateHostingInfo(hosting);
      }
    }
  }
}
