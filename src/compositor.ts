import Layer from './layer';

export default class Compositor {
  bufferContext: CanvasRenderingContext2D;
  buffer: HTMLCanvasElement;
  layers: Layer[];

  constructor(width: number, height: number, layers: Layer[] = []) {
    this.layers = layers;
    this.buffer = document.createElement('canvas');
    this.buffer.width = width;
    this.buffer.height = height;
    this.bufferContext = this.buffer.getContext('2d');
  }

  addLayer(layer: Layer) {
    this.layers.push(layer);
  }

  removeLayer(layer: Layer) {
    this.layers = this.layers.filter((l) => {
      return l !== layer;
    });
  }

  update(deltaTime: number) {
    this.layers.forEach(layer => layer.update(deltaTime));
  }

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach(layer => layer.draw(this.bufferContext));
    context.drawImage(this.buffer, 0, 0);
  }
}
