import { Entity } from "./entity";
import { EntityGraph } from "./entity-graph";
export declare abstract class Trait {
    update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
    abstract getName(): string;
}
