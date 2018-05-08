import {Sound} from "./Sound";

export class SoundClip extends Sound {
  // TODO: Seems wrong? not sure just yet. better than a generic,
  // because then you have to handle multiple lists.
  // another option is having an interface.
  private readonly bufferNode: AudioBufferSourceNode;

  constructor(audioContext: AudioContext, audioNode: AudioBufferSourceNode) {
    super(audioContext, audioNode);
    this.bufferNode = audioNode;
  }

  public play(): void {
    this.bufferNode.start(0);
  }

  public stop(): void {
    this.bufferNode.stop(0);
  }
}
