import type {
  BlitzPack,
  BluffPack,
  ContentPack,
  PackSummary,
  PunchlinePack,
  SurveyPack
} from './types.js';
import { PUNCHLINE_PACKS } from './packs/punchlinePacks.js';
import { BLUFF_PACKS } from './packs/bluffPacks.js';
import { SURVEY_PACKS } from './packs/surveyPacks.js';
import { BLITZ_PACKS } from './packs/blitzPacks.js';

const megaPunchline: PunchlinePack = {
  id: 'builtin-megamix-punchline',
  game: 'punchline_clash',
  title: '🎲 Mega Mix — All Comedy Prompts (250+)',
  description: 'Every built-in Punchline Clash pack shuffled together into one massive party deck!',
  author: 'PartyNode Official',
  familyFriendly: true,
  builtIn: true,
  updatedAt: '2026-11-09T00:00:00.000Z',
  prompts: PUNCHLINE_PACKS.flatMap((p) => p.prompts),
  finalPrompts: PUNCHLINE_PACKS.flatMap((p) => p.finalPrompts)
};

const megaBluff: BluffPack = {
  id: 'builtin-megamix-bluff',
  game: 'bluff_battle',
  title: '🎲 Mega Mix — All 80 Bizarre Real Facts',
  description: 'History, weird laws, game dev hacks, freaky nature, and pop culture secrets combined!',
  author: 'PartyNode Official',
  familyFriendly: true,
  builtIn: true,
  updatedAt: '2026-11-09T00:00:00.000Z',
  questions: BLUFF_PACKS.flatMap((p) => p.questions)
};

const megaSurvey: SurveyPack = {
  id: 'builtin-megamix-survey',
  game: 'survey_showdown',
  title: '🎲 Mega Mix — All 52 Survey Boards',
  description: 'Every 100-person survey board across Everyday Life, Gaming, Food, Work & Pop Culture!',
  author: 'PartyNode Official',
  familyFriendly: true,
  builtIn: true,
  updatedAt: '2026-11-09T00:00:00.000Z',
  questions: SURVEY_PACKS.flatMap((p) => p.questions)
};

const megaBlitz: BlitzPack = {
  id: 'builtin-megamix-blitz',
  game: 'blitz_quiz',
  title: '🎲 Mega Mix — All 112 Trivia Questions',
  description: 'Nonstop trivia mashup spanning General Knowledge, Gaming, Movies/Music, and Science!',
  author: 'PartyNode Official',
  familyFriendly: true,
  builtIn: true,
  updatedAt: '2026-11-09T00:00:00.000Z',
  questions: BLITZ_PACKS.flatMap((p) => p.questions)
};

export const BUILT_IN_PACKS: ContentPack[] = [
  megaPunchline,
  ...PUNCHLINE_PACKS,
  megaBluff,
  ...BLUFF_PACKS,
  megaSurvey,
  ...SURVEY_PACKS,
  megaBlitz,
  ...BLITZ_PACKS
];

export function summarizePack(pack: ContentPack): PackSummary {
  let itemCount = 0;
  if (pack.game === 'punchline_clash') {
    itemCount = pack.prompts.length + pack.finalPrompts.length;
  } else {
    itemCount = pack.questions.length;
  }
  return {
    id: pack.id,
    game: pack.game,
    title: pack.title,
    description: pack.description,
    author: pack.author,
    familyFriendly: pack.familyFriendly,
    builtIn: pack.builtIn,
    updatedAt: pack.updatedAt,
    itemCount
  };
}
