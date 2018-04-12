import Layer from './layer';

export default class Compositor {
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

  public removeLayer(layer: Layer): void {
    this.layers = this.layers.filter((l) => {
      return l !== layer;
    });
  }

  public update(deltaTime: number): void {
    this.layers.forEach(layer => layer.update(deltaTime));
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.layers.forEach(layer => layer.draw(this.bufferContext));
    context.drawImage(this.buffer, 0, 0);
  }
}
