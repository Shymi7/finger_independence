import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {TrainingScoreInfoChart} from "./TrainingScoreInfoChart.tsx";

export function TrainingScoreInfo(){
    const training = useContext(TrainingContext);

    console.log(training.trainingScore.timesOfRightMoves);

    return(
        <div className={'w-full h-full'}>
            <TrainingScoreInfoChart
                dataArray={training.trainingScore.getArrayWithRightMovesInEachInterval(1000)}
            />
        </div>
    )
}