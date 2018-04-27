import { EntityLibrary } from "./entity-library";
import { Trait } from "./trait";
import { BoundingBox, Point } from "./util/math";
export declare abstract class Entity {
    bounds: BoundingBox;
    position: Point;
    velocity: Point;
    acceleration: Point;
    private name;
    private debug;
    private entityLibrary;
    private traits;
    private trait;
    private lifetime;
    private firstPaintComplete;
    private size;
    private buffer;
    constructor(position: Point, size: Point, entityLibrary: EntityLibrary, traits?: Trait[], debug?: boolean);
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    getTraits(): Trait[];
    protected abstract draw(): void;
    private calculateBounds();
}
