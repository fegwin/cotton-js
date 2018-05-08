export class Effect {
  public audioNode: AudioNode;

  constructor(audioNode: AudioNode) {
    this.audioNode = audioNode;
  }

  public disconnectAll(): void {
    this.audioNode.disconnect();
  }

  public getNode(): AudioNode {
    return this.audioNode;
  }
}
