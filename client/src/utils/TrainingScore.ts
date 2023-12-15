
export class TrainingScore{
    timesOfRightMoves: Array<number>;
    timesOfWrongMoves: Array<number>;

    trainingModeId: number;


    constructor(trainingModeId: number) {
        this.trainingModeId = trainingModeId;

        this.timesOfRightMoves = new Array<number>();
        this.timesOfWrongMoves = new Array<number>();
    }

    getArrayWithRightMovesInEachInterval(timeDividerMs: number): Array<number>{
        let resultArray = [0];

        if(this.timesOfRightMoves.length == 0)
            return resultArray;

        let j = 0;//index of result array
        let time = this.timesOfRightMoves[0];
        for(let i = 0; i < this.timesOfRightMoves.length; i++){//index of timesOfRightMoves

            if(this.timesOfRightMoves[i] < time + timeDividerMs){
                resultArray[j]++;

            } else {
                resultArray.push(0);
                j++;
                i--;
                time += timeDividerMs;
            }

        }

        return resultArray;
    }

}