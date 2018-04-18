"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var LayerElement = (function () {
    function LayerElement(width, height, buffer, layer) {
        this.width = width;
        this.height = height;
        this.buffer = buffer;
        this.layer = layer;
    }
    return LayerElement;
}());
var Compositor = (function () {
    function Compositor(width, height, container, layers) {
        if (layers === void 0) { layers = []; }
        this.layers = [];
        var newContainer = document.createElement('div');
        newContainer.style.position = 'relative';
        container.parentNode.replaceChild(newContainer, container);
        this.rootContainer = newContainer;
        this.addLayers(width, height, layers);
    }
    Compositor.prototype.addLayers = function (width, height, layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerCanvas = document.createElement('canvas');
            layerCanvas.width = width;
            layerCanvas.height = height;
            layerCanvas.style.position = 'absolute';
            layerCanvas.style.left = '0px';
            layerCanvas.style.top = '0px';
            layerCanvas.id = 'layer' + i;
            layerCanvas.style.zIndex = String(i);
            this.layers.push(new LayerElement(width, height, new buffer_1.Buffer(width, height, layerCanvas), layer));
            this.rootContainer.appendChild(layerCanvas);
        }
    };
    Compositor.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].layer.update(deltaTime);
        }
    };
    Compositor.prototype.paint = function () {
        for (var i = 0; i < this.layers.length; i++) {
            var layer = this.layers[i];
            layer.buffer.clear();
            layer.layer.paintOn(layer.buffer.getContext());
        }
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map