import { Layer } from './layer';
import { Buffer } from './buffer';

export class Compositor {
  private buffer: Buffer;
  private layers: Layer[];

  public constructor(width: number, height: number, layers: Layer[] = []) {
    this.layers = layers;
    this.buffer = new Buffer(width, height);
  }

  public addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  // This method will get each layer to update each of it's entities
  // Calculations are done here.
  // This is called for you by the animator
  public update(deltaTime: number): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].update(deltaTime);
    }
  }

  // This method will take each layer and combine
  // then into the buffer. The resulting canvas is painted onto
  // the passed in context
  // This is called for you by the animator
  public paintOn(context: CanvasRenderingContext2D): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].paintOn(this.buffer.getContext());
    }

    context.drawImage(this.buffer.getCanvas(), 0, 0);
  }
}
