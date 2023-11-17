import React, {JSX, useContext} from "react";
import {TrainingContext} from "../utils/Training.ts";
import {observer} from "mobx-react-lite";
import {UserSettingsContext} from "../utils/UserSettings.ts";
import * as classNames from "classnames";


export function KeyWaterfall() {
    const training = useContext(TrainingContext);
    const userSettings = useContext(UserSettingsContext);

    const numberOfDisplayedMoves = 4;
    const numberOfKeys = 10;

    const keyWidthPercent = (Math.floor(1 / numberOfKeys * 100));

    function rowOfKeys(fingerIds: Array<number>) {
        let keyElements: Array<JSX.Element> = new Array<React.JSX.Element>();

        for (const fingerId of fingerIds) {
            keyElements.push(
                <div
                    className={classNames(
                        'bg-gray-300 h-full overflow-hidden absolute top-0 right-0',
                        'rounded-lg border-2 border-accent'
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
                        {userSettings.convertIndexKeyToKeyBinding(fingerId)}
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


    const Temp = observer(() => {
        return (
            <div className={'w-full h-full'}>
                {rowsOfKeys()}
            </div>
        );
    });

    return (
        <div className={'h-full'}>
            <Temp/>
        </div>
    )
}