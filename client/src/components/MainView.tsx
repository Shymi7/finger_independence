import {PianoKeyboard} from "./PianoKeyboard.tsx";
import {KeyWaterfall} from "./KeyWaterfall.tsx";
import {createContext, JSX, useContext, useState} from "react";
import {Training, TrainingContext} from "../utils/Training.ts";
import {TrainingLiveInfo} from "./TrainingLiveInfo.tsx";
import {HandInfo} from "./HandInfo.tsx";
import {SettingsForm} from "./SettingsForm.tsx";
import {trainingModesList} from "../utils/trainingModesList.ts";
import {observer} from "mobx-react-lite";
import {TrainingScoreInfo} from "./TrainingScoreInfo.tsx";

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



    const DynamicView = observer(()=>{
        function result(){
            if(isTrainingStarted && !training.isTrainingEnded){
                return (
                    <div className={'w-full h-full'}>
                        <TrainingLiveInfo/>
                        <KeyWaterfall/>
                    </div>
                )
            }

            if(!training.isTrainingEnded){
                return(
                    <SettingsForm
                        startTrainingFn={(selectedTrainingModeId) => startTraining(selectedTrainingModeId)}/>
                )
            }

            return(
                <TrainingScoreInfo/>
            )
        }

        return (
            <div className={'w-full h-96'}>
                {
                    result()
                }
            </div>
        )
    })


    return (
        <div className={'w-full h-full flex flex-row pl-32 pt-10'}>
            <HandInfo hand={'left'}/>
            <div className={'flex flex-col '}>

                <DynamicView/>

                <PianoKeyboard/>
            </div>
            <HandInfo hand={'right'}/>

        </div>
    )
}