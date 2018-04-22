import { Entity } from ".";
import { Trait } from "./trait";
export declare class EntityGraph {
    private entities;
    private entitiesByTrait;
    constructor();
    getEntitiesByTraits(trait: Trait): Entity[];
    getEntitiesByTraitName(traitName: string): Entity[];
    registerEntity(entity: Entity): void;
    deregisterEntity(entity: Entity): void;
}
