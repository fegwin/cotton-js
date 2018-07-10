import { Entity } from ".";
export declare class EntityLibrary {
    private entities;
    private entitiesByTrait;
    constructor();
    getEntitiesByTraitNames(traitNames: string[]): Entity[];
    getEntitiesByTraitName(traitName: string): Entity[];
    updateEntity(entity: Entity): void;
    registerEntity(entity: Entity): void;
    deregisterEntity(entity: Entity): void;
}
