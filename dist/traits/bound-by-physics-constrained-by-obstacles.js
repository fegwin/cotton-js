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
var math_1 = require("../util/math");
var bound_by_physics_1 = require("./bound-by-physics");
var BoundByPhysicsConstrainedByObstacles = (function (_super) {
    __extends(BoundByPhysicsConstrainedByObstacles, _super);
    function BoundByPhysicsConstrainedByObstacles(terminalVelocity) {
        return _super.call(this, terminalVelocity) || this;
    }
    BoundByPhysicsConstrainedByObstacles.prototype.update = function (entity, entityGraph, deltaTime) {
        var obstacles = entityGraph.getEntitiesByTraitName("Obstacle");
        this.setPhysicsDefaults(entity);
        this.updateX(entity, entityGraph, deltaTime);
        this.applyObstacleCollisionResolutionX(entity, obstacles);
        this.updateY(entity, entityGraph, deltaTime);
        this.applyObstacleCollisionResolutionY(entity, obstacles);
    };
    BoundByPhysicsConstrainedByObstacles.prototype.applyObstacleCollisionResolutionX = function (entity, obstacles) {
        var xResolution = 0;
        obstacles.forEach(function (obstacle) {
            if (!math_1.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) {
                return;
            }
            var sides = math_1.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);
            if (sides.right) {
                xResolution -= entity.bounds.right - obstacle.bounds.left;
            }
            if (sides.left) {
                xResolution += obstacle.bounds.right - entity.bounds.left;
            }
        });
        entity.position.x += xResolution;
    };
    BoundByPhysicsConstrainedByObstacles.prototype.applyObstacleCollisionResolutionY = function (entity, obstacles) {
        var yResolution = 0;
        obstacles.forEach(function (obstacle) {
            if (!math_1.BoundingBox.overlaps(entity.bounds, obstacle.bounds)) {
                return;
            }
            var sides = math_1.BoundingBox.getOverlappingSides(entity.bounds, obstacle.bounds);
            if (sides.bottom) {
                yResolution -= entity.bounds.bottom - obstacle.bounds.top;
            }
            if (sides.top) {
                yResolution += obstacle.bounds.bottom - entity.bounds.top;
            }
        });
        entity.position.y += yResolution;
    };
    return BoundByPhysicsConstrainedByObstacles;
}(bound_by_physics_1.BoundByPhysics));
exports.BoundByPhysicsConstrainedByObstacles = BoundByPhysicsConstrainedByObstacles;
//# sourceMappingURL=bound-by-physics-constrained-by-obstacles.js.map