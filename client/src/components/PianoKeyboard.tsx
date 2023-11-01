import {PianoKey} from "./PianoKey.tsx";
import React, {useContext} from "react";
import {UserSettingsContext} from "../utils/UserSettings.ts";
import {TrainingContext} from "../utils/Training.ts";

export function PianoKeyboard() {

    const userSettings = useContext(UserSettingsContext);
    const training = useContext(TrainingContext);


    const pianoBlackKeysCombination = new Array<boolean>(true, true, true, false, true, true, false, true, true, true);


    setInterval(()=>{
        training.goToNextStep();
    }, 500);

    const keyElements = (): React.ReactElement[] => {
        return userSettings.keyBindings.map((keyBinding, index) => {
            return (
                <PianoKey
                    key={index}
                    keyChar={keyBinding}
                    hasBlackKey={pianoBlackKeysCombination[index]}
                />
            )
        })
    }


    return (
        <div className={'w-full h-80 flex flex-row justify-center'}>
            {keyElements()}
        </div>
    )
}