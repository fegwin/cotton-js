import { Layer } from './layer';
export declare class Compositor {
    private buffer;
    private layers;
    constructor(width: number, height: number, layers?: Layer[]);
    addLayer(layer: Layer): void;
    update(deltaTime: number): void;
    paintOn(context: CanvasRenderingContext2D): void;
}
