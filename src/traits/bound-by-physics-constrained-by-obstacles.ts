import { Entity, EntityLibrary } from "..";
import { BoundingBox, Vector2 } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";

/**
 * This trait applies some simple physics laws to an entity
 * Additionally this trait will prevent the entity from passing through obstacles
 */
export class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
  /**
   * @param terminalVelocity Max xy velocity the entity may assume
   */
  constructor(terminalVelocity: Vector2) {
    super(terminalVelocity);
  }

  /**
   * On each update cycle, we update the position of the entity
   * First the velocity is updated based on the current acceleration
   * Then the velocity is constrained to a terminal velocity (if provided)
   * Then the new position is calculated
   * Finally any collisions are resolved
   * @param entity The entity we are acting on
   * @param entityLibrary The entity library containing other entities we may interact with
   * @param deltaTime Time since the last update cycle
   */
  public update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number) {
    const obstacles = entityLibrary.getEntitiesByTraitName("Obstacle");

    // Process X
    this.updateX(entity, entityLibrary, deltaTime);
    this.resolveCollisionsX(entity, obstacles);

    // Process Y
    this.updateY(entity, entityLibrary, deltaTime);
    this.resolveCollisionsY(entity, obstacles);
  }

  protected resolveCollisionsX(entity: Entity, obstacles: Entity[]) {
    obstacles.forEach((obstacle) => {
      if (!BoundingBox.overlaps(entity.bounds, obstacle.bounds)) { return; }

      const sides = BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // We may have colided with left or right edge
      if (sides.right) {
        // Coming in from the left
        entity.position.x -= entity.bounds.right - obstacle.bounds.left;
      }

      if (sides.left) {
        // Coming in from the right
        entity.position.x += obstacle.bounds.right - entity.bounds.left;
      }
    });
  }

  protected resolveCollisionsY(entity: Entity, obstacles: Entity[]) {
    obstacles.forEach((obstacle) => {
      if (!BoundingBox.overlaps(entity.bounds, obstacle.bounds)) { return; }

      const sides = BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);

      // We may have colided with top or bottom edge
      if (sides.bottom) {
        // Coming in from the top
        entity.position.y -= entity.bounds.bottom - obstacle.bounds.top;
      }

      if (sides.top) {
        // Coming in from the bottom
        entity.position.y += obstacle.bounds.bottom - entity.bounds.top;
      }
    });
  }
}
