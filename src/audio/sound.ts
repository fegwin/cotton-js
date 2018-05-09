import { Audio } from "./audio";
import { Effect } from "./effects";

export abstract class Sound {
  protected readonly audioContext: AudioContext;
  protected audioNode: AudioNode;

  private readonly analyserNode: AnalyserNode;

  private effects: Effect[] = [];

  constructor(audioContext: AudioContext, audioNode: AudioNode = null) {
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
    // TODO: this may cause a memory leak if the effect node
    // is not disconnected?
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

  public analyseFrequencies(freqStepInHz: number): {[index: number]: number} {
    return; // TODO
  }

  public analyseTimeDomain(freqStepInHz: number): {[index: number]: number}  {
    return; // TODO
  }

  protected setCurrentAudioNode(audioNode: AudioNode) {
    this.audioNode = audioNode;
    this.reconfigureConnections();
  }

  private reconfigureConnections(): void {
    const nodesInConnectOrder = [
      this.audioNode,
       ...this.effects.map((effect) => effect.getNode()),
       this.analyserNode,
       this.audioContext.destination,
      ]
      .filter((node) => node != null);

    // reattach the nodes
    for (let i = 0; i < nodesInConnectOrder.length; i++) {
      // we've reached the end. no need to connect to anything.
      if (i === nodesInConnectOrder.length - 1) {
        return;
      }

      const currentNode = nodesInConnectOrder[i];
      const nextNode = nodesInConnectOrder[i + 1];
      currentNode.disconnect();

      currentNode.connect(nextNode);
    }
  }
}
