import { audioContext } from "./audio";
import { IInputable } from "./IInputable";
import { IOutputable } from "./IOutputable";

export abstract class AudioOutput implements IOutputable {
  public output: AudioNode;
  protected audioContext = audioContext;

  constructor() {
    this.output = audioContext.createGain();
  }

  public disconnectAll(): IOutputable {
    this.output.disconnect();
    return this;
  }

  public disconnect(targetOutput: IInputable): IOutputable {
    this.output.disconnect(targetOutput.input);
    return this;
  }

  public connectTo(target: IInputable): IOutputable {
    this.output.connect(target.input);
    return this;
  }
}
