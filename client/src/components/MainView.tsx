import {PianoKeyboard} from "./PianoKeyboard.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";
import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {UserSettingsContext} from "../utils/UserSettings.ts";

export function MainView(){
    const training = useContext(TrainingContext);
    const userSettings = useContext(UserSettingsContext);


    addEventListener("keydown", (event) => {
        const keyIndex = userSettings.convertKeyBindingToKeyIndex(event.key);

        if(training.isMoveCorrect(keyIndex)){
            training.goToNextStep();
        }

    });

    return(
        <div className={'w-full h-full'}>
            <KeyWaterfall/>
            <PianoKeyboard/>
        </div>
    )
}