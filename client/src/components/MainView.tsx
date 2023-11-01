import {PianoKeyboard} from "./PianoKeyboard.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";
import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {UserSettingsContext} from "../utils/UserSettings.ts";
import {TrainingLiveInfo} from "./TrainingLiveInfo.tsx";
import {HandInfo} from "./HandInfo.tsx";

export function MainView() {
    const training = useContext(TrainingContext);
    const userSettings = useContext(UserSettingsContext);

    let pressedKeys = new Array<string>();


    addEventListener("keydown", (event) => {
        if (!pressedKeys.includes(event.key)) {
            pressedKeys.push(event.key);
            console.log(userSettings.convertKeyBindingsToKeyIndexes(pressedKeys));
        }

    });

    addEventListener("keyup", (event) => {
        const index = pressedKeys.indexOf(event.key);
        if (index > -1) {
            pressedKeys.splice(index, 1);
        }

    });

    return (
        <div className={'w-full h-full flex flex-row'}>
            <HandInfo/>
            <div className={'flex flex-col grow-1'}>
                <TrainingLiveInfo/>
                <KeyWaterfall/>
                <PianoKeyboard/>
            </div>
            <HandInfo/>

        </div>
    )
}