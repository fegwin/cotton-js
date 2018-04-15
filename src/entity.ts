import { BoundingBox, Vec } from './util/math';
import { Trait } from './trait';

export abstract class Entity {
  private name: string;
  private traits: { [id: string]: Trait };

  private lifetime: number;
  private size: Vec;
  private vel: Vec;
  private pos: Vec;

  public bounds: BoundingBox;

  private bufferContext: CanvasRenderingContext2D;
  private buffer: HTMLCanvasElement;

  public constructor(pos: Vec, vel: Vec, size: Vec, traits: Trait[] = []) {
    this.name = 'entity';

    this.pos = pos;
    this.vel = vel;
    this.size = size;

    this.lifetime = 0;

    this.calculateBounds();
    this.initialiseTraits(traits);

    this.buffer = document.createElement('canvas');
    this.buffer.width = this.size.x;
    this.buffer.height = this.size.y;

    this.bufferContext = this.buffer.getContext('2d');
  }

  private initialiseTraits(traits: Trait[]): void {
    traits.forEach(trait => {
      this.traits[trait.getName()] = trait;
    });
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  // not too sure about this.
  // kinda sucks that you need a setup method,
  // but its to avoid having to call initial render in every
  // derived class's constructor.
  public setup() {
    // gives you a nice little box around your entity
    // to see whats going on.
    var debug = false;

    this.initialRender(this.bufferContext);

    if (debug) {
      this.bufferContext.strokeStyle = 'green';
      this.bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
      this.bufferContext.stroke();
    }
  }

  protected abstract initialRender(bufferContext: CanvasRenderingContext2D): void;
  protected updateRender(bufferContext: CanvasRenderingContext2D): void {}

  public drawTo(bufferContext: CanvasRenderingContext2D): void {
    this.updateRender(this.bufferContext);
    // since we're going for performance here, (0.5 + this.pos.x) << 0 is the faster
    // equivalent of math.round. we're making sure the value is an integer,
    // so do avoid sub pixel rendering.
    bufferContext.drawImage(this.buffer, (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
  }

  update(deltaTime: number): void {
    for (var trait in this.traits) {
      this.traits[trait].update(this, deltaTime);
    }
    this.lifetime += deltaTime;
  }
}
