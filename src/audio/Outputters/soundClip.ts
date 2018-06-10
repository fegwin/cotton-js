import { AudioOutput } from "../AudioOutput";

export class SoundClip extends AudioOutput {
  private buffer: AudioBuffer;
  private currentSource: AudioBufferSourceNode;

  constructor(buffer: AudioBuffer) {
    super();

    this.buffer = buffer;
  }

  public play(): void {
    this.currentSource.stop();

    this.currentSource = this.audioContext.createBufferSource();
    this.currentSource.buffer = this.buffer;

    this.currentSource.start(0);
  }

  public stop(): void {
    this.currentSource.stop();
  }
}
