import { AudioOutput } from "../AudioOutput";
import { ITrack } from "./ITrack";
import { Track } from "./Track";

export class Mixer extends AudioOutput {
  protected TracksByName: { [trackName: string]: ITrack; } = {};
  protected MasterTrack = new Track();

  public getMaster(): ITrack {
    return this.MasterTrack;
  }

  public getTrack(trackName: string): ITrack | null {
    return this.TracksByName[trackName];
  }

  public setTrack(track: ITrack, name: string): void {
    track.connectTo(this.MasterTrack);
    this.TracksByName[name] = track;
  }
}
