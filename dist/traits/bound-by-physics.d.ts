import { Entity, EntityLibrary, Trait } from "..";
import { Vector2 } from "../util/math";
export declare class BoundByPhysics extends Trait {
    private terminalVelocity;
    constructor(terminalVelocity: Vector2);
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    getName(): string;
    protected updateY(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    protected updateX(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
}
