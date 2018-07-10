import { Entity } from "./entity";
export declare class Trait {
    protected entity: Entity;
    constructor(entity: Entity);
    update(deltaTime: number): void;
    getName(): string;
}
