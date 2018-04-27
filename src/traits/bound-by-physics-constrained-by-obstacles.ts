import { Entity, EntityGraph } from "..";
import { BoundingBox, Point } from "../util/math";
import { BoundByPhysics } from "./bound-by-physics";

export class BoundByPhysicsConstrainedByObstacles extends BoundByPhysics {
  constructor(terminalVelocity: Point) {
    super(terminalVelocity);
  }

  public update(entity: Entity, entityGraph: EntityGraph, deltaTime: number) {
    const obstacles = entityGraph.getEntitiesByTraitName("Obstacle");

    // Process X
    this.updateX(entity, entityGraph, deltaTime);
    this.applyObstacleCollisionResolutionX(entity, obstacles);

    // Process Y
    this.updateY(entity, entityGraph, deltaTime);
    this.applyObstacleCollisionResolutionY(entity, obstacles);
  }

  protected applyObstacleCollisionResolutionX(entity: Entity, obstacles: Entity[]) {
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

  protected applyObstacleCollisionResolutionY(entity: Entity, obstacles: Entity[]) {
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
