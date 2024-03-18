import classNames from "classnames";
import {PianoKeyboard} from "./PianoKeyboard.tsx";

interface Props{
    onComponentClose: () => void;
}
export function PersonalBestScores( {onComponentClose} : Props) {
    return(
        <>
            <div className={'bg-white-transparent fixed z-40 w-full h-full left-0 top-14'}>
            </div>
            <div
                className={classNames(
                    'absolute w-1/2 h-2/3 left-1/4 top-1/4 z-50 flex flex-col justify-start items-center',
                    'bg-dark-custom-light border-4 border-accent-dark rounded-2xl',
                )}>


                <button
                    className={'self-end text-accent font-bold text-2xl mr-4 mt-4'}
                    onClick={onComponentClose}
                >
                    X
                </button>



            </div>
        </>
    )
}