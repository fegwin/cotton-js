"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(pos, vel, size, traits, debug) {
        if (traits === void 0) { traits = []; }
        if (debug === void 0) { debug = false; }
        this.name = "entity";
        this.pos = pos;
        this.vel = vel;
        this.size = size;
        this.traits = {};
        this.lifetime = 0;
        this.firstPaintComplete = false;
        this.calculateBounds();
        this.initialiseTraits(traits);
        this.buffer = new buffer_1.Buffer(this.size.x, this.size.y);
    }
    Entity.prototype.paintOn = function (context) {
        if (!this.firstPaintComplete) {
            this.draw();
            if (this.debug) {
                var bufferContext = this.buffer.getContext();
                bufferContext.strokeStyle = "green";
                bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
                bufferContext.stroke();
            }
            this.firstPaintComplete = true;
        }
        context.drawImage(this.buffer.getCanvas(), (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
    };
    Entity.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = Object.keys(this.traits); _i < _a.length; _i++) {
            var trait = _a[_i];
            this.traits[trait].update(this, deltaTime);
        }
        this.lifetime += deltaTime;
    };
    Entity.prototype.initialiseTraits = function (traits) {
        var _this = this;
        traits.forEach(function (trait) {
            _this.traits[trait.getName()] = trait;
        });
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map