import { loadBuffer } from "../util/arrayBuffer";
import {BrowserSpeaker} from "./BrowserSpeaker";
import { Reverb } from "./effects";
import { SoundClip } from "./outputters/SoundClip";

const audioContext = new AudioContext();
const browserSpeaker = new BrowserSpeaker();
const soundClipsByUrl: {[url: string]: SoundClip} = {};

export async function createSoundClip(url: string, connectToBrowserSpeaker: boolean = true): Promise<SoundClip> {
    const soundByUrl = soundClipsByUrl[url];
    if (!!soundByUrl) { return soundByUrl; }

    const buffer = await loadBuffer(url);
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    const sound = new SoundClip(audioBuffer);
    soundClipsByUrl[url] = sound;

    if (connectToBrowserSpeaker) {
      const reverb = new Reverb(3, 3);
      sound.connectTo(reverb);
      reverb.connectTo(browserSpeaker);
    }

    return sound;
  }

export { audioContext, browserSpeaker };
