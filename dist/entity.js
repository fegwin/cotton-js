"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./util/math");
var buffer_1 = require("./buffer");
var Entity = (function () {
    function Entity(pos, vel, size, traits) {
        if (traits === void 0) { traits = []; }
        this.name = 'entity';
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.lifetime = 0;
        this.firstPaintComplete = false;
        this.calculateBounds();
        this.initialiseTraits(traits);
        this.buffer = new buffer_1.Buffer(this.size.x, this.size.y);
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
    Entity.prototype.paintOn = function (context) {
        if (!this.firstPaintComplete) {
            var debug = false;
            this.draw();
            if (debug) {
                var bufferContext = this.buffer.getContext();
                bufferContext.strokeStyle = 'green';
                bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
                bufferContext.stroke();
            }
        }
        context.drawImage(this.buffer.getCanvas(), (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
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