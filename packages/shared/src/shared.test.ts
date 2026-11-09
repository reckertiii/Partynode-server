import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BUILT_IN_PACKS,
  matchSurveyAnswer,
  sanitizeUserText,
  validateContentPack
} from './index.js';
import type { SurveyPack } from './types.js';

describe('@partynode/shared', () => {
  it('validates all built-in starter packs', () => {
    assert.ok(BUILT_IN_PACKS.length >= 6);
    for (const pack of BUILT_IN_PACKS) {
      const res = validateContentPack(pack);
      assert.equal(res.valid, true, `Pack ${pack.id} failed validation: ${res.error}`);
    }
  });

  it('fuzzy matches Survey Showdown answers including plurals, stop-words, typos, and aliases', () => {
    const surveyPack = BUILT_IN_PACKS.find((p) => p.id === 'builtin-survey-classic') as SurveyPack;
    const morningQ = surveyPack.questions[0];
    const unrevealed = morningQ.answers.map(() => false);

    // Exact / stop-word stripped
    assert.equal(matchSurveyAnswer('check my phone', morningQ.answers, unrevealed).matchedIndex, 0);
    // Gerund / stem
    assert.equal(matchSurveyAnswer('brushing teeth', morningQ.answers, unrevealed).matchedIndex, 2);
    // Minor typo ("cofee")
    assert.equal(matchSurveyAnswer('make cofee', morningQ.answers, unrevealed).matchedIndex, 3);
    // Alias ("pee")
    assert.equal(matchSurveyAnswer('pee', morningQ.answers, unrevealed).matchedIndex, 1);
    // Already revealed slot should NOT match again
    const revealedPhone = morningQ.answers.map((_, idx) => idx === 0);
    assert.equal(matchSurveyAnswer('check phone', morningQ.answers, revealedPhone).matchedIndex, null);
    // Completely wrong guess
    assert.equal(matchSurveyAnswer('skydiving with sharks', morningQ.answers, unrevealed).matchedIndex, null);
  });

  it('filters profanity when familyFriendly is enabled', () => {
    const cleaned = sanitizeUserText('What the shit is this', { familyFriendly: true });
    assert.equal(cleaned, 'What the **** is this');

    const relaxed = sanitizeUserText('What the shit is this', { familyFriendly: false });
    assert.equal(relaxed, 'What the shit is this');
  });
});
