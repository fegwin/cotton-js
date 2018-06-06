
import { IEffectable } from "../effects";
import { IInputable } from "../IInputable";
import { IOutputable } from "../IOutputable";

export interface ITrack extends IInputable, IOutputable {
  setVolume(amount: number): void;
  getVolume(): number;

  addEffect(effect: IEffectable): void;
  removeEffect(effect: IEffectable): void;

  // Pan?
  // Sends?
}
