import { Entity } from "./entity";
import { EntityLibrary } from "./entity-library";
import { BoundingBox } from "./util/math";
export declare class Layer {
    bounds: BoundingBox;
    private width;
    private height;
    private entityLibrary;
    private entities;
    private memoryCanvas;
    constructor(width: number, height: number, entityLibrary: EntityLibrary, entities?: Entity[]);
    addEntity(entity: Entity): void;
    addEntities(entities: Entity[]): void;
    removeEntity(entity: Entity): void;
    update(deltaTime: number): void;
    paintOn(context: CanvasRenderingContext2D): void;
    private calculateBounds();
}
