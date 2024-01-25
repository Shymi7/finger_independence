import {trainingModesList} from "../utils/trainingModesList.ts";
import {TrainingModeInfo} from "./TrainingModeInfo.tsx";
import {useState} from "react";


interface SettingsFormProps {
    startTrainingFn: (trainingModeId:number) => void;

}

export function SettingsForm({startTrainingFn}: SettingsFormProps) {
    const [selectedTrainingModeId, setSelectedTrainingModeId] = useState(-1);
    const [isTrainingModeSettingsChanged, setIsTrainingModeSettingsChanged] = useState(false);
    const [trainingModeDurationSec, setTrainingModeDurationSec] = useState(60);
    const [isTrainingModeKeyReleaseModeStrict, setIsTrainingModeKeyReleaseModeStrict] = useState(false);

    return (
        <div className={'h-full w-full flex flex-row text-white'}>
            <div className={'w-1/2 flex flex-col justify-between'}>
                <div className={'flex flex-col'}>
                    <span className={''}>
                        {selectedTrainingModeId >= 0 && trainingModesList[selectedTrainingModeId].name}
                    </span>
                    <label>
                        <input
                            className={'accent-accent-dark m-4'}
                            type="checkbox"
                            checked={isTrainingModeSettingsChanged}
                            onChange={() => {
                                setIsTrainingModeSettingsChanged(prevState => !prevState)
                            }}
                        />
                        Change settings
                    </label>
                    {
                        isTrainingModeSettingsChanged &&
                        <div className={'flex flex-col'}>
                            <label>
                            <span className={'px-4'}>
                                Choose training duration
                            </span>
                                <select
                                    className={'text-accent-dark font-bold rounded-md'}
                                    value={trainingModeDurationSec}
                                    onChange={(event) => {
                                        setTrainingModeDurationSec(parseInt(event.target.value))
                                    }}
                                >
                                    <option value={30}>30</option>
                                    <option value={60}>60</option>
                                    <option value={90}>90</option>
                                    <option value={120}>120</option>
                                </select>
                            </label>
                            <label>
                                <input
                                    className={'accent-accent-dark m-4'}
                                    type="checkbox"
                                    checked={isTrainingModeSettingsChanged}
                                    onChange={() => {
                                        setIsTrainingModeKeyReleaseModeStrict(prevState => !prevState)
                                    }}
                                />
                                Strict mode
                            </label>

                        </div>
                    }
                </div>


                <button
                    className={'w-40 bg-accent-dark text-white px-8 py-2 rounded-xl m-2 font-bold text-xl'}
                    onClick={() => {
                        startTrainingFn(selectedTrainingModeId);
                    }}
                >
                    Start
                </button>
            </div>
            {/*<div className={'relative w-1/2 h-full overflow-y-scroll no-scrollbar border-accent-light'}>*/}
            {/*    {*/}
            {/*        trainingModesList.map(*/}
            {/*            trainingMode => <TrainingModeInfo*/}
            {/*                key={trainingMode.id}*/}
            {/*                trainingMode={trainingMode}*/}
            {/*                chooseTrainingModeFn={()=>{*/}
            {/*                    setSelectedTrainingModeId(trainingMode.id);*/}
            {/*                }}*/}
            {/*                isSelected={trainingMode.id == selectedTrainingModeId}*/}
            {/*            />*/}
            {/*        )*/}
            {/*    }*/}
            {/*    <div className="absolute bottom-0 left-0 w-full h-20 text-white p-4 bg-gradient-to-b from-transparent to-dark-custom">*/}

            {/*    </div>*/}
            {/*</div>*/}
            <div className="relative w-1/2 h-full">
                <div className="overflow-y-scroll no-scrollbar h-full border-accent-light">
                    {
                        trainingModesList.map(
                            trainingMode => <TrainingModeInfo
                                key={trainingMode.id}
                                trainingMode={trainingMode}
                                chooseTrainingModeFn={()=>{
                                    setSelectedTrainingModeId(trainingMode.id);
                                }}
                                isSelected={trainingMode.id == selectedTrainingModeId}
                            />
                        )
                    }
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 text-white p-4 bg-gradient-to-b from-transparent to-dark-custom">

                </div>
            </div>

        </div>
    )
}