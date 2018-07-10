import { Entity, Trait } from "..";
import { Vector2 } from "../util/math";
export declare class BoundByPhysics extends Trait {
    private terminalVelocity;
    constructor(entity: Entity, terminalVelocity: Vector2);
    update(deltaTime: number): void;
    getName(): string;
    protected updateY(deltaTime: number): void;
    protected updateX(deltaTime: number): void;
}
