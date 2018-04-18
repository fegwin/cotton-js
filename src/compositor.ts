import { Layer } from './layer';
import { Buffer } from './buffer';

class LayerElement {
  public width: number;
  public height: number;

  public buffer: Buffer;
  public layer: Layer;

  constructor(width: number, height: number, buffer: Buffer, layer: Layer) {
    this.width = width;
    this.height = height;
    this.buffer = buffer;
    this.layer = layer;
  }
}

export class Compositor {
  private rootContainer: HTMLElement;
  private layers: LayerElement[] = [];

  public constructor(width: number, height: number, container: HTMLElement, layers: Layer[] = []) {
    var newContainer = document.createElement('div');
    newContainer.style.position = 'relative';

    container.parentNode.replaceChild(newContainer, container);

    this.rootContainer = newContainer;
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

      this.layers.push(
        new LayerElement(width, height, new Buffer(width, height, layerCanvas), layer),
      );

      this.rootContainer.appendChild(layerCanvas);
    }
  }

  // This method will get each layer to update each of it's entities
  // Calculations are done here.
  // This is called for you by the animator
  public update(deltaTime: number): void {
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].layer.update(deltaTime);
    }
  }

  // This method will take each layer and combine
  // then into the buffer. The resulting canvas is painted onto
  // the passed in context
  // This is called for you by the animator
  public paint(): void {
    for (var i = 0; i < this.layers.length; i++) {
      var layer = this.layers[i];
      layer.layer.paintOn(layer.buffer.getContext());
    }
  }
}
