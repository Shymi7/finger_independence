export interface TrainingMode{
    id: number;
    name: string;

    keyPattern: Array<number>;
    durationSec: number;

    handMode: "left" | "right" | "dual";
    mistakesCheckingMode: "default" | "strict"; // strict - a mistake stops the game
    keyReleaseMode: "default" | "strict"; // strict - you have to release a key to press another one
}