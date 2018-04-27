import { Entity } from "./entity";
import { EntityLibrary } from "./entity-library";
export declare abstract class Trait {
    update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void;
    abstract getName(): string;
}
