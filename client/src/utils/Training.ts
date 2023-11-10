import {TrainingMode} from "./TrainingMode.ts";
import {createContext} from "react";
import {action, makeObservable, observable} from "mobx"
import {TrainingScore} from "./TrainingScore.ts";

export class Training {
    trainingMode: TrainingMode;
    trainingScore: TrainingScore;

    timeOfStart: number;
    currentMove: number;
    mistakesMade: number;


    constructor(trainingMode: TrainingMode) {
        this.trainingMode = trainingMode;
        this.trainingScore = new TrainingScore(this.trainingMode.id);

        this.timeOfStart = Date.now();
        this.currentMove = 0;
        this.mistakesMade = 0;

        makeObservable(this, {
            currentMove: observable,
            // timeOfStart: observable,
            mistakesMade: observable,
            // isMoveCorrect: computed,
            // getNextStep: computed,
            // getXNextSteps: computed,

            goToNextMove: action,
        });
    }

    isMoveCorrect(inputFingerIds: Array<number>): boolean{
        for(const fingerId of this.trainingMode.keyPattern[this.currentMove]){
            console.log(typeof inputFingerIds);
            if(!inputFingerIds.includes(fingerId))
                return false;
        }
        return true;
    }

    isMoveIncludeWrongFingerId(fingerIds: Array<number>): boolean{
        for(const fingerId of fingerIds){
            if(!this.trainingMode.keyPattern[this.currentMove].includes(fingerId))
                return true;
        }
        return false;
    }

    getCurrentMovePattern():Array<number>{
        return this.trainingMode.keyPattern[this.currentMove];
    }

    getNextMove(step: number): number {
        if (step + 1 >= this.trainingMode.keyPattern.length) {
            return 0;
        } else {
            return step + 1;
        }
    }

    goToNextMove(): void {
        this.currentMove = this.getNextMove(this.currentMove);
    }

    getXNextMoves(x: number): Array<Array<number>> {
        let resultArray = new Array<Array<number>>();
        let localCurrentMove = this.currentMove;

        for (let i = 0; i < x; i++) {
            resultArray.push(this.trainingMode.keyPattern[localCurrentMove]);
            localCurrentMove = this.getNextMove(localCurrentMove);
        }

        return resultArray;
    }
}



const tempKP1 = [
    [0,2],
    [1,3],
];
const tempKP2 = [
    [0],
    [1],
    [2],
    [3],
];
const tempKP3 = [
    [0],
    [0],
    [1],
    [1],
    [2],
    [2],
    [3],
    [3],
];
const tempKP4 = [
    [0,2],
    [0,2],
    [1,3],
    [1,3],
];

const tempKP5 = [
    [6,8],
    [7,9],
];

const tempKP6 = [
    [6,8],
    [6,8],
    [7,9],
    [7,9],
];

const tempKP7 = [
    [0,2,6,8],
    [1,3,7,9],
];


const defaultKeyPattern = tempKP7;

export const defaultTrainingMode = new TrainingMode(
    1,
    "temp",
    defaultKeyPattern,
    20,
    "left",
    "default",
    "default"
)

export const TrainingContext = createContext<Training>(new Training(defaultTrainingMode));




