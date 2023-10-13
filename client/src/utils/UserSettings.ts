interface KeyBinding{
    keyName: string;
    keyValue: number;
    keyCode: number;
}
export interface UserSettings{
    keyBindings: Array<KeyBinding>;
    trainingModeId: number;
}