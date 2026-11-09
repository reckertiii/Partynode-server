import type { SurveyAnswerSlot } from './types.js';

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'my',
  'your',
  'our',
  'their',
  'his',
  'her',
  'some',
  'to',
  'in',
  'on',
  'at',
  'of',
  'for',
  'going'
]);

/**
 * Normalizes a survey answer or player guess into clean comparable tokens.
 */
export function normalizeSurveyText(raw: string): string {
  const cleaned = raw
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return '';

  const tokens = cleaned
    .split(' ')
    .filter((tok) => tok.length > 0 && !STOP_WORDS.has(tok))
    .map((tok) => stemLight(tok));

  // Fall back to raw cleaned tokens if everything was a stop-word (e.g. "My")
  if (tokens.length === 0) {
    return cleaned;
  }

  return tokens.join(' ');
}

function stemLight(word: string): string {
  if (word.length <= 3) return word;
  if (word.endsWith('ing') && word.length > 5) {
    return word.slice(0, -3);
  }
  if (word.endsWith('ies') && word.length > 4) {
    return word.slice(0, -3) + 'y';
  }
  if (word.endsWith('es') && word.length > 4 && !word.endsWith('ses')) {
    // Handle e.g. "dishes" -> "dish", "taxes" -> "tax", "phones" -> "phon"
    if (/(sh|ch|x|z)es$/.test(word)) {
      return word.slice(0, -2);
    }
  }
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) {
    return word.slice(0, -1);
  }
  return word;
}

export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prevDiag = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(
        dp[j] + 1,       // deletion
        dp[j - 1] + 1,   // insertion
        prevDiag + cost  // substitution
      );
      prevDiag = temp;
    }
  }
  return dp[b.length];
}

export function stringSimilarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshteinDistance(a, b) / maxLen;
}

function candidateSimilarity(guessNorm: string, targetRaw: string): number {
  const targetNorm = normalizeSurveyText(targetRaw);
  if (!guessNorm || !targetNorm) return 0;
  if (guessNorm === targetNorm) return 1;

  // Direct string similarity
  let best = stringSimilarity(guessNorm, targetNorm);

  // Order-independent token similarity (e.g. "alarm clock" vs "clock alarm")
  const guessTokens = guessNorm.split(' ').sort().join(' ');
  const targetTokens = targetNorm.split(' ').sort().join(' ');
  best = Math.max(best, stringSimilarity(guessTokens, targetTokens));

  // Sub-phrase containment if guess has at least 4 chars and covers a primary keyword
  const tWords = targetNorm.split(' ');
  const gWords = guessNorm.split(' ');
  if (guessNorm.length >= 4 && tWords.length >= 2) {
    const matchedWords = gWords.filter((gw) =>
      tWords.some((tw) => tw === gw || (tw.length >= 5 && stringSimilarity(gw, tw) >= 0.82))
    );
    if (matchedWords.length === gWords.length && matchedWords.length >= 1) {
      // e.g. guessing "teeth" for "Brush Your Teeth" -> strong partial match if unambiguous
      best = Math.max(best, 0.84);
    }
  }

  return best;
}

export interface SurveyMatchResult {
  matchedIndex: number | null;
  confidence: number;
}

/**
 * Matches a player's free-text guess against unrevealed slots on a Survey Showdown board.
 * Checks both the main slot display text and all configured aliases.
 */
export function matchSurveyAnswer(
  guess: string,
  slots: SurveyAnswerSlot[],
  revealedMask: boolean[],
  threshold = 0.78
): SurveyMatchResult {
  const guessNorm = normalizeSurveyText(guess);
  if (!guessNorm) {
    return { matchedIndex: null, confidence: 0 };
  }

  let bestIndex: number | null = null;
  let bestScore = 0;

  for (let i = 0; i < slots.length; i++) {
    if (revealedMask[i]) continue;
    const slot = slots[i];
    const candidates = [slot.text, ...(slot.aliases || [])];
    for (const candidate of candidates) {
      const score = candidateSimilarity(guessNorm, candidate);
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }
  }

  if (bestIndex !== null && bestScore >= threshold) {
    return { matchedIndex: bestIndex, confidence: bestScore };
  }

  return { matchedIndex: null, confidence: bestScore };
}
