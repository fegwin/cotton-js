"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var Compositor = (function () {
    function Compositor(width, height, layers) {
        if (layers === void 0) { layers = []; }
        this.layers = layers;
        this.buffer = new buffer_1.Buffer(width, height);
    }
    Compositor.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    Compositor.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].update(deltaTime);
        }
    };
    Compositor.prototype.paintOn = function (context) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].paintOn(this.buffer.getContext());
        }
        context.drawImage(this.buffer.getCanvas(), 0, 0);
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map