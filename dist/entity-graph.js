"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityGraph = (function () {
    function EntityGraph() {
        this.entities = [];
        this.entitiesByTrait = {};
    }
    EntityGraph.prototype.getEntitiesByTraits = function (trait) {
        return this.entitiesByTrait[trait.getName()] || [];
    };
    EntityGraph.prototype.getEntitiesByTraitName = function (traitName) {
        return this.entitiesByTrait[traitName] || [];
    };
    EntityGraph.prototype.registerEntity = function (entity) {
        var _this = this;
        this.entities.push(entity);
        var traits = entity.getTraits();
        traits.forEach(function (trait) {
            if (!_this.entitiesByTrait[trait.getName()]) {
                _this.entitiesByTrait[trait.getName()] = [];
            }
            _this.entitiesByTrait[trait.getName()].push(entity);
        });
    };
    EntityGraph.prototype.deregisterEntity = function (entity) {
        var _this = this;
        var traits = entity.getTraits();
        traits.forEach(function (trait) {
            if (!_this.entitiesByTrait[trait.getName()]) {
                throw new Error("EntityGraph out of sync");
            }
            _this.entitiesByTrait[trait.getName()] =
                _this.entitiesByTrait[trait.getName()].filter(function (e) { return e !== entity; });
            _this.entities = _this.entities.filter(function (e) { return e !== entity; });
        });
    };
    return EntityGraph;
}());
exports.EntityGraph = EntityGraph;
//# sourceMappingURL=entity-graph.js.map