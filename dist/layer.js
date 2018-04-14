"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("./util/math");
var Layer = (function () {
    function Layer(width, height, entities) {
        if (entities === void 0) { entities = []; }
        this.entities = entities;
        this.width = width;
        this.height = height;
        this.calculateBounds();
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    Layer.prototype.calculateBounds = function () {
        this.bounds = new math_1.BoundingBox(new math_1.Vec(0, 0), new math_1.Vec(this.width, this.height));
    };
    Layer.prototype.addEntity = function (entity) {
        this.addEntities([entity]);
    };
    Layer.prototype.addEntities = function (entities) {
        entities.forEach(function (entity) { return entity.setup(); });
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
    Layer.prototype.drawOnTo = function (bufferContext) {
        this.bufferContext.clearRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (math_1.BoundingBox.overlaps(this.bounds, entity.bounds))
                entity.drawTo(this.bufferContext);
        }
        bufferContext.drawImage(this.buffer, 0, 0);
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map