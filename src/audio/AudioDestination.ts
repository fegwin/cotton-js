import { audioContext } from "./audio";
import { IInputable } from "./IInputable";

export abstract class AudioDestination implements IInputable {
  public readonly input: GainNode;
  protected readonly audioContext = audioContext;

  constructor() {
    this.input = audioContext.createGain();
  }
}
