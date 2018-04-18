"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./util/math");
var buffer_1 = require("./buffer");
var Layer = (function () {
    function Layer(width, height, entities) {
        if (entities === void 0) { entities = []; }
        this.entities = [];
        this.width = width;
        this.height = height;
        this.buffer = new buffer_1.Buffer(this.width, this.height);
        this.calculateBounds();
        this.addEntities(entities);
    }
    Layer.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(new math_1.Point(0, 0), new math_1.Point(this.width, this.height));
    };
    Layer.prototype.addEntity = function (entity) {
        this.addEntities([entity]);
    };
    Layer.prototype.addEntities = function (entities) {
        this.entities = this.entities.concat(entities);
    };
    Layer.prototype.removeEntity = function (entity) {
        this.entities = this.entities.filter(function (e) {
            return e !== entity;
        });
    };
    Layer.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(deltaTime);
        }
    };
    Layer.prototype.paintOn = function (context) {
        this.buffer.clear();
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (math_1.BoundingBox.overlaps(this.bounds, entity.bounds))
                entity.paintOn(this.buffer.getContext());
        }
        context.drawImage(this.buffer.getCanvas(), 0, 0);
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map