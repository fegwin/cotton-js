import { Entity, EntityLibrary } from "..";
import { Vector2 } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";
export declare class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
    constructor(terminalVelocity: Vector2);
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    protected resolveCollisionsX(entity: Entity, obstacles: Entity[]): void;
    protected resolveCollisionsY(entity: Entity, obstacles: Entity[]): void;
}
