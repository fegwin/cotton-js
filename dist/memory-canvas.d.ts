export declare class MemoryCanvas {
    private canvas;
    private context;
    private width;
    private height;
    constructor(width: number, height: number, canvas?: HTMLCanvasElement);
    getContext(): CanvasRenderingContext2D;
    getCanvas(): HTMLCanvasElement;
    clear(): void;
}
