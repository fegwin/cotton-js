import { audioContext } from "./audio";
import { AudioDestination } from "./AudioDestination";
import { IInputable } from "./IInputable";

export class BrowserSpeaker extends AudioDestination {
  public input: GainNode;
  protected audioContext = audioContext;

  constructor() {
    super();
    this.input.connect(audioContext.destination);
  }
}
