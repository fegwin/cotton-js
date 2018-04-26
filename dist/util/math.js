"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoundingBox = (function () {
    function BoundingBox(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    BoundingBox.contains = function (a, b) {
        return !(b.left < a.left ||
            b.top < a.top ||
            b.right > a.right ||
            b.bottom > a.bottom);
    };
    BoundingBox.touches = function (a, b) {
        if (a.left > b.right || b.left > a.right) {
            return false;
        }
        if (a.top > b.bottom || b.top > a.bottom) {
            return false;
        }
        return true;
    };
    BoundingBox.overlaps = function (a, b) {
        if (a.left >= b.right || b.left >= a.right) {
            return false;
        }
        if (a.top >= b.bottom || b.top >= a.bottom) {
            return false;
        }
        return true;
    };
    BoundingBox.getOverlappingSides = function (box1, box2) {
        var left = false;
        var right = false;
        var top = false;
        var bottom = false;
        if (BoundingBox.touches(box1, box2) && box1.left < box2.left && box1.right >= box2.left) {
            right = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.right > box2.right && box1.left <= box2.right) {
            left = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.top < box2.bottom && box1.bottom >= box2.bottom) {
            top = true;
        }
        if (BoundingBox.touches(box1, box2) && box1.bottom > box2.top && box1.top <= box2.top) {
            bottom = true;
        }
        return {
            bottom: bottom,
            left: left,
            right: right,
            top: top,
        };
    };
    BoundingBox.prototype.contains = function (box) {
        return BoundingBox.contains(this, box);
    };
    BoundingBox.prototype.touches = function (box) {
        return BoundingBox.touches(this, box);
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
exports.sign = function (n) { return n && n / Math.abs(n); };
//# sourceMappingURL=math.js.map