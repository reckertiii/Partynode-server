export type GameMode = 'punchline_clash' | 'bluff_battle' | 'survey_showdown' | 'blitz_quiz';
export type ActiveScreen = 'lobby' | GameMode;

export type NodeHostingMode =
  | 'demo_sandbox'
  | 'owner_embedded'
  | 'self_hosted_online'
  | 'self_hosted_offline';

export interface PlayerProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  isAdmin: boolean;
  connected: boolean;
  score: number;
}

// ============================================================================
// Content Packs
// ============================================================================

export interface BasePackMeta {
  id: string;
  game: GameMode;
  title: string;
  description: string;
  author: string;
  familyFriendly: boolean;
  builtIn: boolean;
  updatedAt: string;
}

export interface PunchlinePack extends BasePackMeta {
  game: 'punchline_clash';
  prompts: string[];
  finalPrompts: string[];
}

export interface BluffQuestionItem {
  id: string;
  category?: string;
  prompt: string;
  truth: string;
  decoys: string[];
}

export interface BluffPack extends BasePackMeta {
  game: 'bluff_battle';
  questions: BluffQuestionItem[];
}

export interface SurveyAnswerSlot {
  text: string;
  points: number;
  aliases: string[];
}

export interface SurveyQuestionItem {
  id: string;
  prompt: string;
  answers: SurveyAnswerSlot[];
}

export interface SurveyPack extends BasePackMeta {
  game: 'survey_showdown';
  questions: SurveyQuestionItem[];
}

export interface BlitzQuestionItem {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  timeLimitSec: number;
  category?: string;
}

export interface BlitzPack extends BasePackMeta {
  game: 'blitz_quiz';
  questions: BlitzQuestionItem[];
}

export type ContentPack = PunchlinePack | BluffPack | SurveyPack | BlitzPack;

export interface PackSummary extends BasePackMeta {
  itemCount: number;
}

// ============================================================================
// Game 1: Punchline Clash (Quiplash-style) Views
// ============================================================================

export type PunchlinePhase =
  | 'writing'
  | 'voting'
  | 'reveal'
  | 'round_scores'
  | 'final_writing'
  | 'final_voting'
  | 'final_reveal'
  | 'podium';

export interface AssignedPromptItem {
  matchupId: string;
  prompt: string;
  submitted: boolean;
  submittedText?: string;
}

export interface PunchlineMatchupPublic {
  matchupId: string;
  prompt: string;
  optionA: { text: string; authorId?: string; voterIds?: string[]; pointsEarned?: number };
  optionB: { text: string; authorId?: string; voterIds?: string[]; pointsEarned?: number };
  isClashSweep?: boolean;
  sweepWinner?: 'A' | 'B' | null;
  canVote: boolean;
  myVote?: 'A' | 'B' | null;
}

export interface FinalEntryPublic {
  entryId: string;
  text: string;
  authorId?: string;
  medals?: { gold: number; silver: number; bronze: number };
  pointsEarned?: number;
  isMine: boolean;
}

export interface PunchlineClashView {
  mode: 'punchline_clash';
  phase: PunchlinePhase;
  round: 1 | 2 | 3;
  phaseEndsAt: number | null;
  submittedCount: number;
  requiredCount: number;
  myPrompts?: AssignedPromptItem[];
  matchupIndex?: number;
  totalMatchups?: number;
  activeMatchup?: PunchlineMatchupPublic;
  finalPrompt?: string;
  myFinalSubmitted?: boolean;
  finalEntries?: FinalEntryPublic[];
  myFinalVotes?: string[];
  requiredMedalCount?: number;
}

// ============================================================================
// Game 2: Bluff Battle (Fibbage-style) Views
// ============================================================================

export type BluffPhase =
  | 'writing_lies'
  | 'picking_truth'
  | 'reveal'
  | 'leaderboard'
  | 'podium';

export interface BluffChoicePublic {
  optionId: string;
  text: string;
  isMine: boolean;
  // Populated ONLY during 'reveal' / 'leaderboard' / 'podium'
  isTruth?: boolean;
  isHouseDecoy?: boolean;
  authorIds?: string[];
  pickedByIds?: string[];
  likesCount?: number;
  pointsEarned?: number;
}

export interface BluffBattleView {
  mode: 'bluff_battle';
  phase: BluffPhase;
  questionIndex: number;
  totalQuestions: number;
  multiplier: number;
  phaseEndsAt: number | null;
  category?: string;
  prompt: string;
  submittedCount: number;
  requiredCount: number;
  myLieSubmitted: boolean;
  myLieText?: string;
  choices?: BluffChoicePublic[];
  myPickedOptionId: string | null;
  myLikedOptionId: string | null;
}

// ============================================================================
// Game 3: Survey Showdown (Family Feud-style) Views
// ============================================================================

export type SurveyTeamId = 'gold' | 'cyber';

export type SurveyPhase =
  | 'team_setup'
  | 'faceoff_buzz'
  | 'faceoff_guess'
  | 'mc_review'
  | 'play_or_pass'
  | 'board_play'
  | 'steal_guess'
  | 'round_reveal'
  | 'game_over';

export interface SurveyBoardSlotPublic {
  index: number;
  revealed: boolean;
  text?: string;
  points?: number;
}

export interface SurveyShowdownView {
  mode: 'survey_showdown';
  phase: SurveyPhase;
  round: number;
  totalRounds: number;
  multiplier: number;
  phaseEndsAt: number | null;
  mcPlayerId: string | null;
  teams: {
    gold: { name: string; score: number; memberIds: string[] };
    cyber: { name: string; score: number; memberIds: string[] };
  };
  roundBank: number;
  strikes: number;
  lastStrikeAt: number | null;
  lastEventBanner: string | null;
  questionPrompt: string | null;
  board: SurveyBoardSlotPublic[];
  faceoffPlayers: { goldId: string | null; cyberId: string | null };
  buzzedTeam: SurveyTeamId | null;
  activeTurnTeam: SurveyTeamId | null;
  activeGuesserId: string | null;
  faceoffBestSlotIndex: number | null;
  faceoffWinningTeam: SurveyTeamId | null;
  pendingGuess: {
    playerId: string;
    team: SurveyTeamId;
    text: string;
    context: 'faceoff' | 'board' | 'steal';
  } | null;
  winnerTeam: SurveyTeamId | 'tie' | null;
  // Strictly populated ONLY for the player in mcPlayerId!
  mcSecretSheet?: SurveyAnswerSlot[];
}

// ============================================================================
// Game 4: BlitzQuiz (Kahoot-style) Views
// ============================================================================

export type BlitzPhase =
  | 'get_ready'
  | 'question'
  | 'reveal'
  | 'leaderboard'
  | 'podium';

export interface BlitzPlayerRoundResult {
  playerId: string;
  answeredIndex: number | null;
  correct: boolean;
  pointsAwarded: number;
  streak: number;
  reactionMs: number | null;
}

export interface BlitzQuizView {
  mode: 'blitz_quiz';
  phase: BlitzPhase;
  questionIndex: number;
  totalQuestions: number;
  phaseEndsAt: number | null;
  prompt: string;
  category?: string;
  options?: [string, string, string, string];
  timeLimitSec: number;
  answeredPlayerIds: string[];
  mySelectedOption: number | null;
  myStreak: number;
  // Only populated during 'reveal' / 'leaderboard' / 'podium'
  correctIndex?: 0 | 1 | 2 | 3;
  optionCounts?: [number, number, number, number];
  lastResults?: BlitzPlayerRoundResult[];
}

// ============================================================================
// Unified Room Snapshot
// ============================================================================

export interface GuildHostingInfo {
  guildId: string;
  hostingMode: NodeHostingMode;
  nodeName?: string;
  nodeVersion?: string;
  preferDemoSandbox: boolean;
}

export interface RoomSnapshot {
  instanceId: string;
  guildId: string;
  leaderId: string | null;
  familyFriendly: boolean;
  selectedGame: GameMode;
  selectedPackId: string;
  availablePacks: PackSummary[];
  players: PlayerProfile[];
  hosting: GuildHostingInfo;
  screen: ActiveScreen;
  gameView:
    | PunchlineClashView
    | BluffBattleView
    | SurveyShowdownView
    | BlitzQuizView
    | null;
  serverNow: number;
}

// ============================================================================
// Client <-> Server Actions & Events
// ============================================================================

export type ClientAction =
  // Lobby & Moderation
  | { type: 'lobby_configure'; selectedGame?: GameMode; selectedPackId?: string; familyFriendly?: boolean }
  | { type: 'lobby_start_game' }
  | { type: 'return_to_lobby' }
  | { type: 'promote_leader'; targetPlayerId: string }
  | { type: 'mod_kick_player'; targetPlayerId: string }
  | { type: 'mod_skip_phase' }
  // Punchline Clash
  | { type: 'punchline_submit'; matchupId: string; text: string }
  | { type: 'punchline_vote'; matchupId: string; choice: 'A' | 'B' }
  | { type: 'punchline_final_submit'; text: string }
  | { type: 'punchline_final_vote'; entryIds: string[] }
  | { type: 'mod_redact_punchline'; matchupId: string; side: 'A' | 'B' }
  // Bluff Battle
  | { type: 'bluff_submit_lie'; text: string }
  | { type: 'bluff_pick_option'; optionId: string }
  | { type: 'bluff_like_option'; optionId: string }
  // Survey Showdown
  | { type: 'survey_join_team'; team: SurveyTeamId | 'auto' }
  | { type: 'survey_set_mc'; claim: boolean }
  | { type: 'survey_begin_faceoff' }
  | { type: 'survey_buzz' }
  | { type: 'survey_submit_guess'; text: string }
  | { type: 'survey_play_or_pass'; decision: 'play' | 'pass' }
  | { type: 'survey_mc_judge'; awardSlotIndex: number | null }
  | { type: 'survey_mc_reveal_slot'; slotIndex: number }
  | { type: 'survey_next_round' }
  // BlitzQuiz
  | { type: 'blitz_answer'; optionIndex: 0 | 1 | 2 | 3 }
  // Admin In-Discord Pack Studio (routed to Node or Embedded Owner Store)
  | { type: 'studio_list_packs' }
  | { type: 'studio_get_pack'; packId: string }
  | { type: 'studio_save_pack'; pack: ContentPack }
  | { type: 'studio_delete_pack'; packId: string }
  | {
      type: 'studio_ai_generate';
      game: GameMode;
      topic: string;
      count: number;
      familyFriendly: boolean;
      apiKey?: string;
    };

export type ServerEvent =
  | { type: 'room_snapshot'; snapshot: RoomSnapshot }
  | { type: 'toast'; level: 'info' | 'success' | 'warning' | 'error'; message: string }
  | { type: 'kicked'; reason: string }
  | { type: 'studio_packs_list'; packs: ContentPack[] }
  | { type: 'studio_pack_detail'; pack: ContentPack }
  | { type: 'studio_ai_generated'; pack: ContentPack; provider: string }
  | { type: 'hosting_status_changed'; hosting: GuildHostingInfo };

// ============================================================================
// Gateway <-> Self-Hosted Node Tunnel Protocol
// ============================================================================

export type GatewayToNodeMessage =
  | { type: 'tunnel_welcome'; guildId: string; gatewayVersion: string }
  | { type: 'player_join'; instanceId: string; player: Omit<PlayerProfile, 'connected' | 'score'>; hosting: GuildHostingInfo }
  | { type: 'player_leave'; instanceId: string; playerId: string }
  | { type: 'player_action'; instanceId: string; playerId: string; isAdmin: boolean; action: ClientAction }
  | { type: 'hosting_update'; hosting: GuildHostingInfo }
  | { type: 'ping'; ts: number };

export type NodeToGatewayMessage =
  | { type: 'node_hello'; nodeName: string; nodeVersion: string }
  | { type: 'send_to_player'; instanceId: string; playerId: string; event: ServerEvent }
  | { type: 'pong'; ts: number };
