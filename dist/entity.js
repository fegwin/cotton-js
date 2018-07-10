"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memory_canvas_1 = require("./memory-canvas");
var math_1 = require("./util/math");
var Entity = (function () {
    function Entity(position, size, entityLibrary, traits, debug) {
        if (traits === void 0) { traits = []; }
        if (debug === void 0) { debug = false; }
        this.debug = debug;
        this.position = position;
        this.velocity = new math_1.Vector2(0, 0);
        this.acceleration = new math_1.Vector2(0, 0);
        this.size = size;
        this.entityLibrary = entityLibrary;
        this.trait = {};
        this.addTraits(traits);
        this.lifetime = 0;
        this.firstPaintComplete = false;
        this.calculateBounds();
        this.memoryCanvas = new memory_canvas_1.MemoryCanvas(this.size.x, this.size.y);
        this.entityLibrary.registerEntity(this);
    }
    Entity.prototype.paintOn = function (context) {
        if (!this.firstPaintComplete) {
            this.draw();
            if (this.debug) {
                var memoryCanvasContext = this.memoryCanvas.getContext();
                memoryCanvasContext.strokeStyle = "green";
                memoryCanvasContext.rect(0, 0, this.size.x, this.size.y);
                memoryCanvasContext.stroke();
            }
            this.firstPaintComplete = true;
        }
        context.drawImage(this.memoryCanvas.getCanvas(), (0.5 + this.position.x) << 0, (0.5 + this.position.y) << 0);
    };
    Entity.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.getTraits(); _i < _a.length; _i++) {
            var trait = _a[_i];
            trait.update(deltaTime);
        }
        this.lifetime += deltaTime;
    };
    Entity.prototype.addTrait = function (trait) {
        this.addTraits([trait]);
    };
    Entity.prototype.addTraits = function (traits) {
        var _this = this;
        traits.forEach(function (trait) {
            _this.trait[trait.getName()] = trait;
        });
        this.entityLibrary.updateEntity(this);
    };
    Entity.prototype.removeTrait = function (trait) {
        if (!this.trait[trait]) {
            return;
        }
        delete this.trait[trait];
        this.entityLibrary.updateEntity(this);
    };
    Entity.prototype.getTraits = function () {
        var _this = this;
        var traits = [];
        Object.keys(this.trait).forEach(function (trait) { return traits.push(_this.trait[trait]); });
        return traits;
    };
    Entity.prototype.getEntityLibrary = function () {
        return this.entityLibrary;
    };
    Entity.prototype.getName = function () {
        var instance = this.constructor;
        return instance.name;
    };
    Entity.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(this.position, this.size);
    };
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map