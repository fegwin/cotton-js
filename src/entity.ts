import { BoundingBox, Vec } from "./util/math";
import Trait from "./Trait";

export default class Entity {
  name: string;
  traits: { [id: string]: Trait }[];

  lifetime: number;
  size: Vec;
  vel: Vec;
  pos: Vec;

  bounds: BoundingBox;

  constructor(traits: Trait[] = []) {
    this.name = "entity";

    this.pos = new Vec(0, 0);
    this.vel = new Vec(0, 0);
    this.size = new Vec(0, 0);

    this.lifetime = 0;

    this.calculateBounds();
    this.initialiseTraits(traits);
  }

  initialiseTraits(traits: Trait[]): void {
    const traitsDic = this.traits;
    traits.forEach(trait => {
      traitsDic[trait.getName()] = trait;
    });
  }

  calculateBounds() {
    this.bounds = new BoundingBox(this.pos, this.size);
  }

  draw() {
    throw new Error(
      `This needs to be implemented by the child class (${this.name})`
    );
  }

  update(deltaTime: number) {
    this.traits.forEach(trait => trait.update(this, deltaTime));
    this.lifetime += deltaTime;
  }
}
