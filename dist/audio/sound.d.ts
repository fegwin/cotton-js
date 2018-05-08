import { Effect } from "./effects";
export declare abstract class Sound<T extends AudioNode> {
    protected audioNode: AudioNode;
    private effects;
    constructor(audioNode: T);
    addEffect(effect: Effect): void;
    removeEffect(effect: Effect): void;
    analyseFrequencies(freqStepInHz: number): {
        [index: number]: number;
    };
    analyseTimeDomain(freqStepInHz: number): {
        [index: number]: number;
    };
}
