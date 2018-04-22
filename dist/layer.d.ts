import { Entity } from "./entity";
import { EntityGraph } from "./entity-graph";
import { BoundingBox } from "./util/math";
export declare class Layer {
    bounds: BoundingBox;
    private width;
    private height;
    private entityGraph;
    private entities;
    private buffer;
    constructor(width: number, height: number, entityGraph: EntityGraph, entities?: Entity[]);
    addEntity(entity: Entity): void;
    addEntities(entities: Entity[]): void;
    removeEntity(entity: Entity): void;
    update(deltaTime: number): void;
    paintOn(context: CanvasRenderingContext2D): void;
    private calculateBounds();
}
