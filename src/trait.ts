import { Entity } from "./entity";

/**
 * Traits define behaviours that entities may exhibit and
 * can define properties/features of an entity.
 * Extend this class to create your own
 * ie. Collidable. BoundByPhysics. Obstacle etc etc
 */
export class Trait {
  protected entity: Entity;

  /**
   * @param entity The entity this trait belongs to
   * @param entityLibrary The other entities this entity may interact with
   */
  constructor(entity: Entity) {
    this.entity = entity;
  }

  /**
   * The update method is called on each animator update cycle.
   * @param deltaTime Time since last update
   */
  public update(deltaTime: number): void {
    return;
  }

  /**
   * This name uniquely identifies the trait "class", and is used for fast retrieval
   * of entities using the entity library
   */
  public getName(): string {
    const instance: any = this.constructor;
    return instance.name;
  }
}
