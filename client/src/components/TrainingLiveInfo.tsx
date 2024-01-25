import {useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {UserSettingsContext} from "../utils/UserSettings.ts";
import {observer} from "mobx-react-lite";

export function TrainingLiveInfo() {
    const training = useContext(TrainingContext);
    const userSettings = useContext(UserSettingsContext);

    const currentMoves = () => {
        return training.getCurrentMovePattern().map((fingerId: number) => (
            <span key={fingerId}>{fingerId}</span>
        ));
    }

    const Temp = observer(() => {
        return (
            <div className={'h-10'}>
                <span className={'text-white font-bold text-xl'}>Mistakes made: {training.mistakesMade}</span>
            </div>
        );
    });

    function Mistakes() {
        return observer(() => {
                return <span className={'text-white font-bold text-xl h-8'}>Mistakes made: {training.mistakesMade}</span>

            }
        )
    }

    return (
        <Temp/>
    )

}