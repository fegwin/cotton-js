import { Entity, EntityGraph } from "..";
import { Point } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";
export declare class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
    constructor(terminalVelocity: Point);
    update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
    protected applyObstacleCollisionResolutionX(entity: Entity, obstacles: Entity[]): void;
    protected applyObstacleCollisionResolutionY(entity: Entity, obstacles: Entity[]): void;
}
