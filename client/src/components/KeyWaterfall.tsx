import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {observer} from "mobx-react-lite";


export  function KeyWaterfall(){

    const Temp = observer(() => {
        const training = useContext(TrainingContext);
        return (
            <span className={'text-white'}>Current step: {training.currentStep}</span>
        )
    })

    return(
        <div className={'h-96'}>
            <Temp/>
        </div>
    )
}