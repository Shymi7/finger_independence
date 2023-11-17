import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";

export function TrainingScoreInfo(){
    const training = useContext(TrainingContext);

    return(
        <div className={'w-full h-full'}>
            {training.trainingScore.timesOfRightMoves}
        </div>
    )
}