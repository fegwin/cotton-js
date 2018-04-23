"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox = (function () {
    function BoundingBox(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    BoundingBox.overlaps = function (box1, box2) {
        return (box1.bottom > box2.top &&
            box1.top < box2.bottom &&
            box1.left < box2.right &&
            box1.right > box2.left);
    };
    BoundingBox.getOverlappingSides = function (entity, box2) {
        var left = false;
        var right = false;
        var top = false;
        var bottom = false;
        if (entity.left < box2.right && entity.right > box2.left) {
            left = true;
        }
        if (entity.right > box2.left && entity.left > box2.right) {
            right = true;
        }
        if (entity.top < box2.bottom && entity.bottom > box2.top) {
            top = true;
        }
        if (entity.bottom > box2.top && entity.top < box2.top) {
            bottom = true;
        }
        return {
            bottom: bottom,
            left: left,
            right: right,
            top: top,
        };
    };
    BoundingBox.prototype.overlaps = function (box) {
        return BoundingBox.overlaps(this, box);
    };
    BoundingBox.prototype.getOverlappingSides = function (box) {
        return BoundingBox.getOverlappingSides(this, box);
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
var Point = (function () {
    function Point(x, y) {
        this.set(x, y);
    }
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return Point;
}());
exports.Point = Point;
exports.getRandomNumber = function (min, max) { return Math.random() * (max - min) + min; };
exports.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
//# sourceMappingURL=math.js.map