import { audioContext } from "./audio";
import { IInputable } from "./IInputable";
import { IOutputable } from "./IOutputable";

export abstract class AudioOutput implements IOutputable {
  public readonly output: GainNode;

  protected readonly audioContext = audioContext;

  constructor() {
    this.output = audioContext.createGain();
  }

  public disconnectAll(): void {
    this.output.disconnect();
  }

  public disconnect(targetOutput: IInputable): void {
    this.output.disconnect(targetOutput.input);
  }

  public connectTo(target: IInputable): void {
    this.output.connect(target.input);
  }
}
