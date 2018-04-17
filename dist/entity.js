"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(pos, vel, size, traits) {
        if (traits === void 0) { traits = []; }
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
    Entity.prototype.initialiseTraits = function (traits) {
        var _this = this;
        traits.forEach(function (trait) {
            _this.traits[trait.getName()] = trait;
        });
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
    };
    Entity.prototype.setup = function () {
        var debug = false;
        this.initialRender(this.bufferContext);
        if (debug) {
            this.bufferContext.strokeStyle = 'green';
            this.bufferContext.rect(0, 0, this.size.x - 1, this.size.y - 1);
            this.bufferContext.stroke();
        }
    };
    Entity.prototype.updateRender = function (bufferContext) { };
    Entity.prototype.drawTo = function (bufferContext) {
        this.updateRender(this.bufferContext);
        bufferContext.drawImage(this.buffer, (0.5 + this.pos.x) << 0, (0.5 + this.pos.y) << 0);
    };
    Entity.prototype.update = function (deltaTime) {
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map