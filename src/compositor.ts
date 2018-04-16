import { Layer } from './layer';

class LayerElement {
  public width: number;
  public height: number;

  public buffer: HTMLCanvasElement;
  public bufferContext: CanvasRenderingContext2D;
  public layer: Layer;

  constructor(width: number, height: number, buffer: HTMLCanvasElement, layer: Layer) {
    this.width = width;
    this.height = height;
    this.buffer = buffer;
    this.bufferContext = buffer.getContext('2d');
    this.layer = layer;
  }
}

export class Compositor {
  private bufferContext: CanvasRenderingContext2D;
  private container: HTMLElement;
  private layers: LayerElement[] = [];

  public constructor(width: number, height: number, container: HTMLElement, layers: Layer[] = []) {
    var newContainer = document.createElement('div');
    newContainer.style.position = 'relative';

    container.parentNode.replaceChild(newContainer, container);

    this.container = newContainer;

    this.addLayers(width, height, layers);
  }

  public addLayers(width: number, height: number, layers: Layer[]): void {
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];

      var layerCanvas = document.createElement('canvas');
      layerCanvas.width = width;
      layerCanvas.height = height;

      layerCanvas.style.position = 'absolute';
      layerCanvas.style.left = '0px';
      layerCanvas.style.top = '0px';

      layerCanvas.id = 'layer' + i;
      layerCanvas.style.zIndex = String(i);

      this.layers.push(new LayerElement(width, height, layerCanvas, layer));

      this.container.appendChild(layerCanvas);
    }
  }

  public update(deltaTime: number): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].layer.update(deltaTime);
    }
  }

  public draw(): void {
    for (var i = 0; i < this.layers.length; i++) {
      var layerElement = this.layers[i];
      layerElement.bufferContext.clearRect(0, 0, layerElement.width, layerElement.height);
      layerElement.layer.drawOnTo(layerElement.bufferContext);
      layerElement.bufferContext.drawImage(layerElement.buffer, 0, 0);
    }
  }
}
