import { AudioProcessor } from "../AudioProcessor";
import { IInputable } from "../IInputable";
import { IEffectable } from "./IEffectable";

export abstract class AudioEffect extends AudioProcessor implements IEffectable {
  public readonly dryNode: GainNode;
  public readonly name: string;

  constructor(effectName: string) {
    super();

    this.name = effectName;

    this.dryNode = this.audioContext.createGain();

    this.input.connect(this.dryNode);
    this.dryNode.connect(this.output);
  }

  public connectTo(targetOutput: IInputable): void {
    this.output.connect(targetOutput.input);
  }

  public disconnectAll(): void {
    this.output.disconnect();
  }

  public disconnect(targetOutput: IInputable): void {
    this.output.disconnect(targetOutput.input);
  }

  public setDryWet(amount: number): void {
    if (amount < 0 || amount > 1) {
      throw new RangeError("amount needs to be between 0 and 1.");
    }

    this.dryNode.gain.setValueAtTime(1 - amount, this.audioContext.currentTime);
    this.setWet(amount);
  }

  protected abstract setWet(amount: number): void;
}
