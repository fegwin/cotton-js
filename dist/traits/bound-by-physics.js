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
var BoundByPhysics = (function (_super) {
    __extends(BoundByPhysics, _super);
    function BoundByPhysics(entity, terminalVelocity) {
        var _this = _super.call(this, entity) || this;
        _this.terminalVelocity = terminalVelocity;
        return _this;
    }
    BoundByPhysics.prototype.update = function (deltaTime) {
        this.updateX(deltaTime);
        this.updateY(deltaTime);
    };
    BoundByPhysics.prototype.getName = function () {
        return "BoundByPhysics";
    };
    BoundByPhysics.prototype.updateY = function (deltaTime) {
        this.entity.velocity.y += deltaTime * this.entity.acceleration.y;
        if (this.terminalVelocity && Math.abs(this.entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {
            this.entity.velocity.y = math_1.sign(this.entity.velocity.y) * this.terminalVelocity.y;
        }
        this.entity.position.y += deltaTime * this.entity.velocity.y;
    };
    BoundByPhysics.prototype.updateX = function (deltaTime) {
        this.entity.velocity.x += deltaTime * this.entity.acceleration.x;
        if (this.terminalVelocity && Math.abs(this.entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) {
            this.entity.velocity.x = math_1.sign(this.entity.velocity.x) * this.terminalVelocity.x;
        }
        this.entity.position.x += deltaTime * this.entity.velocity.x;
    };
    return BoundByPhysics;
}(__1.Trait));
exports.BoundByPhysics = BoundByPhysics;
//# sourceMappingURL=bound-by-physics.js.map