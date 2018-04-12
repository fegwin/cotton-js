"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Compositor {
    constructor(width, height, layers = []) {
        this.layers = layers;
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    removeLayer(layer) {
        this.layers = this.layers.filter((l) => {
            return l !== layer;
        });
    }
    update(deltaTime) {
        this.layers.forEach(layer => layer.update(deltaTime));
    }
    draw(context) {
        this.layers.forEach(layer => layer.draw(this.bufferContext));
        context.drawImage(this.buffer, 0, 0);
    }
}
exports.default = Compositor;
