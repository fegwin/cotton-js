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
    function BoundByPhysics(terminalVelocity) {
        var _this = _super.call(this) || this;
        _this.terminalVelocity = terminalVelocity;
        return _this;
    }
    BoundByPhysics.prototype.setPhysicsDefaults = function (entity) {
        if (!entity.acceleration) {
            entity.acceleration = new math_1.Point(0, 0);
        }
        if (!entity.velocity) {
            entity.velocity = new math_1.Point(0, 0);
        }
    };
    BoundByPhysics.prototype.update = function (entity, entityGraph, deltaTime) {
        this.setPhysicsDefaults(entity);
        this.updateX(entity, entityGraph, deltaTime);
        this.updateY(entity, entityGraph, deltaTime);
    };
    BoundByPhysics.prototype.getName = function () {
        return "BoundByPhysics";
    };
    BoundByPhysics.prototype.updateY = function (entity, entityGraph, deltaTime) {
        entity.velocity.y += deltaTime * entity.acceleration.y;
        if (this.terminalVelocity && Math.abs(entity.velocity.y) >= Math.abs(this.terminalVelocity.y)) {
            entity.velocity.y = math_1.sign(entity.velocity.y) * this.terminalVelocity.y;
        }
        entity.position.y += deltaTime * entity.velocity.y;
    };
    BoundByPhysics.prototype.updateX = function (entity, entityGraph, deltaTime) {
        entity.velocity.x += deltaTime * entity.acceleration.x;
        if (this.terminalVelocity && Math.abs(entity.velocity.x) >= Math.abs(this.terminalVelocity.x)) {
            entity.velocity.x = math_1.sign(entity.velocity.x) * this.terminalVelocity.x;
        }
        entity.position.x += deltaTime * entity.velocity.x;
    };
    return BoundByPhysics;
}(__1.Trait));
exports.BoundByPhysics = BoundByPhysics;
//# sourceMappingURL=bound-by-physics.js.map