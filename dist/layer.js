"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var math_1 = require("./util/math");
var Layer = (function () {
    function Layer(width, height, entityGraph, entities) {
        if (entities === void 0) { entities = []; }
        this.entities = [];
        this.width = width;
        this.height = height;
        this.entityGraph = entityGraph;
        this.buffer = new buffer_1.Buffer(this.width, this.height);
        this.calculateBounds();
        this.addEntities(entities);
    }
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
        this.entityGraph.deregisterEntity(entity);
    };
    Layer.prototype.update = function (deltaTime) {
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            entity.update(deltaTime);
        }
    };
    Layer.prototype.paintOn = function (context) {
        this.buffer.clear();
        for (var _i = 0, _a = this.entities; _i < _a.length; _i++) {
            var entity = _a[_i];
            if (math_1.BoundingBox.overlaps(this.bounds, entity.bounds)) {
                entity.paintOn(this.buffer.getContext());
            }
        }
        context.drawImage(this.buffer.getCanvas(), 0, 0);
    };
    Layer.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(new math_1.Point(0, 0), new math_1.Point(this.width, this.height));
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map