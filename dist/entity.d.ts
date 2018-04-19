import { ITrait } from "./trait";
import { BoundingBox, Point } from "./util/math";
export declare abstract class Entity {
    bounds: BoundingBox;
    private name;
    private traits;
    private lifetime;
    private firstPaintComplete;
    private size;
    private vel;
    private pos;
    private buffer;
    constructor(pos: Point, vel: Point, size: Point, traits?: ITrait[]);
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    protected abstract draw(): void;
    private initialiseTraits(traits);
    private calculateBounds();
}
