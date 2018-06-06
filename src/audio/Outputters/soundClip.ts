import {Sound} from "./Sound";

export class SoundClip extends Sound {
  private buffer: AudioBuffer;

  constructor(audioContext: AudioContext, buffer: AudioBuffer = null) {
    super(audioContext);

    this.buffer = buffer;
  }

  public play(): void {
    if (this.buffer == null) { return; }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.buffer;

    this.setCurrentAudioNode(source);
    source.start(0);
  }

  public stop(): void {
    return; // TODO
  }

  public setBuffer(buffer: AudioBuffer) {
    this.buffer = buffer;
  }
}
