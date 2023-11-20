import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";

export function TrainingScoreInfo(){
    const training = useContext(TrainingContext);

    console.log(training.trainingScore.timesOfRightMoves);

    return(
        <div className={'w-full h-full'}>
            {training.trainingScore.timesOfRightMoves}
        </div>
    )
}