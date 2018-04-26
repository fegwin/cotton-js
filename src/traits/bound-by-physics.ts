import { Entity, EntityGraph, Trait } from "..";
import { Point, sign } from "../util/math";

export class BoundByPhysics extends Trait {
  private terminalVelocity: Point;

  constructor(terminalVelocity: Point) {
    super();
    this.terminalVelocity = terminalVelocity;
  }

  public update(entity: Entity, entityGraph: EntityGraph, deltaTime: number) {
    this.updateX(entity, entityGraph, deltaTime);
    this.updateY(entity, entityGraph, deltaTime);
  }

  public getName() {
    return "BoundByPhysics";
  }

  protected updateY(entity: Entity, entityGraph: EntityGraph, deltaTime: number) {
    // Update velocity
    entity.velocity.y += deltaTime * entity.acceleration.y;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {

      entity.velocity.y = sign(entity.velocity.y) * this.terminalVelocity.y;
    }

    // Update position
    entity.position.y += deltaTime * entity.velocity.y;
  }

  protected updateX(entity: Entity, entityGraph: EntityGraph, deltaTime: number) {
    // Update velocity
    entity.velocity.x += deltaTime * entity.acceleration.x;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) {
      entity.velocity.x = sign(entity.velocity.x) * this.terminalVelocity.x;
    }

    // Update position
    entity.position.x += deltaTime * entity.velocity.x;
  }
}
