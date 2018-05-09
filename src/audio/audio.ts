import {Sound} from "./sound";
import { SoundClip } from "./soundClip";

export class Audio {
  private context: AudioContext;
  private soundClipsByUrl: {[url: string]: SoundClip} = {};

  constructor() {
    this.context = new window.AudioContext();
  }

  public createSoundClip(url: string): SoundClip {
    const soundByUrl = this.soundClipsByUrl[url];
    if (!!soundByUrl) { return soundByUrl; }
    const sound = new SoundClip(this.context);

    this.loadFromUrl(sound, url);

    return this.soundClipsByUrl[url] = sound;
  }

  private loadFromUrl(clip: SoundClip, url: string): void {
    const request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      const audioData = request.response;

      this.context.decodeAudioData(
        audioData,
        (buffer) => clip.setBuffer(buffer),
        (e) => { throw new Error("Error with decoding audio data" + e); });
    };

    request.send();
  }
}
