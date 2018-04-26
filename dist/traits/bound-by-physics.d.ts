import { Entity, EntityGraph, Trait } from "..";
import { Point } from "../util/math";
export declare class BoundByPhysics extends Trait {
    private terminalVelocity;
    constructor(terminalVelocity: Point);
    setPhysicsDefaults(entity: Entity): void;
    update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
    getName(): string;
    protected updateY(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
    protected updateX(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
}
