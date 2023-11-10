import HandIcon from '../assets/hand-icon.svg';
import classNames from "classnames";
import React from "react";

export interface HandInfoProps {
    hand: 'left' | 'right'
}

export function HandInfo({hand}: HandInfoProps) {


    function keyElement(keyChar: string, distanceFromLeft: number, distanceFromTop: number){
        return(
            <div
                className={classNames(
                    'bg-gray-300 h-full overflow-hidden absolute',
                    'rounded-lg border-2 border-accent'
                )}
                key={Math.random()}
                style={{
                    top: distanceFromTop + '%',
                    left: distanceFromLeft + '%'
                }}
            >
                <div
                    className={classNames(
                        'bg-gray-300 h-full flex flex-row justify-center items-center',
                        'text-4xl font-bold text-accent-dark',
                    )}

                >
                    {keyChar}
                </div>
            </div>
        )
    }

    function KeyElements(){
        return
    }


    return (
        <div className={'h-full w-96 p-10'}>
            <img
                style={{
                    transform: hand == 'left' ? 'scaleX(-1)' : 'scaleX(1)',
                    width: "100%",
                }}
                src={HandIcon} alt={'hand icon'}
            />
        </div>
    )
}