import { Layer } from './layer';
import { Buffer } from './buffer';

// Helper class to contain root buffer elements (what's on the dom)
// to their layer class.
class CanvasElementToLayer {
  public buffer: Buffer;
  public layer: Layer;

  constructor(buffer: Buffer, layer: Layer) {
    this.buffer = buffer;
    this.layer = layer;
  }
}

export class Compositor {
  private rootContainer: HTMLElement;
  private canvasElementToLayers: CanvasElementToLayer[] = [];

  public constructor(
    width: number,
    height: number,
    rootElement: HTMLElement,
    layers: Layer[] = [],
  ) {
    var newContainer = document.createElement('div');
    newContainer.style.position = 'relative';

    rootElement.parentNode.replaceChild(newContainer, rootElement);

    this.rootContainer = newContainer;
    this.addLayers(width, height, layers);
  }

  public addLayers(width: number, height: number, layers: Layer[]): void {
    for (var i = 0; i < layers.length; i++) {
      var layer = layers[i];

      var layerCanvas = this.createLayerElement(width, height, i);

      this.canvasElementToLayers.push(
        new CanvasElementToLayer(new Buffer(width, height, layerCanvas), layer),
      );

      this.rootContainer.appendChild(layerCanvas);
    }
  }

  private createLayerElement(width: number, height: number, i: number) {
    var layerCanvas = document.createElement('canvas');
    layerCanvas.width = width;
    layerCanvas.height = height;
    layerCanvas.style.position = 'absolute';
    layerCanvas.style.left = '0px';
    layerCanvas.style.top = '0px';
    layerCanvas.id = 'layer' + i;
    layerCanvas.style.zIndex = String(i);

    return layerCanvas;
  }

  // This method will get each layer to update each of it's entities
  // Calculations are done here.
  // This is called for you by the animator
  public update(deltaTime: number): void {
    for (var i = 0; i < this.canvasElementToLayers.length; i++) {
      this.canvasElementToLayers[i].layer.update(deltaTime);
    }
  }

  // This method will take each layer and combine
  // then into the buffer. The resulting canvas is painted onto
  // the passed in context
  // This is called for you by the animator
  public paint(): void {
    for (var i = 0; i < this.canvasElementToLayers.length; i++) {
      var rootCanvasContainer = this.canvasElementToLayers[i];
      rootCanvasContainer.buffer.clear();
      rootCanvasContainer.layer.paintOn(rootCanvasContainer.buffer.getContext());
    }
  }
}
