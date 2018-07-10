import { Layer } from "./layer";
export declare class Compositor {
    private rootContainer;
    private canvasElementToLayers;
    constructor(width: number, height: number, rootElement: HTMLElement, layers?: Layer[]);
    addLayers(width: number, height: number, layers: Layer[]): void;
    update(deltaTime: number): void;
    paint(): void;
    private createLayerElement(width, height, i);
}
