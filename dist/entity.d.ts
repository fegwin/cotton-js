import { EntityLibrary } from "./entity-library";
import { Trait } from "./trait";
import { BoundingBox, Vector2 } from "./util/math";
export declare abstract class Entity {
    bounds: BoundingBox;
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
    private debug;
    private entityLibrary;
    private trait;
    private lifetime;
    private firstPaintComplete;
    private size;
    private memoryCanvas;
    constructor(position: Vector2, size: Vector2, entityLibrary: EntityLibrary, traits?: Trait[], debug?: boolean);
    paintOn(context: CanvasRenderingContext2D): void;
    update(deltaTime: number): void;
    addTrait(trait: Trait): void;
    addTraits(traits: Trait[]): void;
    removeTrait(trait: string): void;
    getTraits(): Trait[];
    getEntityLibrary(): EntityLibrary;
    getName(): string;
    protected abstract draw(): void;
    private calculateBounds();
}
