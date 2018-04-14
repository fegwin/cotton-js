import { BoundingBox, Vec } from './util/math';
import { Trait } from './trait';

export class Entity {
  name: string;
  traits: { [id: string]: Trait };

  lifetime: number;
  size: Vec;
  vel: Vec;
  pos: Vec;

  bounds: BoundingBox;

  constructor(traits: Trait[] = []) {
    this.name = 'entity';

    this.pos = new Vec(0, 0);
    this.vel = new Vec(0, 0);
    this.size = new Vec(0, 0);

    this.lifetime = 0;

    this.calculateBounds();
    this.initialiseTraits(traits);
  }

  initialiseTraits(traits: Trait[]): void {
    traits.forEach(trait => {
      this.traits[trait.getName()] = trait;
    });
  }

  calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  draw() {
    throw new Error(`This needs to be implemented by the child class (${this.name})`);
  }

  update(deltaTime: number) {
    for (var trait in this.traits) {
      this.traits[trait].update(this, deltaTime);
    }
    this.lifetime += deltaTime;
  }
}
