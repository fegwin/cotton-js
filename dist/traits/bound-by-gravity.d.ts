import { Entity, EntityLibrary, Trait } from "..";
import { Vector2 } from "../util/math";
export declare class BoundByGravity extends Trait {
    private acceleration;
    constructor(acceleration: Vector2);
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    getName(): string;
}
