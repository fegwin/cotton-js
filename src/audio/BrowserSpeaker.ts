import { AudioDestination } from "./AudioDestination";

export class BrowserSpeaker extends AudioDestination {
  constructor() {
    super();
    this.input.connect(this.audioContext.destination);
  }
}
