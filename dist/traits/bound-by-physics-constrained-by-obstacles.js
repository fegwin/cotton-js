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
var collision_1 = require("../collision");
var bound_by_physics_1 = require("./bound-by-physics");
var BoundByPhysicsConstrainedByObstacles = (function (_super) {
    __extends(BoundByPhysicsConstrainedByObstacles, _super);
    function BoundByPhysicsConstrainedByObstacles(entity, terminalVelocity) {
        var _this = _super.call(this, entity, terminalVelocity) || this;
        _this.collider = new collision_1.AABBCollider(_this.entity, ["Obstacle"]);
        return _this;
    }
    BoundByPhysicsConstrainedByObstacles.prototype.update = function (deltaTime) {
        this.updateX(deltaTime);
        this.resolveCollisions(true, false);
        this.updateY(deltaTime);
        this.resolveCollisions(false, true);
    };
    BoundByPhysicsConstrainedByObstacles.prototype.resolveCollisions = function (resolveX, resolveY) {
        var _this = this;
        var collisions = this.collider.detectCollisions();
        collisions.forEach(function (collision) {
            if (resolveX) {
                if (collision.sides.right) {
                    _this.entity.position.x -= _this.entity.bounds.right - collision.entity.bounds.left;
                }
                if (collision.sides.left) {
                    _this.entity.position.x += collision.entity.bounds.right - _this.entity.bounds.left;
                }
            }
            if (resolveY) {
                if (collision.sides.bottom) {
                    _this.entity.position.y -= _this.entity.bounds.bottom - collision.entity.bounds.top;
                }
                if (collision.sides.top) {
                    _this.entity.position.y += collision.entity.bounds.bottom - _this.entity.bounds.top;
                }
            }
        });
    };
    return BoundByPhysicsConstrainedByObstacles;
}(bound_by_physics_1.BoundByPhysics));
exports.BoundByPhysicsConstrainedByObstacles = BoundByPhysicsConstrainedByObstacles;
//# sourceMappingURL=bound-by-physics-constrained-by-obstacles.js.map