import { Layer } from './layer';
export declare class Compositor {
    private bufferContext;
    private buffer;
    private layers;
    constructor(width: number, height: number, layers?: Layer[]);
    addLayer(layer: Layer): void;
    update(deltaTime: number): void;
    drawOnTo(bufferContext: CanvasRenderingContext2D): void;
}
