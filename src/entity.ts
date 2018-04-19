import { Buffer } from "./buffer";
import { ITrait } from "./trait";
import { BoundingBox, Point } from "./util/math";

export abstract class Entity {
  public bounds: BoundingBox;

  private name: string;
  private traits: { [id: string]: ITrait };

  private lifetime: number;
  private firstPaintComplete: boolean;

  private size: Point;
  private vel: Point;
  private pos: Point;

  private buffer: Buffer;

  public constructor(
    pos: Point,
    vel: Point,
    size: Point,
    traits: ITrait[] = [],
  ) {
    this.name = "entity";

    this.pos = pos;
    this.vel = vel;
    this.size = size;

    this.lifetime = 0;
    this.firstPaintComplete = false;

    this.calculateBounds();
    this.initialiseTraits(traits);

    this.buffer = new Buffer(this.size.x, this.size.y);
  }

  // This method is used to paint the buffer canvas onto a passed in canvas context
  // General use will not require you to call this
  // This is taken care of by the animation engine
  // TODO try and hide this from the api AL 2018
  public paintOn(context: CanvasRenderingContext2D): void {
    // Lazily trigger the first draw
    if (!this.firstPaintComplete) {
      // gives you a nice little box around your entity
      // to see whats going on.
      const debug = false;

      this.draw();

      if (debug) {
        const bufferContext = this.buffer.getContext();
        bufferContext.strokeStyle = "green";
        bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
        bufferContext.stroke();
      }

      this.firstPaintComplete = true;
    }

    // since we're going for performance here, (0.5 + this.pos.x) << 0 is the faster
    // equivalent of math.round. we're making sure the value is an integer,
    // so do avoid sub pixel rendering.
    context.drawImage(
      this.buffer.getCanvas(),
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.pos.x) << 0,
      // tslint:disable-next-line:no-bitwise
      (0.5 + this.pos.y) << 0,
    );
  }

  // This method is where you should do your calculations
  // Call super. Your traits will be updated for you
  public update(deltaTime: number): void {

    for (const trait of Object.keys(this.traits)) {
      this.traits[trait].update(this, deltaTime);
    }

    this.lifetime += deltaTime;
  }

  // This method will draw the entity onto the buffer
  // Call this whenever you need to update the entity
  //
  // eg. Animations. Do this inside the update method
  protected abstract draw(): void;

  private initialiseTraits(traits: ITrait[]): void {
    traits.forEach((trait) => {
      this.traits[trait.getName()] = trait;
    });
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }
}
