import { Entity } from './entity';
import { BoundingBox } from './util/math';
export declare class Layer {
    private width;
    private height;
    bounds: BoundingBox;
    private entities;
    private buffer;
    constructor(width: number, height: number, entities?: Entity[]);
    private calculateBounds();
    addEntity(entity: Entity): void;
    addEntities(entities: Entity[]): void;
    removeEntity(entity: Entity): void;
    update(deltaTime: number): void;
    paintOn(context: CanvasRenderingContext2D): void;
}
