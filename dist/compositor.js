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
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].update(deltaTime);
        }
    };
    Compositor.prototype.drawOnTo = function (bufferContext) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].drawOnTo(this.bufferContext);
        }
        bufferContext.drawImage(this.buffer, 0, 0);
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map