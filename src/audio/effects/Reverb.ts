import { AudioEffect } from "./AudioEffect";

export class Reverb extends AudioEffect {
  private readonly reverbNode: ConvolverNode;
  private readonly reverbGainNode: GainNode;

  constructor(seconds: number, decay: number) {
    super("Reverb");

    this.reverbNode = this.audioContext.createConvolver();
    this.reverbGainNode = this.audioContext.createGain();
    this.reverbNode.buffer = this.constructImpulse(seconds, decay);

    this.input.connect(this.reverbNode);
    this.reverbNode.connect(this.reverbGainNode);
    this.reverbGainNode.connect(this.output);

    this.setDryWet(0.5);
  }

  protected setWet(amount: number): void {
    this.reverbGainNode.gain.setValueAtTime(amount, this.audioContext.currentTime);
  }

  private constructImpulse(seconds: number, decay: number): AudioBuffer {
    const rate = this.audioContext.sampleRate;

    const length = rate * seconds;
    const impulse = this.audioContext.createBuffer(2, length, rate);

    const impulseLeft = impulse.getChannelData(0);
    const impulseRight = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      impulseLeft[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      impulseRight[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }

    return impulse;
  }
}
