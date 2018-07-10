"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var math_1 = require("../util/math");
var BoundByGravity = (function (_super) {
    __extends(BoundByGravity, _super);
    function BoundByGravity(entity, acceleration) {
        var _this = _super.call(this, entity) || this;
        _this.acceleration = acceleration;
        return _this;
    }
    BoundByGravity.prototype.update = function (deltaTime) {
        if (!this.entity.acceleration) {
            this.entity.acceleration = new math_1.Vector2(0, 0);
        }
        this.entity.acceleration.y = this.acceleration.y;
        this.entity.acceleration.x = this.acceleration.x;
    };
    BoundByGravity.prototype.getName = function () {
        return "BoundByGravity";
    };
    return BoundByGravity;
}(__1.Trait));
exports.BoundByGravity = BoundByGravity;
//# sourceMappingURL=bound-by-gravity.js.map