import { Entity } from ".";
export declare class EntityLibrary {
    private entities;
    private entitiesByTrait;
    constructor();
    getEntitiesByTraitName(traitName: string): Entity[];
    registerEntity(entity: Entity): void;
    deregisterEntity(entity: Entity): void;
}
