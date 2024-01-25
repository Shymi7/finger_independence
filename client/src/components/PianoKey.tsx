import {useState} from "react";
import classNames from "classnames";

export interface PianoKeyProps {
    keyChar: string;
    hasBlackKey: boolean;
}

export function PianoKey({keyChar, hasBlackKey}: PianoKeyProps) {
    const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

    addEventListener("keydown", (event) => {
        if (event.key === keyChar) {
            setIsKeyPressed(true);
        }
    });

    addEventListener("keyup", (event) => {
        if (event.key === keyChar) {
            setIsKeyPressed(false);
        }
    });


    return (
        <div className={classNames(
            'w-20 h-full mx-1 rounded-md flex flex-row items-end relative',
            isKeyPressed ? 'bg-gray-400' : 'bg-white',
        )}>
            {
                keyChar != '' &&
                <div className={classNames(
                    'bg-gray-300 w-full h-16 m-2 flex flex-row justify-center items-center rounded-lg border-2 border-accent text-2xl text-accent-dark',
                    isKeyPressed ? 'text-white font-bold bg-gray-600' : 'text-accent-dark bg-gray-300',
                )}>
                    {keyChar}
                </div>
            }

            {
                hasBlackKey &&
                <div className={'bg-black absolute w-8 h-3/5 right-[-20px] top-0 z-10'}>
                </div>
            }
        </div>
    )
}