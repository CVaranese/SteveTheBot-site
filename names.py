"""What the model names mean, for every page of the site (STYLE.md, "Model names").

explain(name) gives the plain description of a model as the site shows it (without the checkpoint suffix);
build.py stops when a page shows a name explain() does not know. Exact names are in NAMES; families of runs that
differ only in seed or one setting are in PATTERNS.
"""
import re

NAME_PARTS = [
    ('T<number> at the start', 'The task that trained it (T21 is task T-21). Older models have no task number.'),
    ('s<digit> or a last digit', 'The random seed: the same settings trained again from a different random start. '
                                 'Two seeds of one setting can differ a lot, so one run says little on its own.'),
    ('Self / Bot', 'Trained by playing against itself, or against the level 3 scripted bot.'),
    ('No checkpoint suffix', 'Training saves copies part-way (files named _c01, _c02, ...). Every model on this site '
                             'is the copy saved at the end of its run, so the suffix is left out.'),
]

NAMES = {
    'random': 'Not trained: presses one of its 54 inputs at random. The floor every model should beat.',
    'SimBase': 'The 2017 learner (actor-critic), moved unchanged into the simulator and trained against itself for '
               '48,000 updates (28 minutes). The starting point everything else is compared with.',
    'SimBaseBot': 'As SimBase, but trained against the level 3 scripted bot.',
    'PPOSelf': 'PPO, the first new training method, still with the 2017 network; trained against itself for '
               '20 minutes.',
    'PPOBot': 'As PPOSelf, but trained against the level 3 scripted bot.',
    'PPO8Self': 'PPO with the repaired network of task T-8; trained against itself for 20 minutes.',
    'PPO8Bot': 'As PPO8Self, but trained against the level 3 scripted bot.',
    'PPO8Bot_edit': 'PPO8Bot with its weights edited by hand, no training: its choices made sharper (less random).',
    'PPO8Bot_edit_rec': 'PPO8Bot with its weights edited by hand, no training: choices made sharper, plus a '
                        'hand-wired recovery circuit.',
    'T9Base': 'Task T-9 input experiment: PPO8Self trained again (another random start), the usual inputs.',
    'T9Emb': 'As T9Base, plus an animation embedding: each animation turned into 32 learned numbers.',
    'T9Prev': 'As T9Base, plus the bot\'s own previous button press as an input.',
    'T9EmbPrev': 'As T9Base, with both the animation embedding and the previous button press.',
    'T12Base': 'Task T-12: T9Base trained again with a third random seed.',
    'T12Prev': 'Task T-12: T9Prev trained again with a third random seed.',
    'T12EmbSmall': 'Task T-12: the animation embedding started small, which T9Emb was not.',
    'T12EmbSmallPrev': 'Task T-12: the small-start embedding plus the previous button press.',
    'T21L6Cs4': 'Task T-21: self-play at twice the usual learning rate (L6: 0.0006), held constant for the whole '
                'run (C), random seed 4. The strongest model of its batch, and the opponent in the scenario tests '
                'and in one of the rankings.',
    'T22EmbSmall3': 'Task T-22: the T21L6Cs4 settings plus the small-start animation embedding, random seed 3.',
    'Steve_2026-11-11_u21850': 'The 2017 learner trained in Dolphin against the level 3 in-game CPU, a copy saved '
                               'part-way, at 21,850 updates (about 3.5 hours).',
    'T4Im300': 'Task T-4: a network that only copies human play (imitation), trained on 254 Falcon ditto replays; '
               'the copy saved after 2 of its checkpoints, the one played. No PPO.',
    'T4Im300W5': 'As T4Im300, with frames where the human changes input counting 5 times in the training; the '
                 'first checkpoint. No PPO.',
    'T4ImFull': 'Task T-4: imitation of all 1,236 usable Falcon ditto replays on Final Destination, 20,000 updates. '
                'No PPO; the start of T4HumP.',
    'T4ImFullH4': 'As T4ImFull, with frame history (4 states, 8 frames apart). The start of T4HumH.',
    'scripted bot level 9': 'Not a network: a hand-written Falcon that recovers and attacks. Level 9 is its '
                            'hardest setting.',
}

_INPUTS = {'Base': 'the usual inputs', 'Emb': 'the animation embedding',
           'EmbSmall': 'the animation embedding, started small', 'Prev': 'the previous button press as an input'}
_T19 = {'': 'trained on the graphics card at full length (2,940 updates)',
        'h': 'a run planned for half the length (1,470 updates)',
        'L6': 'a half-length run at twice the learning rate',
        'L12': 'a half-length run at four times the learning rate'}

PATTERNS = [
    (r'T19(h|L6|L12|)(Base|EmbSmall|Emb|Prev)(\d)',
     lambda m: 'Task T-19 (faster experiments): %s, with %s, random seed %s.' % (_T19[m[1]], _INPUTS[m[2]], m[3])),
    (r'T21L6s(\d)', lambda m: 'Task T-21: self-play at twice the usual learning rate (0.0006), lowered to zero over '
                              'the run as usual, random seed %s.' % m[1]),
    (r'T21L6Cs(\d)', lambda m: 'As T21L6Cs4 (twice the learning rate, held constant), random seed %s.' % m[1]),
    (r'T21L3Cs(\d)', lambda m: 'Task T-21: the usual learning rate (0.0003) held constant instead of lowered, '
                               'random seed %s.' % m[1]),
    (r'T22Base(\d)', lambda m: 'Task T-22: the T21L6Cs4 settings again (usual inputs), random seed %s.' % m[1]),
    (r'T22EmbSmall(\d)', lambda m: 'Task T-22: the T21L6Cs4 settings plus the small-start animation embedding, '
                                   'random seed %s.' % m[1]),
    (r'T22Scale(\d)', lambda m: 'Task T-22: the T21L6Cs4 settings with positions and hitstun rescaled to a similar '
                                'size, random seed %s.' % m[1]),
    (r'T22L12Cs(\d)', lambda m: 'Task T-22: four times the usual learning rate (0.0012), held constant, random '
                                'seed %s.' % m[1]),
    (r'T22LongBase(\d+)', lambda m: 'Task T-22: the T21L6Cs4 settings trained twice as long (5,880 updates), '
                                    'random seed %s.' % m[1]),
    (r'T22LongEmb(\d+)', lambda m: 'Task T-22: the small-start embedding trained twice as long (5,880 updates), '
                                   'random seed %s.' % m[1]),
    (r'T16Base(\d)', lambda m: 'Task T-16 (controls): the usual controls (a decision every 2 frames, no reaction '
                               'delay), random seed %s.' % m[1]),
    (r'T16F1s(\d)', lambda m: 'Task T-16: a decision every frame, no reaction delay, random seed %s.' % m[1]),
    (r'T16F1D15s(\d)', lambda m: 'Task T-16: a decision every frame, with a human-like 15-frame reaction delay, '
                                 'random seed %s.' % m[1]),
    (r'T17F54s(\d)', lambda m: 'Task T-17 (controller): a decision every frame with an 11-frame reaction delay, '
                               'the usual 54 inputs in one list, random seed %s.' % m[1]),
    (r'T17F102s(\d)', lambda m: 'Task T-17: as T17F54, but 102 inputs (more stick positions) in one list, random '
                                'seed %s.' % m[1]),
    (r'T17H102s(\d)', lambda m: 'Task T-17: as T17F102, but chosen in two steps (button, then stick), random '
                                'seed %s.' % m[1]),
    (r'T4V1s(\d)', lambda m: 'Task T-4 (learning from replays), the comparison runs: self-play, a decision every '
                             'frame with an 11-frame reaction delay, the usual inputs (version 1), random seed %s.'
                             % m[1]),
    (r'T4V2s(\d)', lambda m: 'Task T-4: as T4V1, but with input version 2, built only from what both the simulator '
                             'and human replays record, random seed %s.' % m[1]),
    (r'T37Plain(\d)', lambda m: 'Task T-37 (memory of past frames), the comparison runs: as T4V2, no frame history, '
                                'random seed %s.' % m[1]),
    (r'T37H(\d)s(\d)_(\d)', lambda m: 'Task T-37: as T37Plain, but the input also holds the game state from the '
                                      'last %s states, %s frames apart (frame history), random seed %s.'
                                      % (m[1], m[2], m[3])),
]


PATTERNS += [
    (r'T4HumP(\d)', lambda m: 'Task T-4, the human line: PPO self-play (2,940 updates, current controls, input '
                              'version 2) started from T4ImFull, the network that copied human replays, instead of '
                              'from scratch; random seed %s.' % m[1]),
    (r'T4HumH(\d)', lambda m: 'As T4HumP, but started from T4ImFullH4, the imitation network with frame history; '
                              'random seed %s.' % m[1]),
    (r'T4HumK([ab])(\d)', lambda m: 'As T4HumP, plus a penalty for drifting away from the imitation policy (KL '
                                    'coefficient %s), random seed %s.' % ({'a': '0.1', 'b': '1.0'}[m[1]], m[2])),
]

# Runs scored both at the usual length (_c04, 2,940 updates) and continued to double length (_c08, 5,880 updates).
# Both copies are shown, so the double-length one is told apart in its shown name.
TWO_LENGTHS = r'T37'
LONG = ' (double length)'


def explain(name):
    if name.endswith(LONG):
        base = explain(name[:-len(LONG)])
        return base and base + ' Trained twice as long: 5,880 updates instead of 2,940.'
    if name in NAMES:
        return NAMES[name]
    for pat, text in PATTERNS:
        m = re.fullmatch(pat, name)
        if m:
            return text(m)
    return None


def show(name):
    """The name as the site shows it: without the end-of-run checkpoint suffix (_c04, _c08)."""
    if name.startswith('scripted'):
        return name.replace('_', ' ')
    m = re.match(r'(.+?)_c08$', name)
    if m and re.match(TWO_LENGTHS, m[1]):
        return m[1] + LONG
    return re.sub(r'_c\d\d(?=_|$)', '', name)


def last_copy(run):
    """The checkpoint number saved at the end of a run (from the model folders, 2026-11-12)."""
    if run.startswith(('SimBase', 'T22Long')):
        return 8
    if re.match(r'(T9|T12|T19h|T19L6|T19L12)(?!\d)', run):
        return 1
    return 4


def end_of_run(name):
    """True for a model saved at the end of its run (or one with no checkpoint suffix)."""
    m = re.match(r'(.+?)_c(\d\d)(?:_|$)', name)
    if m and re.match(TWO_LENGTHS, m[1]) and int(m[2]) in (4, 8):
        return True
    return not m or int(m[2]) == last_copy(m[1])
