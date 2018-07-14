import { AudioProcessor } from "../AudioProcessor";
import { IEffectable } from "../effects";
import { ITrack } from "./ITrack";

export class Track extends AudioProcessor implements ITrack {
  private effects: IEffectable[] = [];

  constructor() {
    super();

    this.reconfigureConnections();
  }

  public setVolume(amount: number): void {
    if (amount < 0 || amount > 1) {
      throw new RangeError("amount needs to be between 0 and 1.");
    }

    this.output.gain.setValueAtTime(amount, this.audioContext.currentTime);
  }

  public getVolume(): number {
    return this.output.gain.value;
  }

  public addEffects(effects: IEffectable[]): void {
    this.effects = this.effects.concat(effects);
    this.reconfigureConnections();
  }

  public removeEffect(effect: IEffectable): void {
    effect.disconnectAll();
    this.effects = this.effects.filter((x) => x !== effect);
    this.reconfigureConnections();
  }

  public removeEffects(): void {
    // do a bit of clean up, so old effects don't persist
    // around in memory.
    this.effects.forEach((effect) => effect.disconnectAll());

    this.effects = [];
    this.reconfigureConnections();
  }

  private reconfigureConnections(): void {
    const effectStack = [...this.effects];

    let currentItem = effectStack.pop();

    // Set the input to go into the first effect.
    if (currentItem) {
      this.input.connect(currentItem.input);
     }

    while (effectStack.length !== 0) {
        const nextItem = effectStack.pop();
        currentItem.connectTo(nextItem);
        currentItem = nextItem;
      }

    const lastEffect = this.effects[this.effects.length - 1];
    if (lastEffect) {
        lastEffect.output.connect(this.output);
    } else {
      this.input.connect(this.output);
    }
  }
}
