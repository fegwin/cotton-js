import { Entity, EntityLibrary, Trait } from "..";
import { Vector2, sign } from "../util/math";

/**
 * This trait applies some simple physics laws to an entity
 */
export class BoundByPhysics extends Trait {
  private terminalVelocity: Vector2;

  /**
   * @param terminalVelocity Max xy velocity the entity may assume
   */
  constructor(terminalVelocity: Vector2) {
    super();
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
  public update(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number) {
    this.updateX(entity, entityLibrary, deltaTime);
    this.updateY(entity, entityLibrary, deltaTime);
  }

  public getName() {
    return "BoundByPhysics";
  }

  protected updateY(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number) {
    // Update velocity
    entity.velocity.y += deltaTime * entity.acceleration.y;

    // Cap out at terminal velocity if required
    if (this.terminalVelocity && Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {

      entity.velocity.y = sign(entity.velocity.y) * this.terminalVelocity.y;
    }

    // Update position
    entity.position.y += deltaTime * entity.velocity.y;
  }

  protected updateX(entity: Entity, entityLibrary: EntityLibrary, deltaTime: number) {
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
