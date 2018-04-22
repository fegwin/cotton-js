import { Entity } from "./entity";
import { EntityGraph } from "./entity-graph";

export abstract class Trait {
  public update(entity: Entity, entityGraph: EntityGraph, deltaTime: number): void {
    return;
  }
  public abstract getName(): string;
}
