import {Sound} from "./sound";

export class Audio {
  private context: AudioContext;
  private soundsByUrl: {[url: string]: Sound} = {};

  constructor() {
    this.context = new window.AudioContext();
  }

  public createSound(url: string): Sound {
    const soundByUrl = this.soundsByUrl[url];
    if (!!soundByUrl) { return soundByUrl; }

    const source = this.context.createBufferSource();
    const sound = new Sound(this.context, source);
    this.loadFromUrl(source, url);

    return this.soundsByUrl[url] = sound;
  }

  private loadFromUrl(source: AudioBufferSourceNode, url: string): void {
    const request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      const audioData = request.response;

      this.context.decodeAudioData(audioData, (buffer) => {
          source.buffer = buffer;
          source.connect(this.context.destination);
        },
        (e) => {
          throw Error("Error with decoding audio data" + e);
        });
    };

    request.send();
  }
}
