import {TrainingMode} from "../utils/TrainingMode.ts";


interface TrainingModeInfoProps{
    trainingMode: TrainingMode
}
export function TrainingModeInfo({trainingMode}: TrainingModeInfoProps){
    return(
        <div
            className={'w-full h-28 border-accent-dark border-2 rounded-2xl bg-dark-custom text-white text-xl'}

        >
            {trainingMode.name}
        </div>
    )
}