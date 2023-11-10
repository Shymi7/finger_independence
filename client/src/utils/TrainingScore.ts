
export class TrainingScore{
    timesOfRightMoves: Array<number>;
    timesOfWrongMoves: Array<number>;

    trainingModeId: number;


    constructor(trainingModeId: number) {
        this.trainingModeId = trainingModeId;

        this.timesOfRightMoves = new Array<number>();
        this.timesOfWrongMoves = new Array<number>();
    }
}