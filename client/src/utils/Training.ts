import {TrainingMode} from "./TrainingMode.ts";
import {createContext} from "react";
import {action, makeObservable, observable} from "mobx"

export class Training {
    timeLeftMs: number;
    trainingMode: TrainingMode;

    currentStep: number;


    constructor(trainingMode: TrainingMode) {
        this.trainingMode = trainingMode;

        this.timeLeftMs = trainingMode.durationSec * 1000;
        this.currentStep = 0;

        makeObservable(this, {
            currentStep: observable,
            timeLeftMs: observable,

            // isMoveCorrect: computed,
            // getNextStep: computed,
            // getXNextSteps: computed,

            goToNextStep: action,
        });
    }

    isMoveCorrect(inputFingerIds: Array<number>): boolean{
        for(const fingerId of this.trainingMode.keyPattern[this.currentStep]){
            console.log(typeof inputFingerIds);
            if(!inputFingerIds.includes(fingerId))
                return false;
        }
        return true;
    }

    isMoveIncludeWrongFingerId(fingerIds: Array<number>): boolean{
        for(const fingerId of fingerIds){
            if(this.trainingMode.keyPattern[this.currentStep].includes(fingerId))
                return true;
        }
        return false;
    }

    getCurrentStepPattern():Array<number>{
        return this.trainingMode.keyPattern[this.currentStep];
    }

    getNextStep(step: number): number {
        if (step + 1 >= this.trainingMode.keyPattern.length) {
            return 0;
        } else {
            return step + 1;
        }
    }

    goToNextStep(): void {
        this.currentStep = this.getNextStep(this.currentStep);
    }

    getXNextSteps(x: number): Array<Array<number>> {
        let resultArray = new Array<Array<number>>();
        let localCurrentStep = this.currentStep;

        for (let i = 0; i < x; i++) {
            resultArray.push(this.trainingMode.keyPattern[localCurrentStep]);
            localCurrentStep = this.getNextStep(localCurrentStep);
        }

        return resultArray;
    }


}

const defaultKeyPattern = [
    [0,2,9],
    [1,3],
    [0,1,3],
    [7,8],
    [0,1,2,3,4,5,6,7,8,9],
    [5],
];

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

