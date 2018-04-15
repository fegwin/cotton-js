"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox = (function () {
    function BoundingBox(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    BoundingBox.prototype.overlaps = function (box) {
        return BoundingBox.overlaps(this, box);
    };
    BoundingBox.overlaps = function (box1, box2) {
        return (box1.bottom > box2.top &&
            box1.top < box2.bottom &&
            box1.left < box2.right &&
            box1.right > box2.left);
    };
    Object.defineProperty(BoundingBox.prototype, "bottom", {
        get: function () {
            return this.pos.y + this.size.y;
        },
        set: function (y) {
            this.pos.y = y - this.size.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "top", {
        get: function () {
            return this.pos.y;
        },
        set: function (y) {
            this.pos.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "left", {
        get: function () {
            return this.pos.x;
        },
        set: function (x) {
            this.pos.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoundingBox.prototype, "right", {
        get: function () {
            return this.pos.x + this.size.x;
        },
        set: function (x) {
            this.pos.x = x - this.size.x;
        },
        enumerable: true,
        configurable: true
    });
    return BoundingBox;
}());
exports.BoundingBox = BoundingBox;
var Vec = (function () {
    function Vec(x, y) {
        this.set(x, y);
    }
    Vec.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Vec;
}());
exports.Vec = Vec;
exports.getRandomNumber = function (min, max) { return Math.random() * (max - min) + min; };
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
//# sourceMappingURL=math.js.map