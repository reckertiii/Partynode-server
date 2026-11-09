import {
  matchSurveyAnswer,
  sanitizeUserText,
  type PlayerProfile,
  type SurveyBoardSlotPublic,
  type SurveyPack,
  type SurveyPhase,
  type SurveyQuestionItem,
  type SurveyShowdownView,
  type SurveyTeamId
} from '@partynode/shared';

function oppositeTeam(team: SurveyTeamId): SurveyTeamId {
  return team === 'gold' ? 'cyber' : 'gold';
}

export class SurveyShowdownEngine {
  private phase: SurveyPhase = 'team_setup';
  private round = 1;
  private readonly totalRounds: number;
  private phaseEndsAt: number | null = null;

  private mcPlayerId: string | null = null;
  private goldMembers: string[] = [];
  private cyberMembers: string[] = [];
  private goldScore = 0;
  private cyberScore = 0;

  private questions: SurveyQuestionItem[];
  private currentQuestion!: SurveyQuestionItem;
  private revealedMask: boolean[] = [];

  private roundBank = 0;
  private strikes = 0;
  private lastStrikeAt: number | null = null;
  private lastEventBanner: string | null = null;

  private faceoffRotation = { goldIdx: 0, cyberIdx: 0 };
  private boardTurnCursor = { goldIdx: 0, cyberIdx: 0 };

  private faceoffPlayers: { goldId: string | null; cyberId: string | null } = {
    goldId: null,
    cyberId: null
  };
  private buzzedTeam: SurveyTeamId | null = null;
  private faceoffAttemptsDone = 0;
  private faceoffBestSlotIndex: number | null = null;
  private faceoffWinningTeam: SurveyTeamId | null = null;

  private activeTurnTeam: SurveyTeamId | null = null;
  private boardControllingTeam: SurveyTeamId | null = null;

  private pendingGuess: {
    playerId: string;
    team: SurveyTeamId;
    text: string;
    context: 'faceoff' | 'board' | 'steal';
  } | null = null;

  private readonly familyFriendly: boolean;

  constructor(pack: SurveyPack, activePlayers: PlayerProfile[], familyFriendly: boolean) {
    this.familyFriendly = familyFriendly;
    this.questions = [...pack.questions];
    this.totalRounds = Math.min(3, Math.max(1, this.questions.length));
    this.autoAssignPlayers(activePlayers);
  }

  private getMultiplier(): number {
    if (this.round === 2) return 2;
    if (this.round >= 3) return 3;
    return 1;
  }

  public autoAssignPlayers(players: PlayerProfile[]): void {
    const nonMc = players.filter((p) => p.id !== this.mcPlayerId);
    this.goldMembers = this.goldMembers.filter((id) => nonMc.some((p) => p.id === id));
    this.cyberMembers = this.cyberMembers.filter((id) => nonMc.some((p) => p.id === id));

    for (const p of nonMc) {
      if (!this.goldMembers.includes(p.id) && !this.cyberMembers.includes(p.id)) {
        if (this.goldMembers.length <= this.cyberMembers.length) {
          this.goldMembers.push(p.id);
        } else {
          this.cyberMembers.push(p.id);
        }
      }
    }
  }

  public joinTeam(playerId: string, team: SurveyTeamId | 'auto', players: PlayerProfile[]): void {
    if (this.phase !== 'team_setup') return;
    if (this.mcPlayerId === playerId) {
      this.mcPlayerId = null;
    }
    if (team === 'auto') {
      this.goldMembers = [];
      this.cyberMembers = [];
      this.autoAssignPlayers(players);
      return;
    }
    this.goldMembers = this.goldMembers.filter((id) => id !== playerId);
    this.cyberMembers = this.cyberMembers.filter((id) => id !== playerId);
    if (team === 'gold') this.goldMembers.push(playerId);
    else this.cyberMembers.push(playerId);
  }

  public setMc(playerId: string, claim: boolean, players: PlayerProfile[]): boolean {
    if (this.phase !== 'team_setup') return false;
    if (claim) {
      this.mcPlayerId = playerId;
      this.goldMembers = this.goldMembers.filter((id) => id !== playerId);
      this.cyberMembers = this.cyberMembers.filter((id) => id !== playerId);
    } else if (this.mcPlayerId === playerId) {
      this.mcPlayerId = null;
      this.autoAssignPlayers(players);
    }
    return true;
  }

  public getPlayerTeam(playerId: string): SurveyTeamId | null {
    if (this.goldMembers.includes(playerId)) return 'gold';
    if (this.cyberMembers.includes(playerId)) return 'cyber';
    return null;
  }

  public beginRound(roundNumber: number, players: PlayerProfile[], now = Date.now()): { ok: boolean; error?: string } {
    this.autoAssignPlayers(players);
    if (this.goldMembers.length === 0 || this.cyberMembers.length === 0) {
      return {
        ok: false,
        error: 'Both Gold Squad and Cyber Squad need at least 1 player (need 2+ non-MC players).'
      };
    }

    this.round = roundNumber;
    this.currentQuestion = this.questions[(roundNumber - 1) % this.questions.length];
    this.revealedMask = this.currentQuestion.answers.map(() => false);
    this.roundBank = 0;
    this.strikes = 0;
    this.lastStrikeAt = null;
    this.buzzedTeam = null;
    this.faceoffAttemptsDone = 0;
    this.faceoffBestSlotIndex = null;
    this.faceoffWinningTeam = null;
    this.pendingGuess = null;

    const goldId = this.goldMembers[this.faceoffRotation.goldIdx % this.goldMembers.length];
    const cyberId = this.cyberMembers[this.faceoffRotation.cyberIdx % this.cyberMembers.length];
    this.faceoffRotation.goldIdx++;
    this.faceoffRotation.cyberIdx++;

    this.faceoffPlayers = { goldId, cyberId };
    this.activeTurnTeam = null;
    this.boardControllingTeam = null;
    this.lastEventBanner = `Round ${roundNumber} (${this.getMultiplier()}x Points) — Face-Off! Hit the buzzer!`;
    this.phase = 'faceoff_buzz';
    this.phaseEndsAt = now + 15_000;
    return { ok: true };
  }

  public buzz(playerId: string, now = Date.now()): boolean {
    if (this.phase !== 'faceoff_buzz') return false;
    let team: SurveyTeamId | null = null;
    if (playerId === this.faceoffPlayers.goldId || (this.goldMembers.length === 1 && this.goldMembers[0] === playerId)) {
      team = 'gold';
    } else if (playerId === this.faceoffPlayers.cyberId || (this.cyberMembers.length === 1 && this.cyberMembers[0] === playerId)) {
      team = 'cyber';
    }
    if (!team) return false;

    this.buzzedTeam = team;
    this.activeTurnTeam = team;
    this.phase = 'faceoff_guess';
    this.phaseEndsAt = now + 18_000;
    this.lastEventBanner = `${team === 'gold' ? 'Gold Squad' : 'Cyber Squad'} buzzed in first! Type your answer!`;
    return true;
  }

  private getCurrentActiveGuesserId(): string | null {
    if (this.phase === 'faceoff_guess' && this.activeTurnTeam) {
      return this.activeTurnTeam === 'gold' ? this.faceoffPlayers.goldId : this.faceoffPlayers.cyberId;
    }
    if (this.phase === 'board_play' && this.activeTurnTeam) {
      const roster = this.activeTurnTeam === 'gold' ? this.goldMembers : this.cyberMembers;
      if (roster.length === 0) return null;
      const idx = this.activeTurnTeam === 'gold' ? this.boardTurnCursor.goldIdx : this.boardTurnCursor.cyberIdx;
      return roster[idx % roster.length];
    }
    if (this.phase === 'steal_guess' && this.activeTurnTeam) {
      const roster = this.activeTurnTeam === 'gold' ? this.goldMembers : this.cyberMembers;
      return roster[0] ?? null;
    }
    return null;
  }

  public submitGuess(playerId: string, rawText: string, now = Date.now()): boolean {
    if (!['faceoff_guess', 'board_play', 'steal_guess'].includes(this.phase)) return false;
    if (!this.activeTurnTeam) return false;

    const playerTeam = this.getPlayerTeam(playerId);
    if (playerTeam !== this.activeTurnTeam) return false;

    // During board_play with multiple teammates, enforce rotating guesser unless solo
    const expectedGuesser = this.getCurrentActiveGuesserId();
    if (this.phase === 'board_play' && expectedGuesser && expectedGuesser !== playerId) {
      return false;
    }
    if (this.phase === 'faceoff_guess' && expectedGuesser && expectedGuesser !== playerId) {
      return false;
    }

    const clean = sanitizeUserText(rawText, { maxLength: 80, familyFriendly: this.familyFriendly });
    if (!clean) return false;

    const context: 'faceoff' | 'board' | 'steal' =
      this.phase === 'faceoff_guess' ? 'faceoff' : this.phase === 'board_play' ? 'board' : 'steal';

    const match = matchSurveyAnswer(clean, this.currentQuestion.answers, this.revealedMask);
    if (match.matchedIndex !== null) {
      this.applyAwardedSlot(match.matchedIndex, this.activeTurnTeam, context, clean, now);
      return true;
    }

    // No automatic fuzzy match: if a live MC is seated, let the MC make the final call!
    if (this.mcPlayerId) {
      this.pendingGuess = {
        playerId,
        team: this.activeTurnTeam,
        text: clean,
        context
      };
      this.phase = 'mc_review';
      this.phaseEndsAt = now + 20_000;
      this.lastEventBanner = `MC Review: "${clean}" — Waiting on Host call!`;
      return true;
    }

    // Full Auto Mode: apply miss / strike immediately
    this.applyMiss(this.activeTurnTeam, context, clean, now);
    return true;
  }

  public mcJudgePending(playerId: string, awardSlotIndex: number | null, now = Date.now()): boolean {
    if (this.phase !== 'mc_review' || !this.pendingGuess) return false;
    if (this.mcPlayerId !== playerId) return false;

    const { team, context, text } = this.pendingGuess;
    this.pendingGuess = null;

    if (
      awardSlotIndex !== null &&
      awardSlotIndex >= 0 &&
      awardSlotIndex < this.currentQuestion.answers.length &&
      !this.revealedMask[awardSlotIndex]
    ) {
      this.applyAwardedSlot(awardSlotIndex, team, context, text, now);
    } else {
      this.applyMiss(team, context, text, now);
    }
    return true;
  }

  public mcRevealSlot(playerId: string, slotIndex: number, isLeader: boolean): boolean {
    if (this.phase !== 'round_reveal') return false;
    if (playerId !== this.mcPlayerId && !isLeader) return false;
    if (slotIndex < 0 || slotIndex >= this.revealedMask.length) return false;
    this.revealedMask[slotIndex] = true;
    return true;
  }

  private advanceTeamGuesserCursor(team: SurveyTeamId): void {
    if (team === 'gold') this.boardTurnCursor.goldIdx++;
    else this.boardTurnCursor.cyberIdx++;
  }

  private applyAwardedSlot(
    slotIndex: number,
    team: SurveyTeamId,
    context: 'faceoff' | 'board' | 'steal',
    guessText: string,
    now: number
  ): void {
    this.revealedMask[slotIndex] = true;
    const slot = this.currentQuestion.answers[slotIndex];
    const pts = slot.points * this.getMultiplier();
    this.roundBank += pts;

    if (context === 'faceoff') {
      this.faceoffAttemptsDone++;
      if (this.faceoffBestSlotIndex === null || slotIndex < this.faceoffBestSlotIndex) {
        this.faceoffBestSlotIndex = slotIndex;
        this.faceoffWinningTeam = team;
      }

      // Number 1 answer wins face-off immediately!
      if (slotIndex === 0 || this.faceoffAttemptsDone >= 2) {
        const winner = this.faceoffWinningTeam ?? team;
        this.activeTurnTeam = winner;
        this.phase = 'play_or_pass';
        this.phaseEndsAt = now + 15_000;
        this.lastEventBanner = `"${slot.text}" (+${pts})! ${winner === 'gold' ? 'Gold' : 'Cyber'} wins Face-Off — Play or Pass?`;
      } else {
        // Other team gets 1 chance to beat this rank
        const nextTeam = oppositeTeam(team);
        this.activeTurnTeam = nextTeam;
        this.phase = 'faceoff_guess';
        this.phaseEndsAt = now + 18_000;
        this.lastEventBanner = `"${slot.text}" is #${slotIndex + 1}! ${nextTeam === 'gold' ? 'Gold' : 'Cyber'} can steal control with a higher answer!`;
      }
      return;
    }

    if (context === 'board') {
      this.advanceTeamGuesserCursor(team);
      if (this.revealedMask.every(Boolean)) {
        // Swept the entire board!
        this.awardBankToTeam(team, `Board Cleared! "${slot.text}" (+${pts})!`, now);
      } else {
        this.phase = 'board_play';
        this.phaseEndsAt = now + 22_000;
        this.lastEventBanner = `Survey says: "${slot.text}" (+${pts})! Keep going!`;
      }
      return;
    }

    if (context === 'steal') {
      this.awardBankToTeam(
        team,
        `STEAL SUCCESSFUL! "${guessText}" matched "${slot.text}"! ${team === 'gold' ? 'Gold' : 'Cyber'} steals the bank!`,
        now
      );
    }
  }

  private applyMiss(
    team: SurveyTeamId,
    context: 'faceoff' | 'board' | 'steal',
    guessText: string,
    now: number
  ): void {
    this.lastStrikeAt = now;

    if (context === 'faceoff') {
      this.faceoffAttemptsDone++;
      if (this.faceoffAttemptsDone === 1) {
        const nextTeam = oppositeTeam(team);
        this.activeTurnTeam = nextTeam;
        this.phase = 'faceoff_guess';
        this.phaseEndsAt = now + 18_000;
        this.lastEventBanner = `❌ "${guessText}" isn't up there! ${nextTeam === 'gold' ? 'Gold' : 'Cyber'} gets a shot!`;
      } else {
        const winner = this.faceoffWinningTeam ?? this.buzzedTeam ?? 'gold';
        this.activeTurnTeam = winner;
        this.phase = 'play_or_pass';
        this.phaseEndsAt = now + 15_000;
        this.lastEventBanner = `❌ Not on the board! ${winner === 'gold' ? 'Gold' : 'Cyber'} takes Face-Off control — Play or Pass?`;
      }
      return;
    }

    if (context === 'board') {
      this.strikes++;
      this.advanceTeamGuesserCursor(team);
      if (this.strikes >= 3) {
        const stealer = oppositeTeam(team);
        this.activeTurnTeam = stealer;
        this.phase = 'steal_guess';
        this.phaseEndsAt = now + 25_000;
        this.lastEventBanner = `❌❌❌ THREE STRIKES! ${stealer === 'gold' ? 'Gold Squad' : 'Cyber Squad'} has one chance to STEAL!`;
      } else {
        this.phase = 'board_play';
        this.phaseEndsAt = now + 22_000;
        this.lastEventBanner = `❌ "${guessText}" — Strike ${this.strikes} of 3!`;
      }
      return;
    }

    if (context === 'steal') {
      const originalOwner = this.boardControllingTeam ?? oppositeTeam(team);
      this.awardBankToTeam(
        originalOwner,
        `❌ "${guessText}" missed the steal! ${originalOwner === 'gold' ? 'Gold Squad' : 'Cyber Squad'} keeps ${this.roundBank} pts!`,
        now
      );
    }
  }

  public choosePlayOrPass(playerId: string, decision: 'play' | 'pass', now = Date.now()): boolean {
    if (this.phase !== 'play_or_pass' || !this.activeTurnTeam) return false;
    if (this.getPlayerTeam(playerId) !== this.activeTurnTeam) return false;

    const controlTeam = decision === 'play' ? this.activeTurnTeam : oppositeTeam(this.activeTurnTeam);
    this.boardControllingTeam = controlTeam;
    this.activeTurnTeam = controlTeam;
    this.strikes = 0;
    this.phase = 'board_play';
    this.phaseEndsAt = now + 22_000;
    this.lastEventBanner = `${controlTeam === 'gold' ? 'Gold Squad' : 'Cyber Squad'} is playing the board!`;
    return true;
  }

  private awardBankToTeam(winner: SurveyTeamId, banner: string, now: number): void {
    if (winner === 'gold') this.goldScore += this.roundBank;
    else this.cyberScore += this.roundBank;

    // If no MC is seated, auto-reveal the rest of the board so everyone gets closure!
    if (!this.mcPlayerId) {
      this.revealedMask = this.revealedMask.map(() => true);
    }

    this.lastEventBanner = banner;
    this.phase = 'round_reveal';
    this.phaseEndsAt = now + 12_000;
  }

  public syncScoresToProfiles(players: Map<string, PlayerProfile>): void {
    for (const id of this.goldMembers) {
      const p = players.get(id);
      if (p) p.score = this.goldScore;
    }
    for (const id of this.cyberMembers) {
      const p = players.get(id);
      if (p) p.score = this.cyberScore;
    }
  }

  public advanceNextRoundOrFinish(players: PlayerProfile[], now = Date.now()): void {
    if (this.round < this.totalRounds) {
      this.beginRound(this.round + 1, players, now);
    } else {
      this.revealedMask = this.revealedMask.map(() => true);
      this.phase = 'game_over';
      this.phaseEndsAt = null;
      if (this.goldScore > this.cyberScore) {
        this.lastEventBanner = '🏆 Gold Squad wins Survey Showdown!';
      } else if (this.cyberScore > this.goldScore) {
        this.lastEventBanner = '🏆 Cyber Squad wins Survey Showdown!';
      } else {
        this.lastEventBanner = '⚡ Incredible Tie Game!';
      }
    }
  }

  public skipCurrentPhase(players: PlayerProfile[], now = Date.now()): void {
    this.handleTimeout(players, now);
  }

  public tick(players: PlayerProfile[], now = Date.now()): boolean {
    if (this.phaseEndsAt !== null && now >= this.phaseEndsAt) {
      this.handleTimeout(players, now);
      return true;
    }
    return false;
  }

  private handleTimeout(players: PlayerProfile[], now: number): void {
    if (this.phase === 'faceoff_buzz') {
      // Auto-pick Gold to guess if nobody buzzed in time
      this.buzzedTeam = 'gold';
      this.activeTurnTeam = 'gold';
      this.phase = 'faceoff_guess';
      this.phaseEndsAt = now + 18_000;
      this.lastEventBanner = 'Time expired on buzzer — Gold Squad goes first!';
      return;
    }
    if (this.phase === 'faceoff_guess' && this.activeTurnTeam) {
      this.applyMiss(this.activeTurnTeam, 'faceoff', '(Timed Out)', now);
      return;
    }
    if (this.phase === 'mc_review' && this.pendingGuess) {
      const { team, context, text } = this.pendingGuess;
      this.pendingGuess = null;
      this.applyMiss(team, context, text, now);
      return;
    }
    if (this.phase === 'play_or_pass' && this.activeTurnTeam) {
      this.boardControllingTeam = this.activeTurnTeam;
      this.phase = 'board_play';
      this.phaseEndsAt = now + 22_000;
      this.lastEventBanner = `${this.activeTurnTeam === 'gold' ? 'Gold Squad' : 'Cyber Squad'} plays the board!`;
      return;
    }
    if (this.phase === 'board_play' && this.activeTurnTeam) {
      this.applyMiss(this.activeTurnTeam, 'board', '(Timed Out)', now);
      return;
    }
    if (this.phase === 'steal_guess' && this.activeTurnTeam) {
      this.applyMiss(this.activeTurnTeam, 'steal', '(Timed Out)', now);
      return;
    }
    if (this.phase === 'round_reveal') {
      this.advanceNextRoundOrFinish(players, now);
    }
  }

  public getViewForPlayer(playerId: string): SurveyShowdownView {
    const board: SurveyBoardSlotPublic[] = (this.currentQuestion?.answers ?? []).map((slot, idx) => {
      const revealed = this.revealedMask[idx] ?? false;
      return {
        index: idx,
        revealed,
        text: revealed ? slot.text : undefined,
        points: revealed ? slot.points : undefined
      };
    });

    let winnerTeam: SurveyTeamId | 'tie' | null = null;
    if (this.phase === 'game_over') {
      if (this.goldScore > this.cyberScore) winnerTeam = 'gold';
      else if (this.cyberScore > this.goldScore) winnerTeam = 'cyber';
      else winnerTeam = 'tie';
    }

    const view: SurveyShowdownView = {
      mode: 'survey_showdown',
      phase: this.phase,
      round: this.round,
      totalRounds: this.totalRounds,
      multiplier: this.getMultiplier(),
      phaseEndsAt: this.phaseEndsAt,
      mcPlayerId: this.mcPlayerId,
      teams: {
        gold: { name: 'Gold Squad', score: this.goldScore, memberIds: [...this.goldMembers] },
        cyber: { name: 'Cyber Squad', score: this.cyberScore, memberIds: [...this.cyberMembers] }
      },
      roundBank: this.roundBank,
      strikes: this.strikes,
      lastStrikeAt: this.lastStrikeAt,
      lastEventBanner: this.lastEventBanner,
      questionPrompt: this.currentQuestion ? this.currentQuestion.prompt : null,
      board,
      faceoffPlayers: { ...this.faceoffPlayers },
      buzzedTeam: this.buzzedTeam,
      activeTurnTeam: this.activeTurnTeam,
      activeGuesserId: this.getCurrentActiveGuesserId(),
      faceoffBestSlotIndex: this.faceoffBestSlotIndex,
      faceoffWinningTeam: this.faceoffWinningTeam,
      pendingGuess: this.pendingGuess ? { ...this.pendingGuess } : null,
      winnerTeam
    };

    // Security boundary: ONLY the seated MC receives unrevealed answers!
    if (this.mcPlayerId === playerId && this.currentQuestion) {
      view.mcSecretSheet = this.currentQuestion.answers;
    }

    return view;
  }
}
