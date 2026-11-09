import type { ContentPack } from './types.js';

const BLOCKED_TERMS_STRICT = [
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'dick',
  'pussy',
  'cunt',
  'bastard',
  'slut',
  'whore'
];

const BLOCKED_SLURS_ALWAYS = [
  'nigger',
  'nigga',
  'faggot',
  'retard',
  'kike',
  'chink',
  'tranny'
];

export function sanitizeUserText(
  input: string,
  options: { maxLength?: number; familyFriendly?: boolean } = {}
): string {
  const maxLength = options.maxLength ?? 120;
  let text = (input ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);

  for (const slur of BLOCKED_SLURS_ALWAYS) {
    const regex = new RegExp(`\\b${slur}\\w*\\b`, 'gi');
    text = text.replace(regex, '****');
  }

  if (options.familyFriendly) {
    for (const bad of BLOCKED_TERMS_STRICT) {
      const regex = new RegExp(`\\b${bad}\\w*\\b`, 'gi');
      text = text.replace(regex, (m) => '*'.repeat(m.length));
    }
  }

  return text;
}

export function validateContentPack(pack: ContentPack): { valid: boolean; error?: string } {
  if (!pack || typeof pack !== 'object') {
    return { valid: false, error: 'Pack payload must be a JSON object.' };
  }
  if (!pack.id || typeof pack.id !== 'string') {
    return { valid: false, error: 'Pack must have a string id.' };
  }
  if (!pack.title || pack.title.trim().length < 2) {
    return { valid: false, error: 'Pack title must be at least 2 characters.' };
  }

  if (pack.game === 'punchline_clash') {
    if (!Array.isArray(pack.prompts) || pack.prompts.filter((p) => p.trim()).length < 4) {
      return { valid: false, error: 'Punchline Clash pack requires at least 4 prompts.' };
    }
    if (!Array.isArray(pack.finalPrompts) || pack.finalPrompts.filter((p) => p.trim()).length < 1) {
      return { valid: false, error: 'Punchline Clash pack requires at least 1 final showdown prompt.' };
    }
    return { valid: true };
  }

  if (pack.game === 'bluff_battle') {
    if (!Array.isArray(pack.questions) || pack.questions.length < 1) {
      return { valid: false, error: 'Bluff Battle pack requires at least 1 bluff question.' };
    }
    for (const q of pack.questions) {
      if (!q.prompt || !q.truth || !q.truth.trim()) {
        return {
          valid: false,
          error: `Bluff Battle question "${q.prompt || 'Untitled'}" must include both a prompt and a real truth.`
        };
      }
      if (!Array.isArray(q.decoys) || q.decoys.filter((d) => d.trim()).length < 1) {
        return {
          valid: false,
          error: `Bluff Battle question "${q.prompt}" needs at least 1 decoy lie.`
        };
      }
    }
    return { valid: true };
  }

  if (pack.game === 'survey_showdown') {
    if (!Array.isArray(pack.questions) || pack.questions.length < 1) {
      return { valid: false, error: 'Survey Showdown pack requires at least 1 survey question.' };
    }
    for (const q of pack.questions) {
      if (!q.prompt || !Array.isArray(q.answers) || q.answers.length < 2 || q.answers.length > 8) {
        return {
          valid: false,
          error: `Survey question "${q.prompt || 'Untitled'}" must have between 2 and 8 answers.`
        };
      }
    }
    return { valid: true };
  }

  if (pack.game === 'blitz_quiz') {
    if (!Array.isArray(pack.questions) || pack.questions.length < 1) {
      return { valid: false, error: 'BlitzQuiz pack requires at least 1 trivia question.' };
    }
    for (const q of pack.questions) {
      if (!q.prompt || !Array.isArray(q.options) || q.options.length !== 4) {
        return {
          valid: false,
          error: `BlitzQuiz question "${q.prompt || 'Untitled'}" must have exactly 4 answer options.`
        };
      }
      if (![0, 1, 2, 3].includes(q.correctIndex)) {
        return {
          valid: false,
          error: `BlitzQuiz question "${q.prompt}" correctIndex must be 0, 1, 2, or 3.`
        };
      }
    }
    return { valid: true };
  }

  return { valid: false, error: 'Unsupported game mode in pack.' };
}
