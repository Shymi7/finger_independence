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

    isMoveCorrect(fingerId: number): boolean {
        try {
            return this.trainingMode.keyPattern[this.currentStep] == fingerId;
        } catch (e) {
            throw new Error("currentStep out of sync");
        }
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

    getXNextSteps(x: number): Array<number> {
        let resultArray = new Array<number>();
        let localCurrentStep = this.currentStep;

        for (let i = 0; i < x; x++) {
            resultArray.push(this.trainingMode.keyPattern[localCurrentStep]);
            localCurrentStep = this.getNextStep(localCurrentStep);
        }

        return resultArray;
    }


}

export const defaultTrainingMode = new TrainingMode(
    1,
    "temp",
    [0, 1, 2, 3],
    20,
    "left",
    "default",
    "default"
)

export const TrainingContext = createContext<Training>(new Training(defaultTrainingMode));

