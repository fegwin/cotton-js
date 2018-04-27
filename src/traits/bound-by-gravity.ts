import { Entity, EntityLibrary, Trait } from "..";
import { Point } from "../util/math";

/**
 * This trait bounds an entity to a fake gravitational pull
 * (acceleration...)
 * Because this is a fake world, we can do x and y axis gravity
 * Yew
 */
export class BoundByGravity extends Trait {
  private acceleration: Point;
  constructor(acceleration: Point) {
    super();
    this.acceleration = acceleration;
  }

  /**
   * On each update cycle, a constant acceleration will be applied.
   * @param entity The entity to apply gravity to
   * @param entityLibrary Entity Library containing other entities we may interact with
   * @param deltaTime Time since the last update
   */
  public update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number) {
    if (!entity.acceleration) {
      entity.acceleration = new Point(0, 0);
    }

    entity.acceleration.y = this.acceleration.y;
    entity.acceleration.x = this.acceleration.x;
  }

  public getName(): string {
    return "BoundByGravity";
  }
}
