import { IInputable } from "../IInputable";
import { IOutputable } from "../IOutputable";
import { IEffectable } from "./IEffectable";

export abstract class AudioEffect implements IEffectable {
  public output: GainNode;
  public input: GainNode;

  public name: string;

  constructor(effectName: string, audio: AudioContext) {
    this.name = effectName;

    this.input = audio.createGain();
    this.output = audio.createGain();
  }

  public connectTo(targetOutput: IInputable): void {
    this.output.connect(targetOutput.input);
  }

  public abstract setDryWet(amount: number): void;

  public disconnectAll(): void {
    this.output.disconnect();
  }

  public disconnect(targetOutput: IInputable): void {
    this.output.disconnect(targetOutput.input);
  }
}
