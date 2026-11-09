import { GoogleGenAI } from '@google/genai';
import { validateContentPack, type ContentPack, type GameMode } from '@partynode/shared';

export interface AiPackRequest {
  game: GameMode;
  topic: string;
  count: number;
  familyFriendly: boolean;
  apiKey?: string;
}

function getJsonSchemaForGame(game: GameMode): Record<string, unknown> {
  if (game === 'punchline_clash') {
    return {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        prompts: { type: 'array', items: { type: 'string' } },
        finalPrompts: { type: 'array', items: { type: 'string' } }
      },
      required: ['title', 'description', 'prompts', 'finalPrompts']
    };
  }
  if (game === 'bluff_battle') {
    return {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              prompt: { type: 'string', description: 'Fact statement containing _______ for the missing word/phrase.' },
              truth: { type: 'string', description: 'The actual real-world truth that fills the blank.' },
              decoys: { type: 'array', items: { type: 'string' }, description: '3 plausible fake answers.' }
            },
            required: ['category', 'prompt', 'truth', 'decoys']
          }
        }
      },
      required: ['title', 'description', 'questions']
    };
  }
  if (game === 'survey_showdown') {
    return {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              prompt: { type: 'string' },
              answers: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: { type: 'string' },
                    points: { type: 'integer' },
                    aliases: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['text', 'points', 'aliases']
                }
              }
            },
            required: ['prompt', 'answers']
          }
        }
      },
      required: ['title', 'description', 'questions']
    };
  }
  return {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      questions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            prompt: { type: 'string' },
            options: { type: 'array', items: { type: 'string' } },
            correctIndex: { type: 'integer', description: '0, 1, 2, or 3' },
            timeLimitSec: { type: 'integer' }
          },
          required: ['category', 'prompt', 'options', 'correctIndex', 'timeLimitSec']
        }
      }
    },
    required: ['title', 'description', 'questions']
  };
}

function buildGenerationPrompt(req: AiPackRequest): string {
  const tone = req.familyFriendly
    ? 'Keep all content PG / family-friendly and safe for stream.'
    : 'Witty party-game humor suitable for adult friend groups (no slurs or hate speech).';

  if (req.game === 'punchline_clash') {
    return `Create a hilarious comedy party-game prompt pack ("Punchline Clash") themed around "${req.topic}".
Generate ${Math.max(4, req.count)} open-ended comedy prompts (some with _______ blanks, some open prompts) and 2 group Final Showdown prompts. ${tone}`;
  }
  if (req.game === 'bluff_battle') {
    return `Create a deception trivia pack ("Bluff Battle") themed around "${req.topic}".
Generate ${req.count} genuinely surprising, verifiable real-world facts where the funniest/weirdest detail is replaced with "_______". Provide the short exact "truth" and 3 believable "decoys" per item. ${tone}`;
  }
  if (req.game === 'survey_showdown') {
    return `Create a 100-person survey game-show pack ("Survey Showdown") themed around "${req.topic}".
Generate ${req.count} survey questions, each with 5 to 6 ranked answers whose points sum to roughly 100 (highest first), plus 3-5 short lowercase synonym "aliases" per answer for fuzzy matching. ${tone}`;
  }
  return `Create a fast-paced 4-choice trivia pack ("BlitzQuiz") themed around "${req.topic}".
Generate ${req.count} engaging multiple-choice questions, each with exactly 4 options, a valid correctIndex (0..3), and timeLimitSec (15). ${tone}`;
}

function stripJsonCodeFences(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();
  }
  return trimmed;
}

export function formatAiErrorMessage(err: unknown): string {
  if (!err || typeof err !== 'object') {
    return String(err || 'Unknown AI generation error.');
  }
  const maybeErr = err as { message?: string; body?: unknown; status?: number; cause?: unknown };
  if (typeof maybeErr.body === 'string' && maybeErr.body.trim()) {
    try {
      const parsed = JSON.parse(maybeErr.body) as unknown;
      const root = Array.isArray(parsed) ? parsed[0] : parsed;
      const apiMsg = (root as { error?: { message?: string } } | null)?.error?.message;
      if (apiMsg && typeof apiMsg === 'string') {
        return apiMsg;
      }
    } catch {
      // Fall back to standard message below
    }
  }
  if (maybeErr.cause instanceof Error && maybeErr.cause.message) {
    return formatAiErrorMessage(maybeErr.cause);
  }
  return maybeErr.message || 'Unknown AI generation error.';
}

function assembleValidatedPack(
  rawObj: Record<string, unknown>,
  req: AiPackRequest,
  authorLabel: string
): ContentPack {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  const cleanTitle = String(rawObj.title || `${req.topic} Pack`).trim().slice(0, 60);
  const base = {
    id: `ai-${req.game.split('_')[0]}-${suffix}`,
    title: cleanTitle.length >= 2 ? cleanTitle : `${req.topic} Pack`,
    description: String(rawObj.description || `Generated pack for ${req.topic}`).trim().slice(0, 140),
    author: authorLabel,
    familyFriendly: req.familyFriendly,
    builtIn: false,
    updatedAt: new Date().toISOString()
  };

  let candidate: ContentPack;
  if (req.game === 'punchline_clash') {
    const prompts = (Array.isArray(rawObj.prompts) ? rawObj.prompts : [])
      .map((p) => String(p || '').trim())
      .filter(Boolean);
    const finalPrompts = (Array.isArray(rawObj.finalPrompts) ? rawObj.finalPrompts : [])
      .map((p) => String(p || '').trim())
      .filter(Boolean);
    candidate = {
      ...base,
      game: 'punchline_clash',
      prompts,
      finalPrompts:
        finalPrompts.length > 0 ? finalPrompts : [`Write a three-word motto about ${req.topic}.`]
    };
  } else if (req.game === 'bluff_battle') {
    const qs = Array.isArray(rawObj.questions) ? rawObj.questions : [];
    candidate = {
      ...base,
      game: 'bluff_battle',
      questions: qs
        .map((q: Record<string, unknown>, i: number) => {
          const decoys = (Array.isArray(q.decoys) ? q.decoys : [])
            .map((d) => String(d || '').trim())
            .filter(Boolean)
            .slice(0, 4);
          return {
            id: `bb-ai-${i + 1}`,
            category: String(q.category || req.topic).trim() || req.topic,
            prompt: String(q.prompt || '').trim(),
            truth: String(q.truth || '').trim(),
            decoys: decoys.length > 0 ? decoys : ['Unexpected Twist', 'Secret Prototype', 'Local Legend']
          };
        })
        .filter((q) => q.prompt && q.truth)
    };
  } else if (req.game === 'survey_showdown') {
    const qs = Array.isArray(rawObj.questions) ? rawObj.questions : [];
    candidate = {
      ...base,
      game: 'survey_showdown',
      questions: qs
        .map((q: Record<string, unknown>, i: number) => {
          const answers = (Array.isArray(q.answers) ? q.answers : [])
            .map((a: Record<string, unknown>) => ({
              text: String(a.text || '').trim(),
              points: Math.max(1, Math.round(Number(a.points) || 10)),
              aliases: Array.isArray(a.aliases)
                ? a.aliases.map((al) => String(al || '').trim()).filter(Boolean)
                : []
            }))
            .filter((a) => a.text)
            .slice(0, 8);
          while (answers.length < 2) {
            answers.push({
              text: answers.length === 0 ? `Top Pick for ${req.topic}` : `Runner-Up for ${req.topic}`,
              points: answers.length === 0 ? 60 : 40,
              aliases: []
            });
          }
          return {
            id: `sv-ai-${i + 1}`,
            prompt: String(q.prompt || '').trim(),
            answers
          };
        })
        .filter((q) => q.prompt)
    };
  } else {
    const qs = Array.isArray(rawObj.questions) ? rawObj.questions : [];
    candidate = {
      ...base,
      game: 'blitz_quiz',
      questions: qs
        .map((q: Record<string, unknown>, i: number) => {
          const opts = (Array.isArray(q.options) ? q.options : [])
            .map((o) => String(o || '').trim())
            .filter(Boolean)
            .slice(0, 4);
          while (opts.length < 4) opts.push(`Option ${opts.length + 1}`);
          const cIdx = Number(q.correctIndex);
          return {
            id: `bq-ai-${i + 1}`,
            category: String(q.category || req.topic).trim() || req.topic,
            prompt: String(q.prompt || '').trim(),
            options: opts as [string, string, string, string],
            correctIndex: ([0, 1, 2, 3].includes(cIdx) ? cIdx : 0) as 0 | 1 | 2 | 3,
            timeLimitSec: Number(q.timeLimitSec) || 15
          };
        })
        .filter((q) => q.prompt)
    };
  }

  const check = validateContentPack(candidate);
  if (!check.valid) {
    throw new Error(check.error || 'Generated pack failed validation.');
  }
  return candidate;
}

function generateOfflineTopicScaffold(req: AiPackRequest): ContentPack {
  const topic = req.topic.trim() || 'Server Night';
  const suffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  if (req.game === 'punchline_clash') {
    return {
      id: `custom-punchline-${suffix}`,
      game: 'punchline_clash',
      title: `${topic}: Comedy Clash`,
      description: `Starter scaffold for "${topic}" (add GEMINI_API_KEY for full AI generation).`,
      author: 'Pack Studio Scaffold',
      familyFriendly: req.familyFriendly,
      builtIn: false,
      updatedAt: now,
      prompts: [
        `The worst possible thing to shout during a conversation about ${topic}.`,
        `A rejected rule that almost ruined ${topic} forever.`,
        `What beginners always get wrong on Day 1 of ${topic}.`,
        `A suspiciously cheap knockoff of ${topic} would be called _______.`,
        `The real secret experts in ${topic} never admit out loud.`,
        `An awful excuse for rage-quitting ${topic}.`
      ],
      finalPrompts: [`Write the brutally honest three-word slogan for ${topic}.`]
    };
  }

  if (req.game === 'bluff_battle') {
    return {
      id: `custom-bluff-${suffix}`,
      game: 'bluff_battle',
      title: `${topic}: Bluff Battle`,
      description: `Editable Bluff Battle scaffold for "${topic}" (set GEMINI_API_KEY for AI facts).`,
      author: 'Pack Studio Scaffold',
      familyFriendly: req.familyFriendly,
      builtIn: false,
      updatedAt: now,
      questions: [
        {
          id: 'bb-1',
          category: topic,
          prompt: `During an infamous moment in ${topic}, everyone was shocked by a sudden _______.`,
          truth: 'Replace with the real inside-joke or fact!',
          decoys: ['Unexpected plot twist', 'Power outage', 'Mystery cameo']
        }
      ]
    };
  }

  if (req.game === 'survey_showdown') {
    return {
      id: `custom-survey-${suffix}`,
      game: 'survey_showdown',
      title: `${topic}: Survey Showdown`,
      description: `Editable survey scaffold for "${topic}" (set GEMINI_API_KEY for AI surveys).`,
      author: 'Pack Studio Scaffold',
      familyFriendly: req.familyFriendly,
      builtIn: false,
      updatedAt: now,
      questions: [
        {
          id: 'sv-1',
          prompt: `Name the first thing people associate with ${topic}.`,
          answers: [
            { text: `Iconic Moments in ${topic}`, points: 40, aliases: ['moments', 'highlights'] },
            { text: 'The Community & Memes', points: 30, aliases: ['memes', 'fans', 'community'] },
            { text: 'Late Night Sessions', points: 20, aliases: ['late night', 'grinding'] },
            { text: 'Beginner Mistakes', points: 10, aliases: ['noobs', 'mistakes'] }
          ]
        }
      ]
    };
  }

  return {
    id: `custom-blitz-${suffix}`,
    game: 'blitz_quiz',
    title: `${topic}: BlitzQuiz`,
    description: `Editable trivia scaffold for "${topic}" (set GEMINI_API_KEY for AI trivia).`,
    author: 'Pack Studio Scaffold',
    familyFriendly: req.familyFriendly,
    builtIn: false,
    updatedAt: now,
    questions: [
      {
        id: 'bq-1',
        category: topic,
        prompt: `Sample question about ${topic} — edit options in Visual Builder!`,
        options: ['Correct Answer', 'Decoy Option B', 'Decoy Option C', 'Decoy Option D'],
        correctIndex: 0,
        timeLimitSec: 15
      }
    ]
  };
}

export async function generatePackWithAi(
  rawReq: AiPackRequest
): Promise<{ pack: ContentPack; provider: string }> {
  const req: AiPackRequest = {
    ...rawReq,
    topic: (rawReq.topic || 'General Party Fun').trim().slice(0, 100),
    count: Math.max(3, Math.min(12, Number(rawReq.count) || 6))
  };

  const geminiKey = (req.apiKey || process.env.GEMINI_API_KEY || '').trim();
  if (geminiKey) {
    const client = new GoogleGenAI({ apiKey: geminiKey });
    const schema = getJsonSchemaForGame(req.game);
    const inputPrompt = buildGenerationPrompt(req);
    const candidateModels: Array<{ id: string; label: string }> = [
      { id: 'gemini-3.8-flash', label: 'Gemini 3.8 Flash' },
      { id: 'gemini-3.5-flash-lite', label: 'Gemini 3.5 Flash-Lite' }
    ];

    let lastErr: unknown = null;
    for (let i = 0; i < candidateModels.length; i++) {
      const m = candidateModels[i];
      try {
        const interaction = await client.interactions.create({
          model: m.id,
          input: inputPrompt,
          response_format: {
            type: 'text',
            mime_type: 'application/json',
            schema
          },
          store: false
        });

        const outputText = stripJsonCodeFences(interaction.output_text || '{}');
        const parsed = JSON.parse(outputText) as Record<string, unknown>;
        return {
          pack: assembleValidatedPack(parsed, req, m.label),
          provider: m.id
        };
      } catch (err) {
        lastErr = err;
        const status = (err as { status?: number; statusCode?: number })?.status ??
          (err as { statusCode?: number })?.statusCode;
        const msg = formatAiErrorMessage(err);
        const isAuthError = status === 401 || status === 403 || /api key not valid|api_key_invalid/i.test(msg);
        if (isAuthError || i === candidateModels.length - 1) {
          throw new Error(msg);
        }
      }
    }
    throw new Error(formatAiErrorMessage(lastErr));
  }

  const openAiBase = (process.env.OPENAI_BASE_URL || '').trim().replace(/\/$/, '');
  if (openAiBase) {
    const model = process.env.OPENAI_MODEL || 'llama3.2';
    const apiKey = process.env.OPENAI_API_KEY || 'local';
    const schema = getJsonSchemaForGame(req.game);

    const res = await fetch(`${openAiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `Return ONLY valid JSON matching this JSON schema:\n${JSON.stringify(schema)}`
          },
          {
            role: 'user',
            content: buildGenerationPrompt(req)
          }
        ]
      })
    });

    if (!res.ok) {
      throw new Error(`OpenAI/Ollama endpoint returned HTTP ${res.status}`);
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content || '{}';
    return {
      pack: assembleValidatedPack(JSON.parse(content) as Record<string, unknown>, req, `AI (${model})`),
      provider: model
    };
  }

  return {
    pack: generateOfflineTopicScaffold(req),
    provider: 'offline-scaffold'
  };
}
