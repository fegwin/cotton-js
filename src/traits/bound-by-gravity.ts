import { Entity, Trait } from "..";
import { Vector2 } from "../util/math";

/**
 * This trait bounds an entity to a fake gravitational pull
 * (acceleration...)
 * Because this is a fake world, we can do x and y axis gravity
 * Yew
 */
export class BoundByGravity extends Trait {
  private acceleration: Vector2;
  constructor(entity: Entity, acceleration: Vector2) {
    super(entity);
    this.acceleration = acceleration;
  }

  /**
   * On each update cycle, a constant acceleration will be applied.
   * @param deltaTime Time since the last update
   */
  public update(deltaTime: number) {
    if (!this.entity.acceleration) {
      this.entity.acceleration = new Vector2(0, 0);
    }

    this.entity.acceleration.y = this.acceleration.y;
    this.entity.acceleration.x = this.acceleration.x;
  }

  public getName(): string {
    return "BoundByGravity";
  }
}
