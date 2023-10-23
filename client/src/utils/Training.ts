import {TrainingMode} from "./TrainingMode.ts";

export class Training {
    timeLeftMs: number;
    trainingMode: TrainingMode;

    currentStep: number;


    constructor(trainingMode: TrainingMode) {
        this.trainingMode = trainingMode;

        this.timeLeftMs = trainingMode.durationSec * 1000;
        this.currentStep = 0;
    }

    isMoveCorrect(fingerId: number): boolean {
        try {
            return this.trainingMode.keyPattern[this.currentStep] == fingerId;
        } catch (e) {
            throw new Error("currentStep out of sync");
        }
    }

    nextMove(): void {
        if (this.currentStep + 1 >= this.trainingMode.keyPattern.length) {
            this.currentStep = 0;
        } else {
            this.currentStep++;
        }
    }


}