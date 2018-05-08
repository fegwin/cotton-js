import { Sound } from "./Sound";
export declare class SoundClip extends Sound<AudioBufferSourceNode> {
    constructor(url: string);
    play(loop: boolean): void;
    playAt(msFromStart: number): void;
    stop(): void;
}
