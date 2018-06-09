
import { AudioProcessor } from "../AudioProcessor";
import { IEffectable } from "../effects";
import { ITrack } from "./ITrack";

export class Track extends AudioProcessor implements ITrack {
  private effects: IEffectable[] = [];

  constructor() {
    super();
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

    for (let i = 0; i < this.effects.length; i++) {
      // Do first effect
      if (i === 0) {
        this.input.disconnect();
        const firstEffect = this.effects[0];
        firstEffect.disconnectAll();

        this.input.connect(firstEffect.input);
        return;
      }

      // Do last effect
      if (i === this.effects.length) {
        const lastEffect = this.effects[i];
        lastEffect.disconnectAll();
        lastEffect.output.connect(this.output);
        return;
      }
      const currentEffect = this.effects[i];
      currentEffect.disconnectAll();
      currentEffect.connectTo(this.effects[i + 1]);
    }
  }
}
