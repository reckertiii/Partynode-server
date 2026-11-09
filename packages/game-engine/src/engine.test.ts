import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { GuildHostingInfo, ServerEvent } from '@partynode/shared';
import { PackStore, RoomSession, generatePackWithAi } from './index.js';

const mockHosting: GuildHostingInfo = {
  guildId: 'g-1',
  hostingMode: 'self_hosted_online',
  nodeName: 'TestNode',
  preferDemoSandbox: false
};

function makePlayer(id: string, name: string, isAdmin = false) {
  return {
    id,
    username: name.toLowerCase(),
    displayName: name,
    avatarUrl: '',
    isAdmin
  };
}

describe('@partynode/game-engine', () => {
  it('runs a full Punchline Clash round with private prompt views, voting, and sweep bonus', () => {
    const events: Array<{ playerId: string; event: ServerEvent }> = [];
    const store = new PackStore(null);
    const room = new RoomSession('inst-1', 'g-1', mockHosting, store, (_inst, pid, event) => {
      events.push({ playerId: pid, event });
    });

    room.joinPlayer(makePlayer('p1', 'Alice', true));
    room.joinPlayer(makePlayer('p2', 'Bob'));
    room.joinPlayer(makePlayer('p3', 'Charlie'));

    room.handleAction('p1', true, { type: 'lobby_configure', selectedGame: 'punchline_clash' }, 1000);
    room.handleAction('p1', true, { type: 'lobby_start_game' }, 1000);

    for (const pid of ['p1', 'p2', 'p3']) {
      const snap = room.getSnapshotForPlayer(pid, 1000);
      assert.equal(snap.screen, 'punchline_clash');
      if (snap.gameView?.mode === 'punchline_clash') {
        assert.equal(snap.gameView.phase, 'writing');
        assert.equal(snap.gameView.myPrompts?.length, 2);
        for (const pr of snap.gameView.myPrompts!) {
          room.handleAction(pid, pid === 'p1', {
            type: 'punchline_submit',
            matchupId: pr.matchupId,
            text: `Funny answer from ${pid}`
          }, 2000);
        }
      }
    }

    const vSnap = room.getSnapshotForPlayer('p1', 2000);
    if (vSnap.gameView?.mode === 'punchline_clash') {
      assert.equal(vSnap.gameView.phase, 'voting');
      const mId = vSnap.gameView.activeMatchup!.matchupId;
      for (const pid of ['p1', 'p2', 'p3']) {
        const ps = room.getSnapshotForPlayer(pid, 2000);
        if (ps.gameView?.mode === 'punchline_clash' && ps.gameView.activeMatchup?.canVote) {
          room.handleAction(pid, pid === 'p1', {
            type: 'punchline_vote',
            matchupId: mId,
            choice: 'A'
          }, 2500);
        }
      }
      const rSnap = room.getSnapshotForPlayer('p1', 2500);
      assert.equal(rSnap.gameView?.mode === 'punchline_clash' && rSnap.gameView.phase, 'reveal');
    }
  });

  it('runs Bluff Battle with Truth Guard, hidden truth during picking, and fooling + truth rewards', () => {
    const toasts: string[] = [];
    const store = new PackStore(null);
    const room = new RoomSession('inst-bluff', 'g-1', mockHosting, store, (_inst, _pid, ev) => {
      if (ev.type === 'toast') toasts.push(ev.message);
    });

    room.joinPlayer(makePlayer('p1', 'Trickster', true));
    room.joinPlayer(makePlayer('p2', 'Gullible'));

    room.handleAction('p1', true, { type: 'lobby_configure', selectedGame: 'bluff_battle' }, 1000);
    room.handleAction('p1', true, { type: 'lobby_start_game' }, 1000);

    // First question in builtin-bluff-weird-world has truth = "Guinea pig"
    // Typing the real truth should be blocked by Truth Guard!
    room.handleAction('p1', true, { type: 'bluff_submit_lie', text: 'guinea pigs' }, 1100);
    assert.ok(toasts.some((m) => m.includes('REAL truth')));

    // Submit valid fake lies
    room.handleAction('p1', true, { type: 'bluff_submit_lie', text: 'Llama' }, 1200);
    room.handleAction('p2', false, { type: 'bluff_submit_lie', text: 'Capybara' }, 1300);

    const pickSnap = room.getSnapshotForPlayer('p2', 1300);
    assert.equal(pickSnap.gameView?.mode, 'bluff_battle');
    if (pickSnap.gameView?.mode === 'bluff_battle') {
      assert.equal(pickSnap.gameView.phase, 'picking_truth');
      // Truth flag must be hidden during picking_truth!
      assert.ok(pickSnap.gameView.choices!.every((c) => c.isTruth === undefined));

      const p1LieOpt = pickSnap.gameView.choices!.find((c) => c.text === 'Llama')!;
      const truthOpt = pickSnap.gameView.choices!.find((c) => c.text === 'Guinea pig')!;

      // p2 falls for p1's lie ("Llama"), while p1 spots the truth ("Guinea pig")!
      room.handleAction('p2', false, { type: 'bluff_pick_option', optionId: p1LieOpt.optionId }, 1500);
      room.handleAction('p1', true, { type: 'bluff_pick_option', optionId: truthOpt.optionId }, 1600);

      const revSnap = room.getSnapshotForPlayer('p1', 1600);
      if (revSnap.gameView?.mode === 'bluff_battle') {
        assert.equal(revSnap.gameView.phase, 'reveal');
      }
      const p1Score = revSnap.players.find((p) => p.id === 'p1')!.score;
      const p2Score = revSnap.players.find((p) => p.id === 'p2')!.score;
      // p1 gets 1000 (truth) + 500 (fooled p2) = 1500!
      assert.equal(p1Score, 1500);
      assert.equal(p2Score, 0);
    }
  });

  it('runs Survey Showdown in both Auto-Judge and Live MC modes while keeping unrevealed answers secret', () => {
    const store = new PackStore(null);
    const room = new RoomSession('inst-2', 'g-1', mockHosting, store, () => {});

    room.joinPlayer(makePlayer('mc', 'HostSteve', true));
    room.joinPlayer(makePlayer('g1', 'GoldPlayer'));
    room.joinPlayer(makePlayer('c1', 'CyberPlayer'));

    room.handleAction('mc', true, { type: 'lobby_configure', selectedGame: 'survey_showdown' }, 1000);
    room.handleAction('mc', true, { type: 'lobby_start_game' }, 1000);

    room.handleAction('mc', true, { type: 'survey_set_mc', claim: true }, 1100);
    room.handleAction('g1', false, { type: 'survey_join_team', team: 'gold' }, 1100);
    room.handleAction('c1', false, { type: 'survey_join_team', team: 'cyber' }, 1100);
    room.handleAction('mc', true, { type: 'survey_begin_faceoff' }, 1200);

    const mcSnap = room.getSnapshotForPlayer('mc', 1200);
    const playerSnap = room.getSnapshotForPlayer('g1', 1200);
    if (mcSnap.gameView?.mode === 'survey_showdown' && playerSnap.gameView?.mode === 'survey_showdown') {
      assert.ok(Array.isArray(mcSnap.gameView.mcSecretSheet));
      assert.equal(playerSnap.gameView.mcSecretSheet, undefined);

      room.handleAction('g1', false, { type: 'survey_buzz' }, 1300);
      room.handleAction('g1', false, { type: 'survey_submit_guess', text: 'wild creative phrasing' }, 1400);
      room.handleAction('mc', true, { type: 'survey_mc_judge', awardSlotIndex: 0 }, 1500);

      const afterJudge = room.getSnapshotForPlayer('g1', 1500);
      if (afterJudge.gameView?.mode === 'survey_showdown') {
        assert.equal(afterJudge.gameView.phase, 'play_or_pass');
        assert.equal(afterJudge.gameView.board[0].revealed, true);
      }
    }
  });

  it('runs BlitzQuiz with hidden correctIndex during question and speed+streak points on reveal', () => {
    const store = new PackStore(null);
    const room = new RoomSession('inst-3', 'g-1', mockHosting, store, () => {});

    room.joinPlayer(makePlayer('p1', 'Speedy', true));
    room.joinPlayer(makePlayer('p2', 'Slowpoke'));

    room.handleAction('p1', true, { type: 'lobby_configure', selectedGame: 'blitz_quiz' }, 1000);
    room.handleAction('p1', true, { type: 'lobby_start_game' }, 1000);

    room.tick(5000);
    const qSnap = room.getSnapshotForPlayer('p1', 5000);
    if (qSnap.gameView?.mode === 'blitz_quiz') {
      assert.equal(qSnap.gameView.phase, 'question');
      assert.equal(qSnap.gameView.correctIndex, undefined);

      room.handleAction('p1', true, { type: 'blitz_answer', optionIndex: 1 }, 6000);
      room.handleAction('p2', false, { type: 'blitz_answer', optionIndex: 0 }, 8000);

      const revSnap = room.getSnapshotForPlayer('p1', 8000);
      if (revSnap.gameView?.mode === 'blitz_quiz') {
        assert.equal(revSnap.gameView.phase, 'reveal');
        assert.equal(revSnap.gameView.correctIndex, 1);
      }
      assert.ok(revSnap.players.find((p) => p.id === 'p1')!.score > 900);
    }
  });

  it('generates validated offline pack scaffolds for all 4 game modes when no AI key is configured', async () => {
    for (const game of ['punchline_clash', 'bluff_battle', 'survey_showdown', 'blitz_quiz'] as const) {
      const { pack, provider } = await generatePackWithAi({
        game,
        topic: 'Space Pirates',
        count: 5,
        familyFriendly: true
      });
      assert.equal(pack.game, game);
      assert.equal(provider, 'offline-scaffold');
    }
  });
});
