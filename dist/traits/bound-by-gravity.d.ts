import { Entity, Trait } from "..";
import { Vector2 } from "../util/math";
export declare class BoundByGravity extends Trait {
    private acceleration;
    constructor(entity: Entity, acceleration: Vector2);
    update(deltaTime: number): void;
    getName(): string;
}
