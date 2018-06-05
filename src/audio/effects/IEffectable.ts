import {IInputable} from "../IInputable";
import {IOutputable} from "../IOutputable";

export interface IEffectable extends IInputable, IOutputable {
  name: string;

  setDryWet(amount: number): void;
}
