import {trainingModeList} from "../utils/trainingModeList.ts";
import {TrainingModeInfo} from "./TrainingModeInfo.tsx";

export function SettingsForm(){





    return(
        <div className={'h-72 w-full'}>
            <div className={'w-full h-full overflow-y-scroll border-accent-light'}>
                {
                    trainingModeList.map(
                        trainingMode => <TrainingModeInfo key={trainingMode.id} trainingMode={trainingMode}/>
                    )
                }
            </div>

            <button
                className={'bg-accent-dark text-white px-8 py-2 rounded-xl m-2 font-bold text-xl'}
                onClick={()=>{

                }}
            >
                Start
            </button>
        </div>
    )
}