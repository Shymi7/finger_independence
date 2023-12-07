import {TrainingMode} from "../utils/TrainingMode.ts";
import React, {JSX, useState} from "react";
import * as classNames from "classnames";
import {Training} from "../utils/Training.ts";


interface TrainingModeInfoProps{
    trainingMode: TrainingMode,
    chooseTrainingModeFn: () => void,
    isSelected: boolean,
}
export function TrainingModeInfo({trainingMode, chooseTrainingModeFn, isSelected}: TrainingModeInfoProps){
    const numberOfDisplayedMoves = 4;
    const numberOfKeys = 10;

    const keyWidthPercent = (Math.floor(1 / numberOfKeys * 100));
    const training = new Training(trainingMode);

    const [isHighlighted, setIsHighlighted] = useState(false);

    function rowOfKeys(fingerIds: Array<number>) {
        let keyElements: Array<JSX.Element> = new Array<React.JSX.Element>();

        for (const fingerId of fingerIds) {
            keyElements.push(
                <div
                    className={classNames(
                        'bg-gray-300 h-full overflow-hidden absolute top-0 right-0',
                        'rounded border-2 border-accent'
                    )}
                    key={Math.random()}
                    style={{
                        width: keyWidthPercent + '%',
                        left: keyWidthPercent * fingerId + '%'
                    }}
                >
                    <div
                        className={classNames(
                            'bg-gray-300 h-full flex flex-row justify-center items-center',
                            'text-4xl font-bold text-accent-dark',
                        )}

                    >

                    </div>
                </div>
            )
        }
        return (
            <div
                className={'w-full flex flex-row relative'}
                key={Math.random()}
                style={{height: (Math.floor(1 / numberOfDisplayedMoves * 100)) + '%'}}
            >
                {keyElements}
            </div>
        );
    }

    function rowsOfKeys() {
        return (training.getXNextMoves(numberOfDisplayedMoves).reverse().map(fingerIds => {
            return rowOfKeys(fingerIds);
        }))
    }

    function getStylingAccordingToState():string{
        if(!isHighlighted && !isSelected)
            return 'bg-dark-custom border-2';

        if(isHighlighted && !isSelected)
            return 'bg-dark-custom-light border-2';

        if(!isHighlighted && isSelected)
            return 'bg-accent-dark border-0';

        return 'bg-dark-custom border-2';
    }


    return(
        <div
            className={classNames(
                'w-full h-28 border-accent-dark rounded-2xl',
                'text-white text-xl my-2 p-2 flex flex-row',
                getStylingAccordingToState()
            )}
            onMouseEnter={()=>{setIsHighlighted(true)}}
            onMouseLeave={()=>{setIsHighlighted(false)}}
            onClick={()=>{chooseTrainingModeFn()}}
        >
            <div className={'flex flex-row w-1/2'}>
                {trainingMode.name}

            </div>
            <div className={'w-1/2'}>
                {rowsOfKeys()}
            </div>
        </div>
    )
}