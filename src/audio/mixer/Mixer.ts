import { AudioOutput } from "../AudioOutput";
import { ITrack } from "./ITrack";
import { Track } from "./Track";

export class Mixer extends AudioOutput {
  protected readonly TracksByName: { [trackName: string]: ITrack; } = {};
  protected readonly MasterTrack = new Track();

  constructor() {
    super();
    this.MasterTrack.output.connect(this.output);
  }

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
