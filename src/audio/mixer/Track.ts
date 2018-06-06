
import { AudioProcessor } from "../AudioProcessor";
import { IEffectable } from "../effects";
import { ITrack } from "./ITrack";

export class Track extends AudioProcessor implements ITrack {
  public name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }

  public setVolume(amount: number): void {
    throw new Error("Method not implemented.");
  }
  public getVolume(): number {
    throw new Error("Method not implemented.");
  }
  public addEffect(effect: IEffectable): void {
    throw new Error("Method not implemented.");
  }
  public removeEffect(effect: IEffectable): void {
    throw new Error("Method not implemented.");
  }
}
