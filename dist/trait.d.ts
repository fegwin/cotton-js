import { Entity } from './entity';
export interface Trait {
    update(entity: Entity, deltaTime: number): void;
    getName(): string;
}
