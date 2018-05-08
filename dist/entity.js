"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(position, size, entityLibrary, traits, debug) {
        if (traits === void 0) { traits = []; }
        if (debug === void 0) { debug = false; }
        var _this = this;
        this.name = "entity";
        this.debug = debug;
        this.position = position;
        this.velocity = new math_1.Vector2(0, 0);
        this.acceleration = new math_1.Vector2(0, 0);
        this.size = size;
        this.entityLibrary = entityLibrary;
        this.trait = {};
        traits.forEach(function (trait) {
            _this.trait[trait.getName()] = trait;
        });
        this.lifetime = 0;
        this.firstPaintComplete = false;
        this.calculateBounds();
        this.buffer = new buffer_1.Buffer(this.size.x, this.size.y);
        this.entityLibrary.registerEntity(this);
    }
    Entity.prototype.paintOn = function (context) {
        if (!this.firstPaintComplete) {
            this.draw();
            if (this.debug) {
                var bufferContext = this.buffer.getContext();
                bufferContext.strokeStyle = "green";
                bufferContext.rect(0, 0, this.size.x, this.size.y);
                bufferContext.stroke();
            }
            this.firstPaintComplete = true;
        }
        context.drawImage(this.buffer.getCanvas(), (0.5 + this.position.x) << 0, (0.5 + this.position.y) << 0);
    };
    Entity.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.getTraits(); _i < _a.length; _i++) {
            var trait = _a[_i];
            trait.update(this, this.entityLibrary, deltaTime);
        }
        this.lifetime += deltaTime;
    };
    Entity.prototype.getTraits = function () {
        var _this = this;
        var traits = [];
        Object.keys(this.trait).forEach(function (trait) { return traits.push(_this.trait[trait]); });
        return traits;
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.position, this.size);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map