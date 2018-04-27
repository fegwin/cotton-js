import { Entity, EntityLibrary, Trait } from "..";
import { Point } from "../util/math";
export declare class BoundByGravity extends Trait {
    private acceleration;
    constructor(acceleration: Point);
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    getName(): string;
}
