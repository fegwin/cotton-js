import { Entity, EntityGraph, Trait } from "..";
import { Point } from "../util/math";
export declare class BoundByGravity extends Trait {
    private acceleration;
    constructor(acceleration: Point);
    update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
    getName(): string;
}
