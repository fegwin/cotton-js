import { Entity } from "./entity";
import { BoundingBox } from "./util/math";
export declare class Layer {
    bounds: BoundingBox;
    private width;
    private height;
    private entities;
    private buffer;
    constructor(width: number, height: number, entities?: Entity[]);
    addEntity(entity: Entity): void;
    addEntities(entities: Entity[]): void;
    removeEntity(entity: Entity): void;
    update(deltaTime: number): void;
    paintOn(context: CanvasRenderingContext2D): void;
    private calculateBounds();
}
