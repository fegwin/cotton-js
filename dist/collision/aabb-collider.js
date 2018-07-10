"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../util/math");
var AABBCollision = (function () {
    function AABBCollision(entity, sides) {
        this.entity = entity;
        this.sides = sides;
    }
    return AABBCollision;
}());
exports.AABBCollision = AABBCollision;
var AABBCollider = (function () {
    function AABBCollider(entity, collidableEntityTraits) {
        this.entity = entity;
        this.collidableEntityTraits = collidableEntityTraits;
    }
    AABBCollider.prototype.detectCollisions = function () {
        var _this = this;
        var collidableEntities = this.entity
            .getEntityLibrary()
            .getEntitiesByTraitNames(this.collidableEntityTraits.map(function (trait) { return trait; }));
        var collisions = [];
        collidableEntities.forEach(function (testEntity) {
            if (_this.entity === testEntity) {
                return;
            }
            if (!math_1.BoundingBox.overlaps(_this.entity.bounds, testEntity.bounds)) {
                return;
            }
            collisions.push(new AABBCollision(testEntity, math_1.BoundingBox.getOverlappingSides(_this.entity.bounds, testEntity.bounds)));
        });
        return collisions;
    };
    return AABBCollider;
}());
exports.AABBCollider = AABBCollider;
//# sourceMappingURL=aabb-collider.js.map