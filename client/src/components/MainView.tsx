import {PianoKeyboard} from "./PianoKeyboard.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";
import {createContext, useContext, useState} from "react";
import {Training, TrainingContext} from "../utils/Training.ts";
import {TrainingLiveInfo} from "./TrainingLiveInfo.tsx";
import {HandInfo} from "./HandInfo.tsx";
import {SettingsForm} from "./SettingsForm.tsx";
import {trainingModesList} from "../utils/trainingModesList.ts";

export function MainView() {
    const training = useContext(TrainingContext);

    const [isTrainingStarted, setIsTrainingStarted] = useState<boolean>(false);


    addEventListener("keydown", (event) => {
        training.keyPressed(event.key);
    });

    addEventListener("keyup", (event) => {
        training.keyReleased(event.key);
    });

    function startTraining(selectedTrainingModeId: number) {
        training.resetTraining(trainingModesList[selectedTrainingModeId]);
        setIsTrainingStarted(true);
    }

    return (
        <div className={'w-full h-full flex flex-row'}>
            <HandInfo hand={'left'}/>
            <div className={'flex flex-col grow-1'}>
                <div className={'w-full h-96'}>
                    {
                        isTrainingStarted ?
                            <div className={'w-full h-full'}>
                                <TrainingLiveInfo/>
                                <KeyWaterfall/>
                            </div>
                            :
                            <SettingsForm
                                startTrainingFn={(selectedTrainingModeId) => startTraining(selectedTrainingModeId)}/>
                    }
                </div>


                <PianoKeyboard/>
            </div>
            <HandInfo hand={'right'}/>

        </div>
    )
}