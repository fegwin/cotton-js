import { BoundingBox, Point } from './util/math';
import { Trait } from './trait';
export declare abstract class Entity {
    private name;
    private debug;
    private traits;
    private lifetime;
    private firstPaintComplete;
    private size;
    private vel;
    private pos;
    bounds: BoundingBox;
    private buffer;
    constructor(pos: Point, vel: Point, size: Point, traits?: Trait[], debug?: boolean);
    private initialiseTraits(traits);
    private calculateBounds();
    protected abstract draw(): void;
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
}
