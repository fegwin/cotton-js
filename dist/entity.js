"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(traits) {
        if (traits === void 0) { traits = []; }
        this.name = 'entity';
        this.pos = new math_1.Vec(0, 0);
        this.vel = new math_1.Vec(0, 0);
        this.size = new math_1.Vec(0, 0);
        this.lifetime = 0;
        this.calculateBounds();
        this.initialiseTraits(traits);
    }
    Entity.prototype.initialiseTraits = function (traits) {
        var _this = this;
        traits.forEach(function (trait) {
            _this.traits[trait.getName()] = trait;
        });
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
    };
    Entity.prototype.draw = function () {
        throw new Error("This needs to be implemented by the child class (" + this.name + ")");
    };
    Entity.prototype.update = function (deltaTime) {
        for (var trait in this.traits) {
            this.traits[trait].update(this, deltaTime);
        }
        this.lifetime += deltaTime;
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map