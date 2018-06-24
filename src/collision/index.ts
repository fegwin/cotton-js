import { Entity } from "..";
import { BoundingBox, ISides } from "../util/math";

export interface ICollision {
  entity: Entity;
}

export interface ICollider {
  detectCollisions(): ICollision[];
}

export class AABBCollision implements ICollision {
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

export const detectCollisionsAABB = (
  entity: Entity,
  collidableEntityTraits: string[],
): AABBCollision[] => {
  const collidableEntities = entity
    .getEntityLibrary()
    .getEntitiesByTraitNames(collidableEntityTraits.map((trait) => trait));

  const collisions: AABBCollision[] = [];

  collidableEntities.forEach((testEntity) => {
    if (entity === testEntity) { return; }
    if (!BoundingBox.overlaps(entity.bounds, testEntity.bounds)) { return; }

    collisions.push(new AABBCollision(
      testEntity,
      BoundingBox.getOverlappingSides(entity.bounds, testEntity.bounds)),
    );
  });

  return collisions;
};

export class SATCollision implements ICollision {
  public entity: Entity;
  // public boundingBox

  /**
   * @param entity Entity collided with
   */
  constructor(entity: Entity) {
    this.entity = entity;
  }
}

export const detectCollisionsSAT = (
  entity: Entity,
  collidableEntityTraits: string[],
): SATCollision[] => {
  const collidableEntities = entity
    .getEntityLibrary()
    .getEntitiesByTraitNames(collidableEntityTraits.map((trait) => trait));

  const collisions: SATCollision[] = [];

  collidableEntities.forEach((testEntity) => {
    if (entity === testEntity) { return; }
    if (!BoundingBox.overlaps(entity.bounds, testEntity.bounds)) { return; }


  });

  return collisions;
};
