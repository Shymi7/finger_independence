import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {UserSettingsContext} from "../utils/UserSettings.ts";
import {observer} from "mobx-react-lite";

export function TrainingLiveInfo() {
    const training = useContext(TrainingContext);
    const userSettings = useContext(UserSettingsContext);


    const ObserverElement = observer(() => {
        return (
            <div className={'h-8 flex flex-row w-full m-2 relative'}>
                <div className={'w-1/4'}>
                    <span className={'text-white font-bold text-xl'}>Mistakes made: {training.mistakesMade}</span>
                </div>

                <div className={'border-accent-dark rounded-2xl border-2 w-3/4 h-full'}>
                    <div
                        className={'bg-accent-dark rounded-2xl h-full text-right text-white px-4 font-bold'}
                        style={{width: (training.secondsLeft / training.trainingMode.durationSec * 100 + 0.5) + '%'}}
                    >
                    </div>
                </div>

                <div className={'absolute right-0 mr-4 flex items-center h-8 text-white font-bold'}>
                    <span>{training.secondsLeft + ' seconds left'}</span>
                </div>
            </div>



        );
    });


    return (
        <ObserverElement/>
    )

}