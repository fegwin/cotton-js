import { Buffer } from "./buffer";
import { Layer } from "./layer";

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
/**
 * Composes different layers together
 * and controls the handling of DOM
 * manipulation.
 */
export class Compositor {
  private rootContainer: HTMLElement;
  private canvasElementToLayers: CanvasElementToLayer[] = [];

  public constructor(
    width: number,
    height: number,
    rootElement: HTMLElement,
    layers: Layer[] = [],
  ) {
    const newContainer = document.createElement("div");
    newContainer.style.position = "relative";

    rootElement.parentNode.replaceChild(newContainer, rootElement);

    this.rootContainer = newContainer;
    this.addLayers(width, height, layers);
  }

  /**
   *
   * @param width The width of all the layers
   * @param height The height of all the layers
   * @param layers An array of layers to add
   */
  public addLayers(width: number, height: number, layers: Layer[]): void {
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];

      const layerCanvas = this.createLayerElement(width, height, i);

      this.canvasElementToLayers.push(
        new CanvasElementToLayer(new Buffer(width, height, layerCanvas), layer),
      );

      this.rootContainer.appendChild(layerCanvas);
    }
  }

  /**
   * Gets each layer to update and each of it's entities and does calculations.
   * This is called for you by the Animator.
   * @param deltaTime How many times a second to update
   */
  public update(deltaTime: number): void {
    for (const canvasElementToLayer of this.canvasElementToLayers) {
      canvasElementToLayer.layer.update(deltaTime);
    }
  }

  /**
   * Takes each layer and combins them into a buffer.
   * The resulting canvas is painted onto the passed in context.
   * This is called for you by the animator.
   */
  public paint(): void {
    for (const canvasElementToLayer of this.canvasElementToLayers) {
      canvasElementToLayer.buffer.clear();
      canvasElementToLayer.layer.paintOn(canvasElementToLayer.buffer.getContext());
    }
  }

  private createLayerElement(width: number, height: number, i: number) {
    const layerCanvas = document.createElement("canvas");
    layerCanvas.width = width;
    layerCanvas.height = height;
    layerCanvas.style.position = "absolute";
    layerCanvas.style.left = "0px";
    layerCanvas.style.top = "0px";
    layerCanvas.id = "layer" + i;
    layerCanvas.style.zIndex = String(i);

    return layerCanvas;
  }
}
