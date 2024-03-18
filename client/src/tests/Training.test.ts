import {describe, expect} from '@jest/globals';
import {defaultTrainingMode, Training} from "../utils/Training.ts";
import {TrainingMode} from "../utils/TrainingMode.ts";

describe('Training Class', () => {
    let training: Training;

    beforeEach(() => {
        const sampleKeyPattern = [
            [0,2,6,8],
            [1,3,7,9],
        ];

        const sampleTrainingMode = new TrainingMode(
            1,
            "temp",
            sampleKeyPattern,
            20,
            "left",
            "default",
            "default"
        )
        training = new Training(sampleTrainingMode);
    });

    it('should initialize correctly', () => {
        expect(training.trainingScore).toBeDefined();
        expect(training.timeOfStart).toBeNull();
        expect(training.currentMove).toBe(0);
        expect(training.mistakesMade).toBe(0);
        expect(training.isTrainingEnded).toBe(false);
        expect(training.pressedKeys).toEqual([]);
    });

    it('should reset training correctly', () => {
        training.resetTraining(defaultTrainingMode);

        expect(training.trainingScore).toBeDefined();
        expect(training.timeOfStart).toBeNull();
        expect(training.currentMove).toBe(0);
        expect(training.mistakesMade).toBe(0);
        expect(training.isTrainingEnded).toBe(false);
        expect(training.pressedKeys).toEqual([]);
    });

    it('should handle key pressed correctly', () => {
        training.keyPressed('z');
        expect(training.pressedKeys).toEqual(['z']);

        training.keyPressed('x');
        expect(training.pressedKeys).toEqual(['z', 'x']);

    });

    it('should handle key released correctly', () => {
        training.pressedKeys = ['z', 'x', 'c'];

        training.keyReleased('x');
        expect(training.pressedKeys).toEqual(['z', 'c']);

    });


    it('should check if move is correct', () => {
        expect(training.isMoveCorrect([0,2,6,8] )).toBe(true);

        expect(training.isMoveCorrect([0,2,6]   )).toBe(false);
        expect(training.isMoveCorrect([0,2]     )).toBe(false);
        expect(training.isMoveCorrect([8,2,6,7] )).toBe(false);
        expect(training.isMoveCorrect([1,4,7,0] )).toBe(false);
    });

    it('should check if move includes wrong finger id', () => {
        const result = training.isMoveIncludeWrongFingerId([1, 2, 3]);

        expect(result).toBe(true);
    });

    it('should get current move pattern', () => {
        const result = training.getCurrentMovePattern();

        expect(result).toEqual([0,2,6,8]);
    });

    it('should get next move', () => {
        let result = training.getNextMove(0);
        expect(result).toBe(1);

        result = training.getNextMove(1);
        expect(result).toBe(0);
    });

    it('should go to next move', () => {
        training.goToNextMove();
        expect(training.currentMove).toBe(1);
        training.goToNextMove();
        expect(training.currentMove).toBe(0);
    });

    it('should get X next moves', () => {
        expect(training.getXNextMoves(1)).toEqual(
            [
                [0,2,6,8],
            ]
        );
        expect(training.getXNextMoves(2)).toEqual(
            [
                [0,2,6,8],
                [1,3,7,9],
            ]
        );
        expect(training.getXNextMoves(5)).toEqual(
            [
                [0,2,6,8],
                [1,3,7,9],
                [0,2,6,8],
                [1,3,7,9],
                [0,2,6,8],
            ]
        );
    });
});