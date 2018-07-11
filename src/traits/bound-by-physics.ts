import { Entity, Trait } from "..";
import { sign, Vector2 } from "../util/math";

/**
 * This trait applies some simple physics laws to an entity
 */
export class BoundByPhysics extends Trait {
  private terminalVelocity: Vector2;

  /**
   * @param terminalVelocity Max xy velocity the entity may assume
   */
  constructor(entity: Entity, terminalVelocity: Vector2) {
    super(entity);
    this.terminalVelocity = terminalVelocity;
  }

  /**
   * On each update cycle, we update the position of the entity
   * First the velocity is updated based on the current acceleration
   * Then the velocity is constrained to a terminal velocity (if provided)
   * Then the new position is calculated
   * @param entity The entity we are acting on
   * @param entityLibrary The entity library containing other entities we may interact with
   * @param deltaTime Time since the last update cycle
   */
  public update(deltaTime: number) {
    this.updateX(deltaTime);
    this.updateY(deltaTime);
  }

  public getName() {
    return "BoundByPhysics";
  }

  protected updateY(deltaTime: number) {
    // Update velocity
    this.entity.velocity.y += deltaTime * this.entity.acceleration.y;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(this.entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {

      this.entity.velocity.y = sign(this.entity.velocity.y) * this.terminalVelocity.y;
    }

    // Update position
    this.entity.position.y += deltaTime * this.entity.velocity.y;
  }

  protected updateX(deltaTime: number) {
    // Update velocity
    this.entity.velocity.x += deltaTime * this.entity.acceleration.x;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(this.entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) {
      this.entity.velocity.x = sign(this.entity.velocity.x) * this.terminalVelocity.x;
    }

    // Update position
    this.entity.position.x += deltaTime * this.entity.velocity.x;
  }
}
