import { audioContext } from "./audio";
import { IInputable } from "./IInputable";

export abstract class AudioDestination implements IInputable {
  public input: AudioNode;
  protected audioContext = audioContext;

  constructor(audio: AudioContext) {
    this.input = audioContext.createGain();
  }
}
