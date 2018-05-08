import { Audio } from "./audio";
import { Effect } from "./effects";

export abstract class Sound {
  protected readonly audioContext: AudioContext;
  protected readonly audioNode: AudioNode;
  protected readonly analyserNode: AnalyserNode;

  private effects: Effect[] = [];

  constructor(audioContext: AudioContext, audioNode: AudioNode) {
    this.audioNode = audioNode;
    this.audioContext = audioContext;

    this.analyserNode = this.audioContext.createAnalyser();

    this.reconfigureConnections();
  }

  public abstract play(): void;

  public abstract stop(): void;

  public addEffects(effects: Effect[]): void {
    this.effects = this.effects.concat(effects);
    this.reconfigureConnections();
  }

  public removeEffect(effect: Effect): void {
    this.effects = this.effects.filter((x) => x !== effect);
    this.reconfigureConnections();
  }

  public removeEffects(): void {
    // do a bit of clean up, so old effects don't persist
    // around.
    this.effects.forEach((effect) => effect.disconnectAll());

    this.effects = [];
  }

  public analyseFrequencies(freqStepInHz: number): {[index: number]: number} {
    return; // TODO
  }

  public analyseTimeDomain(freqStepInHz: number): {[index: number]: number}  {
    return; // TODO
  }

  private reconfigureConnections(): void {
    // Disconnect all noes
    this.audioNode.disconnect();
    this.effects.forEach((e) => e.disconnectAll());
    this.analyserNode.disconnect();

    // reattach the nodes
    for (let i = 0; i < this.effects.length; i++) {
      const currentEffect = this.effects[i];

      if (i === 0) {
        this.audioNode.connect(currentEffect.getNode());
        return;
      }

      if (i === this.effects.length) {
        currentEffect.getNode().connect(this.analyserNode);
        return;
      }

      // we want to connect the current node to the next node in the
      // sequence. This creates a chain.
      currentEffect.getNode().connect(this.effects[i + 1].getNode());
    }

    this.analyserNode.connect(this.audioContext.destination);
  }
}
