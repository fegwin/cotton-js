import { Entity, EntityLibrary } from "..";
import { BoundingBox, ISides } from "../util/math";

export class AABBCollision {
  public entity: Entity;
  public sides: ISides;
  /**
   * @param entity Entity collided with
   * @param sides Sides that have collided
   */
  constructor(entity: Entity, sides: ISides) {
    this.entity = entity;
    this.sides = sides;
  }
}

export class AABBCollider {
  private collidableEntityTraits: string[];
  private entity: Entity;

  /**
   * @param collidableEntityTraits Entities with the following traits will be collided with
   */
  constructor(
    entity: Entity,
    collidableEntityTraits: string[]) {
    this.entity = entity;
    this.collidableEntityTraits = collidableEntityTraits;
  }

  public detectCollisions(): AABBCollision[] {
    const collidableEntities = this.entity
      .getEntityLibrary()
      .getEntitiesByTraitNames(this.collidableEntityTraits.map((trait) => trait));

    const collisions: AABBCollision[] = [];

    collidableEntities.forEach((testEntity) => {
      if (this.entity === testEntity) { return; }
      if (!BoundingBox.overlaps(this.entity.bounds, testEntity.bounds)) { return; }

      collisions.push(new AABBCollision(
        testEntity,
        BoundingBox.getOverlappingSides(this.entity.bounds, testEntity.bounds)),
      );
    });

    return collisions;
  }
}
