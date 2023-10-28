import {createContext} from "react";

export class UserSettings {
    constructor() {
        //default key bindings
        this._keyBindings = new Array<string>(
            'z', 'x', 'c', 'v', '', '', 'm', ',', '.', '/',
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

    convertKeyBindingToKeyIndex(keyBinding: string): number{
        const result = this.keyBindings.indexOf(keyBinding);

        if(result < 0)
            console.log('Bad key');

        return result;
    }
}

export const UserSettingsContext = createContext<UserSettings>(new UserSettings());
