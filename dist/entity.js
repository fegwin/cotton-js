import { BoundingBox, Vec } from "./util/math";
export default class Entity {
    constructor(traits = []) {
        this.name = "entity";
        this.pos = new Vec(0, 0);
        this.vel = new Vec(0, 0);
        this.size = new Vec(0, 0);
        this.lifetime = 0;
        this.calculateBounds();
        this.initialiseTraits(traits);
    }
    initialiseTraits(traits) {
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
    update(deltaTime) {
        for (var trait in this.traits) {
            this.traits[trait].update(this, deltaTime);
        }
        this.lifetime += deltaTime;
    }
}
//# sourceMappingURL=entity.js.map