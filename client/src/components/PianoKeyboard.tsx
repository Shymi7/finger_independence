import {PianoKey} from "./PianoKey.tsx";

export function PianoKeyboard(){


    return(
        <div className={'w-full h-80 bg-gray-300 flex flex-row justify-center'}>
            <PianoKey keyChar={'z'} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'x'} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'c'} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'v'} hasBlackKey={false}></PianoKey>
            <PianoKey keyChar={''} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={''} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'m'} hasBlackKey={false}></PianoKey>
            <PianoKey keyChar={','} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'.'} hasBlackKey={true}></PianoKey>
            <PianoKey keyChar={'/'} hasBlackKey={true}></PianoKey>
        </div>
    )
}