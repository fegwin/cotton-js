import { Compositor } from './compositor';
export declare class Animator {
    private context;
    private compositor;
    private deltaTime;
    private lastTime;
    private accumulatedTime;
    constructor(compositor: Compositor, context: CanvasRenderingContext2D, deltaTime?: number);
    protected enqueue(): void;
    protected update(time: number): void;
    protected start(): void;
}
