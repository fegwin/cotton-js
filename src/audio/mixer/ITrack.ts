
import {IEffectable} from "./effects/IEffectable";
import {IInputable} from "./IInputable";
import {IOutputable} from "./IOutputable";

export interface ITrack {
  name: string;

  setVolume(amount: number): void;
  getVolume(): number;

  addEffect(effect: IEffectable): void;
  removeEffect(effect: IEffectable): void;

  // Pan?
  // Sends?
}
