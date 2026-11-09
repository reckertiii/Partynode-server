import {
  sanitizeUserText,
  type AssignedPromptItem,
  type FinalEntryPublic,
  type PlayerProfile,
  type PunchlineClashView,
  type PunchlineMatchupPublic,
  type PunchlinePack,
  type PunchlinePhase
} from '@partynode/shared';

interface InternalMatchup {
  matchupId: string;
  prompt: string;
  playerAId: string;
  playerBId: string;
  answerA: string | null;
  answerB: string | null;
  votes: Map<string, 'A' | 'B'>; // voterId -> 'A' | 'B'
  pointsA: number;
  pointsB: number;
  isClashSweep: boolean;
  sweepWinner: 'A' | 'B' | null;
}

interface InternalFinalEntry {
  entryId: string;
  authorId: string;
  text: string | null;
  goldVoters: string[];
  silverVoters: string[];
  bronzeVoters: string[];
  pointsEarned: number;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export class PunchlineClashEngine {
  private phase: PunchlinePhase = 'writing';
  private round: 1 | 2 | 3 = 1;
  private phaseEndsAt: number | null = null;
  private usedPrompts = new Set<string>();
  private matchups: InternalMatchup[] = [];
  private currentMatchupIdx = 0;

  private finalPrompt = '';
  private finalEntries = new Map<string, InternalFinalEntry>(); // playerId -> entry
  private finalVoterBallots = new Map<string, string[]>(); // voterId -> [goldId, silverId?, bronzeId?]

  private contestantIds: string[] = [];
  private readonly pack: PunchlinePack;
  private readonly familyFriendly: boolean;

  constructor(pack: PunchlinePack, activePlayers: PlayerProfile[], familyFriendly: boolean, now = Date.now()) {
    this.pack = pack;
    this.familyFriendly = familyFriendly;
    // Up to 8 active contestants write answers; anyone beyond 8 participates as live Audience Voters!
    this.contestantIds = shuffle(activePlayers.map((p) => p.id)).slice(0, 8);
    this.startRound(1, now);
  }

  private pickPrompt(): string {
    const available = this.pack.prompts.filter((p) => !this.usedPrompts.has(p));
    const pool = available.length > 0 ? available : this.pack.prompts;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    this.usedPrompts.add(chosen);
    return chosen;
  }

  private startRound(round: 1 | 2 | 3, now: number): void {
    this.round = round;
    if (round === 1 || round === 2) {
      this.matchups = [];
      this.currentMatchupIdx = 0;
      const ordered = shuffle(this.contestantIds);
      const n = ordered.length;

      if (n === 2) {
        // 2-player head-to-head: 2 distinct prompts so both still write 2 answers!
        for (let k = 0; k < 2; k++) {
          this.matchups.push({
            matchupId: `r${round}-m${k}`,
            prompt: this.pickPrompt(),
            playerAId: ordered[0],
            playerBId: ordered[1],
            answerA: null,
            answerB: null,
            votes: new Map(),
            pointsA: 0,
            pointsB: 0,
            isClashSweep: false,
            sweepWinner: null
          });
        }
      } else {
        // Circular graph: Player i vs Player (i+1)%n -> every player gets exactly 2 prompts!
        for (let i = 0; i < n; i++) {
          const next = (i + 1) % n;
          this.matchups.push({
            matchupId: `r${round}-m${i}`,
            prompt: this.pickPrompt(),
            playerAId: ordered[i],
            playerBId: ordered[next],
            answerA: null,
            answerB: null,
            votes: new Map(),
            pointsA: 0,
            pointsB: 0,
            isClashSweep: false,
            sweepWinner: null
          });
        }
      }

      this.phase = 'writing';
      this.phaseEndsAt = now + 65_000;
    } else {
      // Round 3: Final Showdown! Everyone gets the same prompt.
      const fPool = this.pack.finalPrompts.length > 0 ? this.pack.finalPrompts : this.pack.prompts;
      this.finalPrompt = fPool[Math.floor(Math.random() * fPool.length)];
      this.finalEntries.clear();
      this.finalVoterBallots.clear();
      for (const pid of this.contestantIds) {
        this.finalEntries.set(pid, {
          entryId: `final-${pid}`,
          authorId: pid,
          text: null,
          goldVoters: [],
          silverVoters: [],
          bronzeVoters: [],
          pointsEarned: 0
        });
      }
      this.phase = 'final_writing';
      this.phaseEndsAt = now + 65_000;
    }
  }

  public submitPunchline(playerId: string, matchupId: string, rawText: string, now = Date.now()): boolean {
    if (this.phase !== 'writing') return false;
    const m = this.matchups.find((item) => item.matchupId === matchupId);
    if (!m) return false;

    const clean = sanitizeUserText(rawText, { maxLength: 100, familyFriendly: this.familyFriendly });
    if (!clean) return false;

    if (m.playerAId === playerId) {
      m.answerA = clean;
    } else if (m.playerBId === playerId) {
      m.answerB = clean;
    } else {
      return false;
    }

    if (this.allWritingComplete()) {
      this.beginMatchupVoting(0, now);
    }
    return true;
  }

  public redactPunchline(matchupId: string, side: 'A' | 'B'): boolean {
    const m = this.matchups.find((item) => item.matchupId === matchupId);
    if (!m) return false;
    if (side === 'A') m.answerA = '[REDACTED BY HOST]';
    else m.answerB = '[REDACTED BY HOST]';
    return true;
  }

  private allWritingComplete(): boolean {
    return this.matchups.every((m) => m.answerA !== null && m.answerB !== null);
  }

  private fillMissingAnswers(): void {
    const fallbacks = [
      '(Ran out of time panicking)',
      '(Stared blankly into the void)',
      '(Forgot how keyboards work)',
      '(Mic was muted in spirit too)'
    ];
    for (const m of this.matchups) {
      if (m.answerA === null) {
        m.answerA = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
      if (m.answerB === null) {
        m.answerB = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      }
    }
  }

  private beginMatchupVoting(idx: number, now: number): void {
    this.fillMissingAnswers();
    this.currentMatchupIdx = idx;
    this.phase = 'voting';
    this.phaseEndsAt = now + 22_000;
  }

  private canPlayerVoteOnMatchup(playerId: string, m: InternalMatchup, connectedPlayers: PlayerProfile[]): boolean {
    const activeCount = connectedPlayers.filter((p) => p.connected).length;
    if (activeCount <= 2) {
      // In 2-player rooms, let both players vote so they can test & play head-to-head!
      return true;
    }
    return playerId !== m.playerAId && playerId !== m.playerBId;
  }

  public submitVote(
    playerId: string,
    matchupId: string,
    choice: 'A' | 'B',
    players: Map<string, PlayerProfile>,
    now = Date.now()
  ): boolean {
    if (this.phase !== 'voting') return false;
    const m = this.matchups[this.currentMatchupIdx];
    if (!m || m.matchupId !== matchupId) return false;

    const allList = Array.from(players.values());
    if (!this.canPlayerVoteOnMatchup(playerId, m, allList)) return false;

    m.votes.set(playerId, choice);

    const eligibleVoters = allList.filter(
      (p) => p.connected && this.canPlayerVoteOnMatchup(p.id, m, allList)
    );
    if (eligibleVoters.length > 0 && eligibleVoters.every((v) => m.votes.has(v.id))) {
      this.scoreCurrentMatchupAndReveal(players, now);
    }
    return true;
  }

  private scoreCurrentMatchupAndReveal(players: Map<string, PlayerProfile>, now: number): void {
    const m = this.matchups[this.currentMatchupIdx];
    if (!m) return;

    let votesA = 0;
    let votesB = 0;
    for (const choice of m.votes.values()) {
      if (choice === 'A') votesA++;
      else votesB++;
    }

    const totalVotes = votesA + votesB;
    const basePool = this.round === 2 ? 2000 : 1000;
    const sweepBonus = this.round === 2 ? 500 : 250;

    if (totalVotes > 0) {
      m.pointsA = Math.round((votesA / totalVotes) * basePool);
      m.pointsB = Math.round((votesB / totalVotes) * basePool);

      if (totalVotes >= 2 && (votesA === totalVotes || votesB === totalVotes)) {
        m.isClashSweep = true;
        if (votesA === totalVotes) {
          m.sweepWinner = 'A';
          m.pointsA += sweepBonus;
        } else {
          m.sweepWinner = 'B';
          m.pointsB += sweepBonus;
        }
      }
    }

    const pA = players.get(m.playerAId);
    if (pA) pA.score += m.pointsA;
    const pB = players.get(m.playerBId);
    if (pB) pB.score += m.pointsB;

    this.phase = 'reveal';
    this.phaseEndsAt = now + 7_000;
  }

  public submitFinalEntry(playerId: string, rawText: string, now = Date.now()): boolean {
    if (this.phase !== 'final_writing') return false;
    const entry = this.finalEntries.get(playerId);
    if (!entry) return false;

    const clean = sanitizeUserText(rawText, { maxLength: 110, familyFriendly: this.familyFriendly });
    if (!clean) return false;
    entry.text = clean;

    const allDone = Array.from(this.finalEntries.values()).every((e) => e.text !== null);
    if (allDone) {
      this.beginFinalVoting(now);
    }
    return true;
  }

  private beginFinalVoting(now: number): void {
    for (const e of this.finalEntries.values()) {
      if (e.text === null) {
        e.text = '(Speechless under pressure)';
      }
    }
    this.phase = 'final_voting';
    this.phaseEndsAt = now + 30_000;
  }

  public getRequiredFinalMedalCount(): number {
    const count = this.finalEntries.size;
    if (count <= 2) return 1;
    if (count === 3) return 2;
    return 3;
  }

  public submitFinalBallot(
    playerId: string,
    entryIds: string[],
    players: Map<string, PlayerProfile>,
    now = Date.now()
  ): boolean {
    if (this.phase !== 'final_voting') return false;
    const required = this.getRequiredFinalMedalCount();
    const unique = Array.from(new Set(entryIds)).slice(0, required);
    if (unique.length !== required) return false;

    // Validate entries exist and player doesn't vote for their own entry (when >= 2 other options exist)
    for (const eid of unique) {
      const target = Array.from(this.finalEntries.values()).find((e) => e.entryId === eid);
      if (!target) return false;
      if (target.authorId === playerId && this.finalEntries.size > 1) return false;
    }

    this.finalVoterBallots.set(playerId, unique);

    const connectedVoters = Array.from(players.values()).filter((p) => p.connected);
    if (connectedVoters.length > 0 && connectedVoters.every((p) => this.finalVoterBallots.has(p.id))) {
      this.scoreFinalAndReveal(players, now);
    }
    return true;
  }

  private scoreFinalAndReveal(players: Map<string, PlayerProfile>, now: number): void {
    const byEntryId = new Map<string, InternalFinalEntry>();
    for (const e of this.finalEntries.values()) {
      byEntryId.set(e.entryId, e);
    }

    for (const [voterId, picks] of this.finalVoterBallots.entries()) {
      if (picks[0] && byEntryId.has(picks[0])) {
        const e = byEntryId.get(picks[0])!;
        e.goldVoters.push(voterId);
        e.pointsEarned += 900;
      }
      if (picks[1] && byEntryId.has(picks[1])) {
        const e = byEntryId.get(picks[1])!;
        e.silverVoters.push(voterId);
        e.pointsEarned += 600;
      }
      if (picks[2] && byEntryId.has(picks[2])) {
        const e = byEntryId.get(picks[2])!;
        e.bronzeVoters.push(voterId);
        e.pointsEarned += 300;
      }
    }

    for (const e of this.finalEntries.values()) {
      const p = players.get(e.authorId);
      if (p) p.score += e.pointsEarned;
    }

    this.phase = 'final_reveal';
    this.phaseEndsAt = now + 9_000;
  }

  public skipCurrentPhase(players: Map<string, PlayerProfile>, now = Date.now()): void {
    this.advancePhase(players, now);
  }

  public tick(players: Map<string, PlayerProfile>, now = Date.now()): boolean {
    if (this.phaseEndsAt !== null && now >= this.phaseEndsAt) {
      this.advancePhase(players, now);
      return true;
    }
    return false;
  }

  private advancePhase(players: Map<string, PlayerProfile>, now: number): void {
    if (this.phase === 'writing') {
      this.beginMatchupVoting(0, now);
      return;
    }
    if (this.phase === 'voting') {
      this.scoreCurrentMatchupAndReveal(players, now);
      return;
    }
    if (this.phase === 'reveal') {
      if (this.currentMatchupIdx + 1 < this.matchups.length) {
        this.beginMatchupVoting(this.currentMatchupIdx + 1, now);
      } else {
        this.phase = 'round_scores';
        this.phaseEndsAt = now + 6_000;
      }
      return;
    }
    if (this.phase === 'round_scores') {
      if (this.round === 1) {
        this.startRound(2, now);
      } else if (this.round === 2) {
        this.startRound(3, now);
      }
      return;
    }
    if (this.phase === 'final_writing') {
      this.beginFinalVoting(now);
      return;
    }
    if (this.phase === 'final_voting') {
      this.scoreFinalAndReveal(players, now);
      return;
    }
    if (this.phase === 'final_reveal') {
      this.phase = 'podium';
      this.phaseEndsAt = null;
    }
  }

  public getViewForPlayer(playerId: string, players: Map<string, PlayerProfile>): PunchlineClashView {
    const allPlayers = Array.from(players.values());

    if (this.phase === 'writing') {
      const myPrompts: AssignedPromptItem[] = [];
      let submittedCount = 0;
      for (const m of this.matchups) {
        if (m.answerA !== null) submittedCount++;
        if (m.answerB !== null) submittedCount++;
        if (m.playerAId === playerId) {
          myPrompts.push({
            matchupId: m.matchupId,
            prompt: m.prompt,
            submitted: m.answerA !== null,
            submittedText: m.answerA ?? undefined
          });
        } else if (m.playerBId === playerId) {
          myPrompts.push({
            matchupId: m.matchupId,
            prompt: m.prompt,
            submitted: m.answerB !== null,
            submittedText: m.answerB ?? undefined
          });
        }
      }
      return {
        mode: 'punchline_clash',
        phase: this.phase,
        round: this.round,
        phaseEndsAt: this.phaseEndsAt,
        submittedCount,
        requiredCount: this.matchups.length * 2,
        myPrompts
      };
    }

    if (this.phase === 'voting' || this.phase === 'reveal' || this.phase === 'round_scores') {
      const m = this.matchups[this.currentMatchupIdx];
      let activeMatchup: PunchlineMatchupPublic | undefined;
      if (m) {
        const isReveal = this.phase === 'reveal' || this.phase === 'round_scores';
        const votersA: string[] = [];
        const votersB: string[] = [];
        if (isReveal) {
          for (const [vid, side] of m.votes.entries()) {
            if (side === 'A') votersA.push(vid);
            else votersB.push(vid);
          }
        }
        activeMatchup = {
          matchupId: m.matchupId,
          prompt: m.prompt,
          optionA: {
            text: m.answerA ?? '',
            authorId: isReveal ? m.playerAId : undefined,
            voterIds: isReveal ? votersA : undefined,
            pointsEarned: isReveal ? m.pointsA : undefined
          },
          optionB: {
            text: m.answerB ?? '',
            authorId: isReveal ? m.playerBId : undefined,
            voterIds: isReveal ? votersB : undefined,
            pointsEarned: isReveal ? m.pointsB : undefined
          },
          isClashSweep: isReveal ? m.isClashSweep : undefined,
          sweepWinner: isReveal ? m.sweepWinner : undefined,
          canVote: this.phase === 'voting' && this.canPlayerVoteOnMatchup(playerId, m, allPlayers),
          myVote: m.votes.get(playerId) ?? null
        };
      }

      const eligibleVoters = m
        ? allPlayers.filter((p) => p.connected && this.canPlayerVoteOnMatchup(p.id, m, allPlayers))
        : [];

      return {
        mode: 'punchline_clash',
        phase: this.phase,
        round: this.round,
        phaseEndsAt: this.phaseEndsAt,
        submittedCount: m ? m.votes.size : 0,
        requiredCount: eligibleVoters.length,
        matchupIndex: this.currentMatchupIdx,
        totalMatchups: this.matchups.length,
        activeMatchup
      };
    }

    // Round 3 phases
    if (this.phase === 'final_writing') {
      const submittedCount = Array.from(this.finalEntries.values()).filter((e) => e.text !== null).length;
      const mine = this.finalEntries.get(playerId);
      return {
        mode: 'punchline_clash',
        phase: this.phase,
        round: 3,
        phaseEndsAt: this.phaseEndsAt,
        submittedCount,
        requiredCount: this.finalEntries.size,
        finalPrompt: this.finalPrompt,
        myFinalSubmitted: mine ? mine.text !== null : true
      };
    }

    const isFinalRevealed = this.phase === 'final_reveal' || this.phase === 'podium';
    const finalEntries: FinalEntryPublic[] = Array.from(this.finalEntries.values()).map((e) => ({
      entryId: e.entryId,
      text: e.text ?? '',
      authorId: isFinalRevealed ? e.authorId : undefined,
      medals: isFinalRevealed
        ? {
            gold: e.goldVoters.length,
            silver: e.silverVoters.length,
            bronze: e.bronzeVoters.length
          }
        : undefined,
      pointsEarned: isFinalRevealed ? e.pointsEarned : undefined,
      isMine: e.authorId === playerId
    }));

    if (isFinalRevealed) {
      finalEntries.sort((a, b) => (b.pointsEarned ?? 0) - (a.pointsEarned ?? 0));
    }

    return {
      mode: 'punchline_clash',
      phase: this.phase,
      round: 3,
      phaseEndsAt: this.phaseEndsAt,
      submittedCount: this.finalVoterBallots.size,
      requiredCount: allPlayers.filter((p) => p.connected).length,
      finalPrompt: this.finalPrompt,
      finalEntries,
      myFinalVotes: this.finalVoterBallots.get(playerId) ?? [],
      requiredMedalCount: this.getRequiredFinalMedalCount()
    };
  }
}
