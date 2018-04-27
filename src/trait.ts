import { Entity } from "./entity";
import { EntityLibrary } from "./entity-library";

/**
 * Traits define behaviours that entities may exhibit and
 * can define properties/features of an entity.
 * Extend this class to create your own
 * ie. Collidable. BoundByPhysics. Obstacle etc etc
 */
export abstract class Trait {
  /**
   * The update method is called on each animator update cycle.
   * @param entity The entity this trait belongs to
   * @param entityLibrary The other entities this entity may interact with
   * @param deltaTime Time since last update
   */
  public update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number): void {
    return;
  }

  /**
   * This name uniquely identifies the trait, and is used for fast retrieval
   * of entities using the entity graph
   */
  public abstract getName(): string;
}
