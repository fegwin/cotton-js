"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntityLibrary = (function () {
    function EntityLibrary() {
        this.entities = [];
        this.entitiesByTrait = {};
    }
    EntityLibrary.prototype.getEntitiesByTraits = function (trait) {
        return this.entitiesByTrait[trait.getName()] || [];
    };
    EntityLibrary.prototype.getEntitiesByTraitName = function (traitName) {
        return this.entitiesByTrait[traitName] || [];
    };
    EntityLibrary.prototype.registerEntity = function (entity) {
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
    EntityLibrary.prototype.deregisterEntity = function (entity) {
        var _this = this;
        var traits = entity.getTraits();
        traits.forEach(function (trait) {
            if (!_this.entitiesByTrait[trait.getName()]) {
                throw new Error("EntityLibrary out of sync");
            }
            _this.entitiesByTrait[trait.getName()] =
                _this.entitiesByTrait[trait.getName()].filter(function (e) { return e !== entity; });
            _this.entities = _this.entities.filter(function (e) { return e !== entity; });
        });
    };
    return EntityLibrary;
}());
exports.EntityLibrary = EntityLibrary;
//# sourceMappingURL=entity-library.js.map