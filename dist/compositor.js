"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var CanvasElementToLayer = (function () {
    function CanvasElementToLayer(buffer, layer) {
        this.buffer = buffer;
        this.layer = layer;
    }
    return CanvasElementToLayer;
}());
var Compositor = (function () {
    function Compositor(width, height, rootElement, layers) {
        if (layers === void 0) { layers = []; }
        this.canvasElementToLayers = [];
        var newContainer = document.createElement('div');
        newContainer.style.position = 'relative';
        rootElement.parentNode.replaceChild(newContainer, rootElement);
        this.rootContainer = newContainer;
        this.addLayers(width, height, layers);
    }
    Compositor.prototype.addLayers = function (width, height, layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerCanvas = this.createLayerElement(width, height, i);
            this.canvasElementToLayers.push(new CanvasElementToLayer(new buffer_1.Buffer(width, height, layerCanvas), layer));
            this.rootContainer.appendChild(layerCanvas);
        }
    };
    Compositor.prototype.createLayerElement = function (width, height, i) {
        var layerCanvas = document.createElement('canvas');
        layerCanvas.width = width;
        layerCanvas.height = height;
        layerCanvas.style.position = 'absolute';
        layerCanvas.style.left = '0px';
        layerCanvas.style.top = '0px';
        layerCanvas.id = 'layer' + i;
        layerCanvas.style.zIndex = String(i);
        return layerCanvas;
    };
    Compositor.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.canvasElementToLayers.length; i++) {
            this.canvasElementToLayers[i].layer.update(deltaTime);
        }
    };
    Compositor.prototype.paint = function () {
        for (var i = 0; i < this.canvasElementToLayers.length; i++) {
            var rootCanvasContainer = this.canvasElementToLayers[i];
            rootCanvasContainer.buffer.clear();
            rootCanvasContainer.layer.paintOn(rootCanvasContainer.buffer.getContext());
        }
    };
    return Compositor;
}());
exports.Compositor = Compositor;
//# sourceMappingURL=compositor.js.map