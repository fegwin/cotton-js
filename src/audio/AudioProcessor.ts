import {IInputable} from "./IInputable";
import {IOutputable} from "./IOutputable";

export abstract class AudioProcessor implements IInputable, IOutputable {
  public output: AudioNode;
  public input: AudioNode;

  constructor(audio: AudioContext) {
    this.input = audio.createGain();
    this.output = audio.createGain();
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
