import { Buffer } from "./buffer";
import { EntityGraph } from "./entity-graph";
import { Trait } from "./trait";
import { BoundingBox, Point } from "./util/math";

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 */
export abstract class Entity {
  public bounds: BoundingBox;
  public position: Point;
  public acceleration: Point;

  private name: string;
  private debug: boolean;

  private entityGraph: EntityGraph;
  private traits: Trait[];
  private trait: { [id: string]: Trait };

  private lifetime: number;
  private firstPaintComplete: boolean;

  private size: Point;

  private buffer: Buffer;

  /**
   *
   * @param pos The initial position of the Entity.
   * @param vel The initial velocity of the Entity
   * @param size The initial size of the entity
   * @param traits The traits that the entity may have. (Movable, Explodable etc)
   */
  public constructor(
    position: Point,
    size: Point,
    entityGraph: EntityGraph,
    traits: Trait[] = [],
    debug: boolean = false,
  ) {
    this.name = "entity";
    this.debug = debug;

    this.position = position;
    this.size = size;

    this.entityGraph = entityGraph;
    this.traits = traits;

    this.trait = {};
    this.traits.forEach((trait) => {
      this.trait[trait.getName()] = trait;
    });

    this.lifetime = 0;
    this.firstPaintComplete = false;

    this.calculateBounds();

    this.buffer = new Buffer(this.size.x, this.size.y);
    this.entityGraph.registerEntity(this);
  }

 /**
  * This method is used to paint the buffer canvas onto a passed in canvas context
  * General use will not require you to call this
  * This is taken care of by the animation engine
  * TODO try and hide this from the api AL 2018
  */
  public paintOn(context: CanvasRenderingContext2D): void {
    // Lazily trigger the first draw
    if (!this.firstPaintComplete) {
      this.draw();

      // gives you a nice little box around your entity
      // to see whats going on.
      if (this.debug) {
        const bufferContext = this.buffer.getContext();
        bufferContext.strokeStyle = "green";
        bufferContext.rect(0, 0, this.size.x, this.size.y);
        bufferContext.stroke();
      }

      this.firstPaintComplete = true;
    }

   /**
    * since we're going for performance here, (0.5 + this.pos.x) << 0 is the faster
    * equivalent of math.round. we're making sure the value is an integer,
    * so do avoid sub pixel rendering.
    */
    context.drawImage(
      this.buffer.getCanvas(),
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.position.x) << 0,
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.position.y) << 0,
    );
  }

  /**
   * This method is where you should do your calculations.
   * Your traits will be updated for you.
   * @param deltaTime How many times a second to update
   */
  public update(deltaTime: number): void {
    for (const trait of this.traits) {
      trait.update(this, this.entityGraph, deltaTime);
    }

    this.lifetime += deltaTime;
  }

  /**
   * This method returns all the traits implemented by the entity
   */
  public getTraits(): Trait[] {
    return this.traits;
  }

  /**
   * This method will draw the entity onto the buffer.
   * Call this whenever you need to update the entity, eg. Animations.
   * Do this inside the update method.
   */
  protected abstract draw(): void;

  private calculateBounds() {
    this.bounds = new BoundingBox(this.position, this.size);
  }
}
