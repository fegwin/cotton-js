"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryCanvas = (function () {
    function MemoryCanvas(width, height, canvas) {
        this.canvas = canvas || document.createElement("canvas");
        this.canvas.width = canvas ? canvas.width : width;
        this.canvas.height = canvas ? canvas.height : height;
        this.context = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
    }
    MemoryCanvas.prototype.getContext = function () {
        return this.context;
    };
    MemoryCanvas.prototype.getCanvas = function () {
        return this.canvas;
    };
    MemoryCanvas.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return MemoryCanvas;
}());
exports.MemoryCanvas = MemoryCanvas;
//# sourceMappingURL=memory-canvas.js.map