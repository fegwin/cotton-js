import { EntityLibrary } from "./entity-library";
import { MemoryCanvas } from "./memory-canvas";
import { Trait } from "./trait";
import { BoundingBox, Circle, Polygon, Vector2 } from "./util/math";

export enum EntityType {
  Point = "Point",
  Rectangle = "Rectangle",
  Circle = "Circle",
  Polygon = "Polygon",
}

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 *
 * This entity has no size, it is simply a "point". A point defines it's interactive region.
 */
export abstract class Entity {
  public size: Vector2;
  public bounds: BoundingBox;

  public position: Vector2;
  public velocity: Vector2;
  public acceleration: Vector2;

  protected memoryCanvas: MemoryCanvas;

  private debug: boolean;

  private entityLibrary: EntityLibrary;
  private trait: { [id: string]: Trait };

  private lifetime: number;
  private firstPaintComplete: boolean;

  /**
   *
   * @param pos The initial position of the Entity
   * @param size The initial size of the entity
   * @param traits The traits that the entity may have. (Movable, Explodable etc)
   */
  public constructor(
    position: Vector2,
    entityLibrary: EntityLibrary,
    traits: Trait[] = [],
    debug: boolean = false,
  ) {
    this.debug = debug;

    this.size = new Vector2(1, 1);
    this.position = position;
    this.velocity = new Vector2(0, 0);
    this.acceleration = new Vector2(0, 0);

    this.entityLibrary = entityLibrary;

    this.trait = {};
    this.addTraits(traits);

    this.lifetime = 0;
    this.firstPaintComplete = false;

    this.calculateBounds();
    this.entityLibrary.registerEntity(this);
  }

  public getEntityType(): EntityType {
    return EntityType.Point;
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
   * Retrieves the name of the entity
   */
  public getName(): string {
    const instance: any = this.constructor;
    return instance.name;
  }

  public getHitBox(): any {
    return this.position;
  }

  /**
   * This method will draw the entity onto the MemoryCanvas.
   * Call this whenever you need to update the entity, eg. Animations.
   * Do this inside the update method.
   */
  protected abstract draw(): void;

  /**
   * Calculates the bounding box of the entity drawable/interactive area
   */
  protected calculateBounds() {
    this.memoryCanvas = new MemoryCanvas(this.size.x, this.size.y);
    this.bounds = new BoundingBox(this.position, this.size);
  }
}

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 *
 * This entity has a size and a position. A rectangle defines it's interactive region.
 */
export abstract class RectangleEntity extends Entity {
  constructor(
    position: Vector2,
    size: Vector2,
    entityLibrary: EntityLibrary,
    traits: Trait[] = [],
    debug: boolean,
  ) {
    super(position, entityLibrary, traits, debug);

    this.size = size;
    this.calculateBounds();
  }

  public getEntityType(): EntityType {
    return EntityType.Rectangle;
  }

  public getHitBox() {
    return this.bounds.getPolygon();
  }
}

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 *
 * This entity has a size, position, radius. A cirle defines it's interactive region.
 */
export abstract class CircleEntity extends RectangleEntity {
  public centerPoint: Vector2;
  public radius: number;

  constructor(
    position: Vector2,
    radius: number,
    entityLibrary: EntityLibrary,
    traits: Trait[] = [],
    debug: boolean,
  ) {
    const size = new Vector2(radius * 2, radius * 2);
    super(position, size, entityLibrary, traits, debug);

    this.radius = radius;
    this.centerPoint = new Vector2(position.x + radius, position.y + radius);
  }

  public getEntityType(): EntityType {
    return EntityType.Circle;
  }

  public getHitBox(): any {
    return new Circle(this.position, this.radius);
  }
}

/**
 * Provides the base class to which other entities in the system
 * can implement. This provides the initial implementation
 * to be animated and rendered.
 *
 * This entity has a convex polygon defining it's interactive region
 */
export abstract class PolygonEntity extends RectangleEntity {
  public shape: Polygon;
  private secondPaintComplete: boolean;

  constructor(
    position: Vector2,
    shape: Polygon,
    entityLibrary: EntityLibrary,
    traits: Trait[] = [],
    debug: boolean,
  ) {
    const box = shape.getBoundingBox();
    super(
      position,
      new Vector2(box.right - box.left, box.bottom - box.top),
      entityLibrary,
      traits,
      debug,
    );

    this.shape = shape;
    this.shape.position = position; // Shape to share position with entity

    this.calculateBounds();
  }

  public paintOn(context: CanvasRenderingContext2D): void {
    super.paintOn(context);

    if (this.secondPaintComplete) { return; }

    const memoryCanvasContext = this.memoryCanvas.getContext();
    memoryCanvasContext.strokeStyle = "red";
    memoryCanvasContext.beginPath();
    memoryCanvasContext.moveTo(this.shape.calcPoints[0].x, this.shape.calcPoints[0].y);

    let i = this.shape.calcPoints.length;
    while (i--) {
      memoryCanvasContext.lineTo(this.shape.calcPoints[i].x, this.shape.calcPoints[i].y);
    }

    memoryCanvasContext.closePath();
    memoryCanvasContext.stroke();
  }

  public getEntityType(): EntityType {
    return EntityType.Polygon;
  }

  public getHitBox(): any {
    return this.shape;
  }
}
