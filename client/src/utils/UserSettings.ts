import {createContext} from "react";

export class UserSettings {
    constructor() {
        //default key bindings
        this._keyBindings = new Array<string>(
            'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        )
        this._trainingModeId = 1;
    }

    private _keyBindings: Array<string>;

    get keyBindings(): Array<string> {
        return this._keyBindings;
    }

    set keyBindings(value: Array<string>) {
        this._keyBindings = value;
    }

    private _trainingModeId: number;

    get trainingModeId(): number {
        return this._trainingModeId;
    }

    set trainingModeId(value: number) {
        this._trainingModeId = value;
    }

    convertKeyBindingToKeyIndex(keyBinding: string): number {
        const result = this.keyBindings.indexOf(keyBinding);

        if (result < 0)
            console.log('Bad key');

        return result;
    }

    convertKeyBindingsToKeyIndexes(keyBindings: Array<string>) : Array<number>{
        let resultArray = new Array<number>;

        for(const keyBinding of keyBindings){
            resultArray.push(this.convertKeyBindingToKeyIndex(keyBinding));
        }

        return resultArray;
    }

    convertIndexKeyToKeyBinding(keyIndex: number): string {
        try {
            return this.keyBindings[keyIndex];
        } catch (e) {
            console.log('Bad key index: ' + keyIndex);
        }
        //todo
        return '';
    }
}

export const UserSettingsContext = createContext<UserSettings>(new UserSettings());
