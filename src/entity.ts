import { EntityLibrary } from "./entity-library";
import { MemoryCanvas } from "./memory-canvas";
import { Trait } from "./trait";
import { BoundingBox, Vector2 } from "./util/math";

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 */
export abstract class Entity {
  public bounds: BoundingBox;

  public position: Vector2;
  public velocity: Vector2;
  public acceleration: Vector2;

  private debug: boolean;

  private entityLibrary: EntityLibrary;
  private trait: { [id: string]: Trait };

  private lifetime: number;
  private firstPaintComplete: boolean;

  private size: Vector2;

  private memoryCanvas: MemoryCanvas;

  /**
   *
   * @param pos The initial position of the Entity
   * @param size The initial size of the entity
   * @param traits The traits that the entity may have. (Movable, Explodable etc)
   */
  public constructor(
    position: Vector2,
    size: Vector2,
    entityLibrary: EntityLibrary,
    traits: Trait[] = [],
    debug: boolean = false,
  ) {
    this.debug = debug;

    this.position = position;
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);
    this.size = size;

    this.entityLibrary = entityLibrary;

    this.trait = {};
    this.addTraits(traits);

    this.lifetime = 0;
    this.firstPaintComplete = false;

    this.calculateBounds();

    this.memoryCanvas = new MemoryCanvas(this.size.x, this.size.y);
    this.entityLibrary.registerEntity(this);
  }

 /**
  * This method is used to paint the MemoryCanvas canvas onto a passed in canvas context
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
        const memoryCanvasContext = this.memoryCanvas.getContext();
        memoryCanvasContext.strokeStyle = "green";
        memoryCanvasContext.rect(0, 0, this.size.x, this.size.y);
        memoryCanvasContext.stroke();
      }

      this.firstPaintComplete = true;
    }

   /**
    * since we're going for performance here, (0.5 + this.pos.x) << 0 is the faster
    * equivalent of math.round. we're making sure the value is an integer,
    * so do avoid sub pixel rendering.
    */
    context.drawImage(
      this.memoryCanvas.getCanvas(),
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.position.x) << 0,
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.position.y) << 0,
    );
  }

  /**
   * This method is where you should do your calculations.
   * Your traits will be updated for you.
   * @param deltaTime Time since the last update cycle
   */
  public update(deltaTime: number): void {
    for (const trait of this.getTraits()) {
      trait.update(deltaTime);
    }

    this.lifetime += deltaTime;
  }

  /**
   * Adds a trait to the entity
   * @param trait Trait to add
   */
  public addTrait(trait: Trait) {
    this.addTraits([trait]);
  }

  /**
   * Adds traits to the entity
   * @param traits Traits to add
   */
  public addTraits(traits: Trait[]) {
    traits.forEach((trait) => {
      this.trait[trait.getName()] = trait;
    });

    this.entityLibrary.updateEntity(this);
  }

  /**
   * Removes trait from the entity
   * @param trait Name of trait to remove
   */
  public removeTrait(trait: string) {
    if (!this.trait[trait]) { return; }

    delete this.trait[trait];

    this.entityLibrary.updateEntity(this);
  }

  /**
   * This method returns all the traits implemented by the entity
   */
  public getTraits(): Trait[] {
    const traits: Trait[] = [];

    Object.keys(this.trait).forEach((trait) => traits.push(this.trait[trait]));

    return traits;
  }

  /**
   * Returns the EntityLibrary this Entity belongs to
   */
  public getEntityLibrary(): EntityLibrary {
    return this.entityLibrary;
  }

  /**
   * Returns the Memory canvas for the current entity
   */
  public getMemoryCanvas(): MemoryCanvas {
    return this.memoryCanvas;
  }

  /**
   * Retrieves the name of the entity
   */
  public getName(): string {
    const instance: any = this.constructor;
    return instance.name;
  }

  /**
   * This method will draw the entity onto the MemoryCanvas.
   * Call this whenever you need to update the entity, eg. Animations.
   * Do this inside the update method.
   */
  protected abstract draw(): void;

  /**
   * Calculates the AABB bounding box of the entity
   */
  private calculateBounds() {
    this.bounds = new BoundingBox(this.position, this.size);
  }
}
