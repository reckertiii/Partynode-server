import type {
  BlitzPack,
  BlitzPhase,
  BlitzPlayerRoundResult,
  BlitzQuestionItem,
  BlitzQuizView,
  PlayerProfile
} from '@partynode/shared';

interface PlayerAnswerRecord {
  optionIndex: 0 | 1 | 2 | 3;
  answeredAt: number;
}

export class BlitzQuizEngine {
  private phase: BlitzPhase = 'get_ready';
  private questionIndex = 0;
  private readonly questions: BlitzQuestionItem[];
  private questionStartedAt = 0;
  private phaseEndsAt: number | null = null;

  private answers = new Map<string, PlayerAnswerRecord>();
  private streaks = new Map<string, number>();
  private lastResults: BlitzPlayerRoundResult[] = [];
  private optionCounts: [number, number, number, number] = [0, 0, 0, 0];

  constructor(pack: BlitzPack, now = Date.now()) {
    this.questions = [...pack.questions];
    this.startGetReady(0, now);
  }

  private startGetReady(idx: number, now: number): void {
    this.questionIndex = idx;
    this.answers.clear();
    this.lastResults = [];
    this.optionCounts = [0, 0, 0, 0];
    this.phase = 'get_ready';
    this.phaseEndsAt = now + 3_500;
  }

  private startQuestion(now: number): void {
    const q = this.questions[this.questionIndex];
    this.questionStartedAt = now;
    this.phase = 'question';
    this.phaseEndsAt = now + (q.timeLimitSec || 15) * 1000;
  }

  public submitAnswer(
    playerId: string,
    optionIndex: 0 | 1 | 2 | 3,
    players: Map<string, PlayerProfile>,
    now = Date.now()
  ): boolean {
    if (this.phase !== 'question') return false;
    if (this.answers.has(playerId)) return false;
    if (![0, 1, 2, 3].includes(optionIndex)) return false;

    this.answers.set(playerId, { optionIndex, answeredAt: now });

    const connected = Array.from(players.values()).filter((p) => p.connected);
    if (connected.length > 0 && connected.every((p) => this.answers.has(p.id))) {
      this.scoreAndReveal(players, now);
    }
    return true;
  }

  private getStreakMultiplier(streak: number): number {
    if (streak <= 1) return 1.0;
    if (streak === 2) return 1.1;
    if (streak === 3) return 1.2;
    if (streak === 4) return 1.35;
    return 1.5;
  }

  private scoreAndReveal(players: Map<string, PlayerProfile>, now: number): void {
    const q = this.questions[this.questionIndex];
    const totalMs = Math.max(1000, (q.timeLimitSec || 15) * 1000);
    this.optionCounts = [0, 0, 0, 0];
    this.lastResults = [];

    for (const p of players.values()) {
      const ans = this.answers.get(p.id);
      if (ans) {
        this.optionCounts[ans.optionIndex]++;
      }

      if (ans && ans.optionIndex === q.correctIndex) {
        const elapsedMs = Math.max(0, Math.min(totalMs, ans.answeredAt - this.questionStartedAt));
        const speedRatio = 1 - elapsedMs / totalMs;
        const rawScore = 500 + 500 * speedRatio;
        const nextStreak = (this.streaks.get(p.id) ?? 0) + 1;
        this.streaks.set(p.id, nextStreak);
        const awarded = Math.round(rawScore * this.getStreakMultiplier(nextStreak));
        p.score += awarded;
        this.lastResults.push({
          playerId: p.id,
          answeredIndex: ans.optionIndex,
          correct: true,
          pointsAwarded: awarded,
          streak: nextStreak,
          reactionMs: elapsedMs
        });
      } else {
        this.streaks.set(p.id, 0);
        this.lastResults.push({
          playerId: p.id,
          answeredIndex: ans ? ans.optionIndex : null,
          correct: false,
          pointsAwarded: 0,
          streak: 0,
          reactionMs: ans ? Math.max(0, ans.answeredAt - this.questionStartedAt) : null
        });
      }
    }

    this.phase = 'reveal';
    this.phaseEndsAt = now + 5_500;
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
    if (this.phase === 'get_ready') {
      this.startQuestion(now);
      return;
    }
    if (this.phase === 'question') {
      this.scoreAndReveal(players, now);
      return;
    }
    if (this.phase === 'reveal') {
      if (this.questionIndex + 1 >= this.questions.length) {
        this.phase = 'podium';
        this.phaseEndsAt = null;
      } else {
        this.phase = 'leaderboard';
        this.phaseEndsAt = now + 4_500;
      }
      return;
    }
    if (this.phase === 'leaderboard') {
      this.startGetReady(this.questionIndex + 1, now);
    }
  }

  public getViewForPlayer(playerId: string): BlitzQuizView {
    const q = this.questions[this.questionIndex];
    const isRevealed = this.phase === 'reveal' || this.phase === 'leaderboard' || this.phase === 'podium';
    const myAns = this.answers.get(playerId);

    return {
      mode: 'blitz_quiz',
      phase: this.phase,
      questionIndex: this.questionIndex,
      totalQuestions: this.questions.length,
      phaseEndsAt: this.phaseEndsAt,
      prompt: q.prompt,
      category: q.category,
      options: this.phase === 'get_ready' ? undefined : q.options,
      timeLimitSec: q.timeLimitSec || 15,
      answeredPlayerIds: Array.from(this.answers.keys()),
      mySelectedOption: myAns ? myAns.optionIndex : null,
      myStreak: this.streaks.get(playerId) ?? 0,
      correctIndex: isRevealed ? q.correctIndex : undefined,
      optionCounts: isRevealed ? [...this.optionCounts] : undefined,
      lastResults: isRevealed ? this.lastResults : undefined
    };
  }
}
