export declare class Buffer {
    private canvas;
    private context;
    private width;
    private height;
    constructor(width: number, height: number, canvas?: HTMLCanvasElement);
    getContext(): CanvasRenderingContext2D;
    getCanvas(): HTMLCanvasElement;
    clear(): void;
}
