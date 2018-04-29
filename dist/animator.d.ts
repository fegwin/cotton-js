import { Compositor } from "./compositor";
export declare class Animator {
    private compositor;
    private deltaTime;
    private lastTime;
    private accumulatedTime;
    constructor(compositor: Compositor, deltaTime?: number);
    start(): void;
    protected animate(time: number): void;
    private enqueue();
}
