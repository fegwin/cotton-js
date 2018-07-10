import { Entity } from "..";
import { ISides } from "../util/math";
export declare class AABBCollision {
    entity: Entity;
    sides: ISides;
    constructor(entity: Entity, sides: ISides);
}
export declare class AABBCollider {
    private collidableEntityTraits;
    private entity;
    constructor(entity: Entity, collidableEntityTraits: string[]);
    detectCollisions(): AABBCollision[];
}
