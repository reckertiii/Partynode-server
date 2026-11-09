import {
  normalizeSurveyText,
  sanitizeUserText,
  stringSimilarity,
  type BluffBattleView,
  type BluffChoicePublic,
  type BluffPack,
  type BluffPhase,
  type BluffQuestionItem,
  type PlayerProfile
} from '@partynode/shared';

interface InternalBluffOption {
  optionId: string;
  text: string;
  isTruth: boolean;
  isHouseDecoy: boolean;
  authorIds: string[];
  pickedByIds: string[];
  likedByIds: string[];
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

export class BluffBattleEngine {
  private phase: BluffPhase = 'writing_lies';
  private questionIndex = 0;
  private readonly questions: BluffQuestionItem[];
  private readonly familyFriendly: boolean;
  private phaseEndsAt: number | null = null;

  private playerLies = new Map<string, string>(); // playerId -> lie text
  private options: InternalBluffOption[] = [];
  private playerPicks = new Map<string, string>(); // playerId -> optionId
  private playerLikes = new Map<string, string>(); // playerId -> optionId

  constructor(pack: BluffPack, familyFriendly: boolean, now = Date.now()) {
    this.questions = [...pack.questions];
    this.familyFriendly = familyFriendly;
    this.startQuestion(0, now);
  }

  private getMultiplier(): number {
    if (this.questionIndex === this.questions.length - 1 && this.questions.length >= 3) {
      return 3;
    }
    if (this.questionIndex >= Math.floor(this.questions.length / 2) && this.questions.length >= 2) {
      return 2;
    }
    return 1;
  }

  private startQuestion(idx: number, now: number): void {
    this.questionIndex = idx;
    this.playerLies.clear();
    this.options = [];
    this.playerPicks.clear();
    this.playerLikes.clear();
    this.phase = 'writing_lies';
    this.phaseEndsAt = now + 45_000;
  }

  public submitLie(
    playerId: string,
    rawText: string,
    players: Map<string, PlayerProfile>,
    now = Date.now()
  ): { ok: boolean; hitTruth?: boolean; error?: string } {
    if (this.phase !== 'writing_lies') {
      return { ok: false, error: 'Lie writing has already ended.' };
    }

    const clean = sanitizeUserText(rawText, {
      maxLength: 85,
      familyFriendly: this.familyFriendly
    });
    if (!clean) {
      return { ok: false, error: 'Please enter a fake answer.' };
    }

    const q = this.questions[this.questionIndex];
    const truthNorm = normalizeSurveyText(q.truth);
    const guessNorm = normalizeSurveyText(clean);
    if (
      truthNorm &&
      guessNorm &&
      (truthNorm === guessNorm || stringSimilarity(guessNorm, truthNorm) >= 0.8)
    ) {
      return {
        ok: false,
        hitTruth: true,
        error: "🎯 Whoa—that's the REAL truth! Write a fake answer to trick everyone else!"
      };
    }

    this.playerLies.set(playerId, clean);

    const connected = Array.from(players.values()).filter((p) => p.connected);
    if (connected.length > 0 && connected.every((p) => this.playerLies.has(p.id))) {
      this.buildChoicesAndStartPicking(now);
    }
    return { ok: true };
  }

  private buildChoicesAndStartPicking(now: number): void {
    const q = this.questions[this.questionIndex];
    const groupedLies = new Map<string, { display: string; authorIds: string[] }>();

    for (const [pid, text] of this.playerLies.entries()) {
      const key = text.toLowerCase().trim();
      const existing = groupedLies.get(key);
      if (existing) {
        existing.authorIds.push(pid);
      } else {
        groupedLies.set(key, { display: text, authorIds: [pid] });
      }
    }

    const built: InternalBluffOption[] = [];
    built.push({
      optionId: 'opt-truth',
      text: q.truth,
      isTruth: true,
      isHouseDecoy: false,
      authorIds: [],
      pickedByIds: [],
      likedByIds: [],
      pointsEarned: 0
    });

    let idx = 0;
    for (const item of groupedLies.values()) {
      built.push({
        optionId: `opt-lie-${idx++}`,
        text: item.display,
        isTruth: false,
        isHouseDecoy: false,
        authorIds: item.authorIds,
        pickedByIds: [],
        likedByIds: [],
        pointsEarned: 0
      });
    }

    // Pad with sneaky House Decoys so small groups still have >= 4 plausible options!
    const usedLower = new Set(built.map((b) => b.text.toLowerCase().trim()));
    for (const decoy of shuffle(q.decoys)) {
      if (built.length >= 4) break;
      const lower = decoy.toLowerCase().trim();
      if (!lower || usedLower.has(lower)) continue;
      usedLower.add(lower);
      built.push({
        optionId: `opt-decoy-${idx++}`,
        text: decoy,
        isTruth: false,
        isHouseDecoy: true,
        authorIds: [],
        pickedByIds: [],
        likedByIds: [],
        pointsEarned: 0
      });
    }

    this.options = shuffle(built);
    this.phase = 'picking_truth';
    this.phaseEndsAt = now + 25_000;
  }

  public pickOption(
    playerId: string,
    optionId: string,
    players: Map<string, PlayerProfile>,
    now = Date.now()
  ): { ok: boolean; error?: string } {
    if (this.phase !== 'picking_truth') return { ok: false };
    if (this.playerPicks.has(playerId)) return { ok: false };

    const target = this.options.find((o) => o.optionId === optionId);
    if (!target) return { ok: false };
    if (target.authorIds.includes(playerId)) {
      return { ok: false, error: "You can't pick your own bluff!" };
    }

    this.playerPicks.set(playerId, optionId);
    target.pickedByIds.push(playerId);

    const connected = Array.from(players.values()).filter((p) => p.connected);
    if (connected.length > 0 && connected.every((p) => this.playerPicks.has(p.id))) {
      this.scoreAndReveal(players, now);
    }
    return { ok: true };
  }

  public likeOption(playerId: string, optionId: string, players: Map<string, PlayerProfile>): boolean {
    if (this.phase !== 'picking_truth' && this.phase !== 'reveal') return false;
    if (this.playerLikes.has(playerId)) return false;

    const target = this.options.find((o) => o.optionId === optionId);
    if (!target || target.isTruth || target.authorIds.includes(playerId)) return false;

    this.playerLikes.set(playerId, optionId);
    target.likedByIds.push(playerId);

    // If we're already in reveal, award the +100 laugh bonus immediately!
    if (this.phase === 'reveal') {
      for (const authorId of target.authorIds) {
        const p = players.get(authorId);
        if (p) p.score += 100;
      }
      target.pointsEarned += 100;
    }
    return true;
  }

  private scoreAndReveal(players: Map<string, PlayerProfile>, now: number): void {
    const mult = this.getMultiplier();
    const truthReward = 1000 * mult;
    const foolReward = 500 * mult;

    for (const opt of this.options) {
      if (opt.isTruth) {
        opt.pointsEarned = truthReward;
        for (const finderId of opt.pickedByIds) {
          const p = players.get(finderId);
          if (p) p.score += truthReward;
        }
      } else if (opt.authorIds.length > 0) {
        const fooledBonus = opt.pickedByIds.length * foolReward;
        const laughBonus = opt.likedByIds.length * 100;
        opt.pointsEarned = fooledBonus + laughBonus;
        for (const authorId of opt.authorIds) {
          const p = players.get(authorId);
          if (p) p.score += opt.pointsEarned;
        }
      }
    }

    this.phase = 'reveal';
    this.phaseEndsAt = now + 8_500;
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
    if (this.phase === 'writing_lies') {
      this.buildChoicesAndStartPicking(now);
      return;
    }
    if (this.phase === 'picking_truth') {
      this.scoreAndReveal(players, now);
      return;
    }
    if (this.phase === 'reveal') {
      if (this.questionIndex + 1 >= this.questions.length) {
        this.phase = 'podium';
        this.phaseEndsAt = null;
      } else {
        this.phase = 'leaderboard';
        this.phaseEndsAt = now + 5_000;
      }
      return;
    }
    if (this.phase === 'leaderboard') {
      this.startQuestion(this.questionIndex + 1, now);
    }
  }

  public getViewForPlayer(playerId: string, players: Map<string, PlayerProfile>): BluffBattleView {
    const q = this.questions[this.questionIndex];
    const connectedCount = Array.from(players.values()).filter((p) => p.connected).length;
    const isRevealed = this.phase === 'reveal' || this.phase === 'leaderboard' || this.phase === 'podium';

    const choices: BluffChoicePublic[] | undefined =
      this.phase === 'writing_lies'
        ? undefined
        : this.options.map((o) => ({
            optionId: o.optionId,
            text: o.text,
            isMine: o.authorIds.includes(playerId),
            isTruth: isRevealed ? o.isTruth : undefined,
            isHouseDecoy: isRevealed ? o.isHouseDecoy : undefined,
            authorIds: isRevealed ? o.authorIds : undefined,
            pickedByIds: isRevealed ? o.pickedByIds : undefined,
            likesCount: isRevealed ? o.likedByIds.length : undefined,
            pointsEarned: isRevealed ? o.pointsEarned : undefined
          }));

    return {
      mode: 'bluff_battle',
      phase: this.phase,
      questionIndex: this.questionIndex,
      totalQuestions: this.questions.length,
      multiplier: this.getMultiplier(),
      phaseEndsAt: this.phaseEndsAt,
      category: q.category,
      prompt: q.prompt,
      submittedCount:
        this.phase === 'writing_lies' ? this.playerLies.size : this.playerPicks.size,
      requiredCount: connectedCount,
      myLieSubmitted: this.playerLies.has(playerId),
      myLieText: this.playerLies.get(playerId),
      choices,
      myPickedOptionId: this.playerPicks.get(playerId) ?? null,
      myLikedOptionId: this.playerLikes.get(playerId) ?? null
    };
  }
}
