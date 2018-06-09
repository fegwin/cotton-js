import { IInputable } from "./IInputable";

export interface IOutputable {
  output: GainNode;
  disconnectAll(): void;
  disconnect(targetOutput: IInputable): void;
  connectTo(targetOutput: IInputable): void;
}
