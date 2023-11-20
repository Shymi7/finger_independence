import HandIcon from '../assets/hand-icon.svg';
import classNames from "classnames";
import React, {useContext} from "react";
import {UserSettingsContext} from "../utils/UserSettings.ts";

export interface HandInfoProps {
    hand: 'left' | 'right'
}

export function HandInfo({hand}: HandInfoProps) {
    const userSettings = useContext(UserSettingsContext);

    const leftHandKeyPositions = [
        {x: 15, y: 40},
        {x: 28, y: 36},
        {x: 42, y: 34},
        {x: 55, y: 36},
        {x: 72, y: 55},
    ];

    const rightHandKeyPositions = [
        {x: 18, y: 56},
        {x: 34, y: 36},
        {x: 48, y: 32},
        {x: 61, y: 36},
        {x: 74, y: 40},
    ];

    const keyPositions = hand == 'left' ? leftHandKeyPositions : rightHandKeyPositions;
    const indexAdjustmentForRightHand = hand == 'left' ? 0 : 5;

    function KeyElements() {

        return keyPositions.map((keyPosition, index) => {
            return (
                userSettings.keyBindings[index + indexAdjustmentForRightHand] == '' ?
                    <></>
                    :
                    <div
                        className={classNames(
                            'bg-gray-300 h-10 w-10 overflow-hidden absolute',
                            'rounded-lg border-2 border-accent'
                        )}
                        key={index}
                        style={{
                            left: keyPosition.x + '%',
                            top: keyPosition.y + '%',
                        }}
                    >
                        <div
                            className={classNames(
                                'bg-gray-300 h-full flex flex-row justify-center items-center',
                                'text-2xl font-bold text-accent-dark',
                            )}

                        >
                            {userSettings.keyBindings[index + indexAdjustmentForRightHand]}
                        </div>
                    </div>
            );
        })
    }


    return (
        <div className={'h-full w-96 p-10 flex flex-row relative'}>
            <img
                style={{
                    transform: hand == 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                    width: "100%",
                }}
                src={HandIcon} alt={'hand icon'}
            />
            {KeyElements()}
        </div>
    )
}