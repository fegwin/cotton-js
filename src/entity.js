import { BoundingBox, Vec } from './util/math';

export default class Entity {
  constructor(traits = []) {
    this.name = 'entity';

    this.traits = traits;
    this.pos = new Vec(0, 0);
    this.vel = new Vec(0, 0);
    this.size = new Vec(0, 0);
    this.lifetime = 0;

    this.calculateBounds();
    this.initialiseTraits();
  }

  initialiseTraits() {
    this.traits.forEach((trait) => {
      this[trait.getName()] = trait;
    });
  }

  calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  draw() {
    throw new Error(`This needs to be implemented by the child class (${this.name})`);
  }

  update(deltaTime) {
    this.traits.forEach(trait => trait.update(this, deltaTime));
    this.lifetime += deltaTime;
  }
}
