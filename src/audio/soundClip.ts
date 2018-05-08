import {Sound} from "./Sound";

export class SoundClip extends Sound {
  /**
   *
   */
  constructor(audioContext: AudioContext, audioNode: ArrayBufferSourceNode) {
    super(audioContext, audioNode);

    
  }

  public play(): void {
    throw new Error("Method not implemented.");
  }
  public stop(): void {
    throw new Error("Method not implemented.");
  }

}
