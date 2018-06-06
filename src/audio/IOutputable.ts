import { IInputable } from "./IInputable";

export interface IOutputable {
  output: AudioNode;
  disconnectAll(): void;
  disconnect(targetOutput: IInputable): void;
  connectTo(targetOutput: IInputable): void;
}
