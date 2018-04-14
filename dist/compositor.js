"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Compositor = (function () {
    function Compositor(width, height, layers) {
        if (layers === void 0) { layers = []; }
        this.layers = layers;
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    Compositor.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    Compositor.prototype.update = function (deltaTime) {
        this.layers.forEach(function (layer) { return layer.update(deltaTime); });
    };
    Compositor.prototype.draw = function (context) {
        var _this = this;
        this.layers.forEach(function (layer) { return layer.draw(_this.bufferContext); });
        context.drawImage(this.buffer, 0, 0);
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map