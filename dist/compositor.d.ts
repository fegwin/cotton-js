import { Layer } from './layer';
export declare class Compositor {
    private rootContainer;
    private layers;
    constructor(width: number, height: number, container: HTMLElement, layers?: Layer[]);
    addLayers(width: number, height: number, layers: Layer[]): void;
    update(deltaTime: number): void;
    paint(): void;
}
