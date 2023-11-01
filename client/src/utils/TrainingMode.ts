export class TrainingMode{
    id: number;
    name: string;

    keyPattern: Array<Array<number>>;
    durationSec: number;

    handMode: "left" | "right" | "dual";
    mistakesCheckingMode: "default" | "strict"; // strict - a mistake stops the game
    keyReleaseMode: "default" | "strict"; // strict - you have to release a key to press another one

    constructor(
        id: number,
        name: string,
        keyPattern: Array<Array<number>>,
        durationSec: number,
        handMode: "left" | "right" | "dual",
        mistakesCheckingMode: "default" | "strict",
        keyReleaseMode: "default" | "strict"
    ) {
        this.id = id;
        this.name = name;
        this.keyPattern = keyPattern;
        this.durationSec = durationSec;
        this.handMode = handMode;
        this.mistakesCheckingMode = mistakesCheckingMode;
        this.keyReleaseMode = keyReleaseMode;
    }
}

