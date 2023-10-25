import {TrainingMode} from "./TrainingMode.ts";
import {createSlice} from "@reduxjs/toolkit";

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
    getNextStep(step:number):number{
        if (step + 1 >= this.trainingMode.keyPattern.length) {
            return 0;
        } else {
            return step+1;
        }
    }

    goToNextStep(): void {
        this.currentStep = this.getNextStep(this.currentStep);
    }

    getXNextSteps(x:number): Array<number>{
        let resultArray = new Array<number>();
        let localCurrentStep = this.currentStep;

        for(let i= 0; i < x; x++){
            resultArray.push(this.trainingMode.keyPattern[localCurrentStep]);
            localCurrentStep = this.getNextStep(localCurrentStep);
        }

        return resultArray;
    }


}
const defaultTrainingMode = new TrainingMode(
    1,
    "temp",
    [1,2,3,4],
    20,
    "left",
    "default",
    "default"
)

const initialStateValue = { training: new Training(defaultTrainingMode) };

export const trainingSlice = createSlice({
    name: "training",
    initialState: { value: initialStateValue },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setValue } = trainingSlice.actions;

export default trainingSlice.reducer;