import { Entity } from ".";
import { ITrait } from "./trait";
export declare class EntityGraph {
    private entities;
    private entitiesByTrait;
    constructor();
    getEntitiesByTraits(trait: ITrait): Entity[];
    getEntitiesByTraitName(traitName: string): Entity[];
    registerEntity(entity: Entity): void;
    deregisterEntity(entity: Entity): void;
}
