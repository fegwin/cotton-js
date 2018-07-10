import { Entity } from "..";
import { Vector2 } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";
export declare class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
    private collider;
    constructor(entity: Entity, terminalVelocity: Vector2);
    update(deltaTime: number): void;
    protected resolveCollisions(resolveX: boolean, resolveY: boolean): void;
}
