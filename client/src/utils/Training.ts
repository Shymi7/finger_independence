import {TrainingMode} from "./TrainingMode.ts";
import {createContext, useContext} from "react";
import {action, makeObservable, observable} from "mobx"
import {TrainingScore} from "./TrainingScore.ts";
import {UserSettings, UserSettingsContext} from "./UserSettings.ts";

export class Training {
    trainingMode: TrainingMode;
    trainingScore: TrainingScore;

    userSettings: UserSettings;

    timeOfStart: number | null;
    currentMove: number;
    mistakesMade: number;
    isTrainingEnded: boolean;

    pressedKeys: string[];


    constructor(trainingMode: TrainingMode) {
        this.trainingMode = trainingMode;
        this.trainingScore = new TrainingScore(this.trainingMode.id);

        this.userSettings = new UserSettings();

        this.timeOfStart = null;
        this.currentMove = 0;
        this.mistakesMade = 0;
        this.isTrainingEnded = false;

        this.pressedKeys = new Array<string>();

        makeObservable(this, {
            currentMove: observable,
            // timeOfStart: observable,
            mistakesMade: observable,
            isTrainingEnded: observable,
            // isMoveCorrect: computed,
            // getNextStep: computed,
            // getXNextSteps: computed,

            goToNextMove: action,
            finishTraining: action,
        });
    }

    resetTraining(trainingMode: TrainingMode){
        this.trainingMode = trainingMode;
        this.trainingScore = new TrainingScore(this.trainingMode.id);

        this.userSettings = new UserSettings();

        this.timeOfStart = null;
        this.currentMove = 0;
        this.mistakesMade = 0;
        this.isTrainingEnded = false;

        this.pressedKeys = new Array<string>();
    }

    keyPressed(key: string){
        if (this.pressedKeys.includes(key))
            return;

        if(this.timeOfStart == null)
            this.startCountdown();

        this.pressedKeys.push(key);
        const pressedKeyIds = this.userSettings.convertKeyBindingsToKeyIndexes(this.pressedKeys);

        if(this.isMoveIncludeWrongFingerId(pressedKeyIds)){
            this.mistakesMade++;
            return;
        }

        if (this.isMoveCorrect(pressedKeyIds)){
            this.goToNextMove();
            this.trainingScore.timesOfRightMoves.push(Date.now());
        }

    }

    keyReleased(key: string){
        const index = this.pressedKeys.indexOf(key);
        if (index > -1) {
            this.pressedKeys.splice(index, 1);
        }
    }

    startCountdown(){
        this.timeOfStart = Date.now();
        setTimeout(()=>{
            this.finishTraining();
        }, this.trainingMode.durationSec * 1000)
    }

    finishTraining(){
        console.log("finished");
        this.isTrainingEnded = true;
        console.log(this.trainingScore.getArrayWithRightMovesInEachInterval(1000));
    }

    isMoveCorrect(inputFingerIds: Array<number>): boolean{
        for(const fingerId of this.trainingMode.keyPattern[this.currentMove]){
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
    2,
    "left",
    "default",
    "default"
)

export const TrainingContext = createContext<Training>(new Training(defaultTrainingMode));




