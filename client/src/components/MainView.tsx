import {PianoKeyboard} from "./PianoKeyboard.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";
import {useContext, useState} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {TrainingLiveInfo} from "./TrainingLiveInfo.tsx";
import {HandInfo} from "./HandInfo.tsx";
import {SettingsForm} from "./SettingsForm.tsx";

export function MainView() {
    const training = useContext(TrainingContext);

    const [isTrainingStarted, setIsTrainingStarted] = useState<boolean>(false);


    addEventListener("keydown", (event) => {
        training.keyPressed(event.key);
    });

    addEventListener("keyup", (event) => {
        training.keyReleased(event.key);
    });

    return (
        <div className={'w-full h-full flex flex-row'}>
            <HandInfo hand={'left'}/>
            <div className={'flex flex-col grow-1'}>
                {
                    isTrainingStarted ?
                        <div className={''}>
                            <TrainingLiveInfo/>
                            <KeyWaterfall/>
                        </div>
                        :
                        <SettingsForm/>
                }

                <PianoKeyboard/>
            </div>
            <HandInfo hand={'right'}/>

        </div>
    )
}