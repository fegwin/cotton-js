import { BoundingBox, Vec } from './util/math';
import { Trait } from './trait';
export declare abstract class Entity {
    private name;
    private traits;
    private lifetime;
    private size;
    private vel;
    private pos;
    bounds: BoundingBox;
    private bufferContext;
    private buffer;
    constructor(pos: Vec, vel: Vec, size: Vec, traits?: Trait[]);
    private initialiseTraits(traits);
    private calculateBounds();
    setup(): void;
    protected abstract initialRender(bufferContext: CanvasRenderingContext2D): void;
    protected updateRender(bufferContext: CanvasRenderingContext2D): void;
    drawTo(bufferContext: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
}
