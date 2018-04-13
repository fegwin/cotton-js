"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("./util/math");
class Entity {
    constructor(traits = []) {
        this.name = "entity";
        this.pos = new math_1.Vec(0, 0);
        this.vel = new math_1.Vec(0, 0);
        this.size = new math_1.Vec(0, 0);
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
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
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
exports.default = Entity;
//# sourceMappingURL=entity.js.map