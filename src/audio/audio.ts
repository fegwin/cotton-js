import { loadBuffer } from "../util/arrayBuffer";
import { SoundClip } from "./outputters/SoundClip";

const audioContext = new AudioContext();
const soundClipsByUrl: {[url: string]: SoundClip} = {};

export async function createSoundClip(url: string): Promise<SoundClip> {
    const soundByUrl = this.soundClipsByUrl[url];
    if (!!soundByUrl) { return soundByUrl; }

    const buffer = await loadBuffer(url);
    const audioBuffer = await audioContext.decodeAudioData(buffer);

    const sound = new SoundClip(audioBuffer);
    soundClipsByUrl[url] = sound;

    return sound;
  }

export { audioContext };
