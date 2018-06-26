import { Entity } from "..";
import { AABBCollision, detectCollisionsAABB } from "../collision";
import { Vector2 } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";

/**
 * This trait applies some simple physics laws to an entity
 * Additionally this trait will prevent the entity from passing through obstacles
 */
export class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
  /**
   * @param terminalVelocity Max xy velocity the entity may assume
   */
  constructor(entity: Entity, terminalVelocity: Vector2) {
    super(entity, terminalVelocity);
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
  public update(deltaTime: number) {
    // Process X
    this.updateX(deltaTime);
    this.resolveCollisions(true, false);

    // Process Y
    this.updateY(deltaTime);
    this.resolveCollisions(false, true);
  }

  protected resolveCollisions(resolveX: boolean, resolveY: boolean) {
    const collisionStrategy = detectCollisionsAABB;
    const collisions = collisionStrategy(this.entity, ["Obstacle"]) as AABBCollision[];

    collisions.forEach((collision) => {
      if (resolveX) {
        // We may have colided with left or right edge
        if (collision.sides.right) {
          // Coming in from the left
          this.entity.position.x -= this.entity.bounds.right - collision.entity.bounds.left;
        }

        if (collision.sides.left) {
          // Coming in from the right
          this.entity.position.x += collision.entity.bounds.right - this.entity.bounds.left;
        }
      }

      if (resolveY) {
        // We may have colided with top or bottom edge
        if (collision.sides.bottom) {
          // Coming in from the top
          this.entity.position.y -= this.entity.bounds.bottom - collision.entity.bounds.top;
        }

        if (collision.sides.top) {
          // Coming in from the bottom
          this.entity.position.y += collision.entity.bounds.bottom - this.entity.bounds.top;
        }
      }
    });
  }
}
