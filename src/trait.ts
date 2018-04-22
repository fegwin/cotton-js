import { Entity } from "./entity";
import { EntityGraph } from "./entity-graph";

export abstract class Trait {
  public abstract update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void;
  public abstract getName(): string;
}
