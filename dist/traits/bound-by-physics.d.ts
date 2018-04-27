import { Entity, EntityLibrary, Trait } from "..";
import { Point } from "../util/math";
export declare class BoundByPhysics extends Trait {
    private terminalVelocity;
    constructor(terminalVelocity: Point);
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    getName(): string;
    protected updateY(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    protected updateX(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
}
