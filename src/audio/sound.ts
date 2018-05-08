import { Audio } from "./audio";
import { Effect } from "./effects";

export abstract class Sound {
  protected audioNode: AudioNode;
  protected analyserNode: AnalyserNode;

  private effects: Effect[];

  constructor(audioContext: AudioContext, audioNode: AudioNode) {
    this.audioNode = audioNode;

    this.analyserNode = audioContext.createAnalyser();
    this.audioNode.connect(this.analyserNode);
    this.analyserNode.connect(audioContext.destination);
  }

  public abstract play(): void;

  public abstract stop(): void;

  public addEffect(effect: Effect): void {
    return;
  }

  public removeEffect(effect: Effect): void {
    return;
  }

  public analyseFrequencies(freqStepInHz: number): {[index: number]: number} {
    return;
  }

  public analyseTimeDomain(freqStepInHz: number): {[index: number]: number}  {
    return;
  }
}
