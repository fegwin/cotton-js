import { Entity } from "./entity";
export interface ITrait {
    update(entity: Entity, deltaTime: number): void;
    getName(): string;
}
