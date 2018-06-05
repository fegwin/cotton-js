import {IInputable} from "./IInputable";

export abstract class AudioDestination implements IInputable {
  public input: AudioNode;
}
