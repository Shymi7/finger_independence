import {TrainingMode} from "./TrainingMode.ts";

export const trainingModesList = [
    new TrainingMode(
        0,
        'Basic',
        [
            [0],
            [1],
            [2],
            [3],
        ],
        30,
        'left',
        'default',
        'default'
    ),
    new TrainingMode(
        1,
        'Intermediate',
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
        'Advanced',
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
        'Master',
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