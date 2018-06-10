import { audioContext } from "./audio";
import { IInputable } from "./IInputable";
import { IOutputable } from "./IOutputable";

export abstract class AudioProcessor implements IInputable, IOutputable {
  public readonly output: GainNode;
  public readonly input: GainNode;

  protected readonly audioContext = audioContext;

  constructor() {
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
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
}
