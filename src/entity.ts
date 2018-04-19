import { BoundingBox, Point } from './util/math';
import { Trait } from './trait';
import { Buffer } from './buffer';

export abstract class Entity {
  private name: string;
  private debug: boolean;
  private traits: { [id: string]: Trait };

  private lifetime: number;
  private firstPaintComplete: boolean;

  private size: Point;
  private vel: Point;
  private pos: Point;

  public bounds: BoundingBox;

  private buffer: Buffer;

  public constructor(pos: Point, vel: Point, size: Point, traits: Trait[] = [], debug: boolean = false) {
    this.name = 'entity';
    this.debug = debug;

    this.pos = pos;
    this.vel = vel;
    this.size = size;

    this.lifetime = 0;
    this.firstPaintComplete = false;

    this.calculateBounds();
    this.initialiseTraits(traits);

    this.buffer = new Buffer(this.size.x, this.size.y);
  }

  private initialiseTraits(traits: Trait[]): void {
    traits.forEach(trait => {
      this.traits[trait.getName()] = trait;
    });
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  // This method will draw the entity onto the buffer
  // Call this whenever you need to update the entity
  //
  // eg. Animations. Do this inside the update method
  protected abstract draw(): void;

  // This method is used to paint the buffer canvas onto a passed in canvas context
  // General use will not require you to call this
  // This is taken care of by the animation engine
  // TODO try and hide this from the api AL 2018
  public paintOn(context: CanvasRenderingContext2D): void {
    // Lazily trigger the first draw
    if (!this.firstPaintComplete) {
      this.draw();

      // gives you a nice little box around your entity
      // to see whats going on.
      if (this.debug) {
        const bufferContext = this.buffer.getContext();
        bufferContext.strokeStyle = 'green';
        bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
        bufferContext.stroke();
      }

      this.firstPaintComplete = true;
    }
    
    // since we're going for performance here, (0.5 + this.pos.x) << 0 is the faster
    // equivalent of math.round. we're making sure the value is an integer,
    // so do avoid sub pixel rendering.
    context.drawImage(this.buffer.getCanvas(), (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
  }

  // This method is where you should do your calculations
  // Call super. Your traits will be updated for you
  public update(deltaTime: number): void {
    for (var trait in this.traits) {
      this.traits[trait].update(this, deltaTime);
    }
    this.lifetime += deltaTime;
  }
}
