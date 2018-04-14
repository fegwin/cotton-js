"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Layer = (function () {
    function Layer(width, height, entities) {
        if (entities === void 0) { entities = []; }
        this.entities = entities;
        this.width = width;
        this.height = height;
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    Layer.prototype.addEntity = function (entity) {
        this.entities.push(entity);
    };
    Layer.prototype.removeEntity = function (entity) {
        this.entities = this.entities.filter(function (e) {
            return e !== entity;
        });
    };
    Layer.prototype.update = function (deltaTime) {
        this.entities.forEach(function (entity) { return entity.update(deltaTime); });
    };
    Layer.prototype.draw = function (context) {
        this.bufferContext.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(function (entity) { return entity.draw(context); });
        context.drawImage(this.buffer, 0, 0);
    };
    return Layer;
}());
exports.Layer = Layer;
//# sourceMappingURL=layer.js.map