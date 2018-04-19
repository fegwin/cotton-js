"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Buffer = (function () {
    function Buffer(width, height, canvas) {
        this.canvas = canvas || document.createElement("canvas");
        this.canvas.width = canvas ? canvas.width : width;
        this.canvas.height = canvas ? canvas.height : height;
        this.context = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
    }
    Buffer.prototype.getContext = function () {
        return this.context;
    };
    Buffer.prototype.getCanvas = function () {
        return this.canvas;
    };
    Buffer.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    return Buffer;
}());
exports.Buffer = Buffer;
//# sourceMappingURL=buffer.js.map