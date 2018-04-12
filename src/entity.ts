import { BoundingBox, Vec } from "./util/math";
import Trait from "./trait";

export default abstract class Entity {
  private name: string;
  private traits: { [id: string]: Trait };

  private lifetime: number;
  private size: Vec;
  private vel: Vec;
  private pos: Vec;

  private bounds: BoundingBox;
  private buffer: HTMLCanvasElement;
  private bufferContext: CanvasRenderingContext2D;

  constructor(pos: Vec, vel: Vec, size: Vec, traits: Trait[] = []) {
    this.name = "entity";

    this.pos = pos;
    this.vel = vel;
    this.size = size;

    this.lifetime = 0;

    this.calculateBounds();
    this.initialiseTraits(traits);

    this.buffer = document.createElement("canvas");
    this.buffer.width = this.size.x;
    this.buffer.height = this.size.y;
    this.bufferContext = this.buffer.getContext("2d");
  }

  initialiseTraits(traits: Trait[]): void {
    traits.forEach(trait => {
      this.traits[trait.getName()] = trait;
    });
  }

  addTrait(trait: Trait) {
    this.traits[trait.getName()] = trait;
  }

  removeTrait(trait: Trait) {
    delete this.traits[trait.getName()];
  }

  calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  abstract drawToBuffer: void;

  // Do not override this unless you really know what you are doing
  // This will tank performance if not done right
  // Implement drawToBuffer instead...
  public draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.buffer, this.pos.x, this.pos.y);
  }

  update(deltaTime: number): void {
    for (var trait in this.traits) {
      this.traits[trait].update(this, deltaTime);
    }
    
    this.lifetime += deltaTime;
  }
}
