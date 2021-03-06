import { MemoryCanvas } from "./memory-canvas";
import { Layer } from "./layer";

// Helper class to contain root MemoryCanvas elements (what's on the dom)
// to their layer class.

/**
 * Helper class to contain root MemoryCanvas elements (what's on the dom)
 * to their layer class.
 */
class CanvasElementToLayer {
  public memoryCanvas: MemoryCanvas;
  public layer: Layer;

  constructor(memoryCanvas: MemoryCanvas, layer: Layer) {
    this.memoryCanvas = memoryCanvas;
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

  /**
   * @param width The width of the Compositor (and it's MemoryCanvas)
   * @param height The height of the Compositor (and it's MemoryCanvas)
   * @param rootElement The root element on the DOM that all Canvas manipulation occurs from
   * @param layers initial layers the Compositor contains
   */
  public constructor(
    width: number,
    height: number,
    rootElement: HTMLElement,
    layers: Layer[] = [],
  ) {
    const newContainer = document.createElement("div");
    newContainer.id = "cotton-el";
    newContainer.style.position = "relative";

    rootElement.parentNode.replaceChild(newContainer, rootElement);

    this.rootContainer = newContainer;
    this.addLayers(width, height, layers);
  }

  /**
   * Adds layers onto the compositor
   * @param width The width of all the layers
   * @param height The height of all the layers
   * @param layers An array of layers to add
   */
  public addLayers(width: number, height: number, layers: Layer[]): void {
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i];

      const layerCanvas = this.createLayerElement(width, height, i);

      this.canvasElementToLayers.push(
        new CanvasElementToLayer(new MemoryCanvas(width, height, layerCanvas), layer),
      );

      this.rootContainer.appendChild(layerCanvas);
    }
  }

  /**
   * Gets each layer to update and each of it's entities and does calculations.
   * This is called for you by the Animator.
   * @param deltaTime The time since the last update cycle
   */
  public update(deltaTime: number): void {
    for (const canvasElementToLayer of this.canvasElementToLayers) {
      canvasElementToLayer.layer.update(deltaTime);
    }
  }

  /**
   * Takes each layer and combins them into a MemoryCanvas.
   * The resulting canvas is painted onto the passed in context.
   * This is called for you by the animator.
   */
  public paint(): void {
    for (const canvasElementToLayer of this.canvasElementToLayers) {
      canvasElementToLayer.memoryCanvas.clear();
      canvasElementToLayer.layer.paintOn(canvasElementToLayer.memoryCanvas.getContext());
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
