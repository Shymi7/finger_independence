import {TrainingMode} from "./TrainingMode.ts";

export const trainingModesList = [
    new TrainingMode(
        0,
        'Easy',
        [
            [0],
            [1],
            [2],
            [3],
        ],
        60,
        'left',
        'default',
        'default'
    ),
    new TrainingMode(
        1,
        'Medium',
        [
            [0,2],
            [0,2],
            [1,3],
            [1,3],
        ],
        60,
        'left',
        'default',
        'default'
    ),
    new TrainingMode(
        2,
        'Hard',
        [
            [0,2,6,8],
            [1,3,7,9],
        ],
        60,
        'left',
        'default',
        'default'
    ),
    new TrainingMode(
        3,
        'Ultra hard',
        [
            [0,2,3,8,9],
            [1,2,6,7],
            [3,6,8,9],
            [0,1,3,7,8,9],
        ],
        60,
        'left',
        'default',
        'default'
    ),
]