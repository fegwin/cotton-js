import { EntityLibrary } from "./entity-library";
import { Trait } from "./trait";
import { BoundingBox, Vector2 } from "./util/math";
export declare abstract class Entity {
    bounds: BoundingBox;
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
    private name;
    private debug;
    private entityLibrary;
    private traits;
    private trait;
    private lifetime;
    private firstPaintComplete;
    private size;
    private buffer;
    constructor(position: Vector2, size: Vector2, entityLibrary: EntityLibrary, traits?: Trait[], debug?: boolean);
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    getTraits(): Trait[];
    protected abstract draw(): void;
    private calculateBounds();
}
