import { Entity, EntityGraph, Trait } from "..";
import { Point } from "../util/math";

export class BoundByGravity extends Trait {
  private acceleration: Point;
  constructor(acceleration: Point) {
    super();
    this.acceleration = acceleration;
  }

  public update(entity: Entity, entityGraph: EntityGraph, deltaTime: number) {
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
