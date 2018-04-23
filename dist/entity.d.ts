import { EntityGraph } from "./entity-graph";
import { Trait } from "./trait";
import { BoundingBox, Point } from "./util/math";
export declare abstract class Entity {
    bounds: BoundingBox;
    position: Point;
    acceleration: Point;
    private name;
    private debug;
    private entityGraph;
    private traits;
    private trait;
    private lifetime;
    private firstPaintComplete;
    private size;
    private buffer;
    constructor(position: Point, size: Point, entityGraph: EntityGraph, traits?: Trait[], debug?: boolean);
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    getTraits(): Trait[];
    protected abstract draw(): void;
    private calculateBounds();
}
