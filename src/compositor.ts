import { Layer } from './layer';

export class Compositor {
  private bufferContext: CanvasRenderingContext2D;
  private buffer: HTMLCanvasElement;
  private layers: Layer[];

  public constructor(width: number, height: number, layers: Layer[] = []) {
    this.layers = layers;
    this.buffer = document.createElement('canvas');
    this.buffer.width = width;
    this.buffer.height = height;
    this.bufferContext = this.buffer.getContext('2d');
  }

  public addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  public update(deltaTime: number): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].update(deltaTime);
    }
  }

  public drawOnTo(bufferContext: CanvasRenderingContext2D): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].drawOnTo(this.bufferContext);
    }

    bufferContext.drawImage(this.buffer, 0, 0);
  }
}
