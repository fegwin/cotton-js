"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Trait = (function () {
    function Trait(entity) {
        this.entity = entity;
    }
    Trait.prototype.update = function (deltaTime) {
        return;
    };
    Trait.prototype.getName = function () {
        var instance = this.constructor;
        return instance.name;
    };
    return Trait;
}());
exports.Trait = Trait;
//# sourceMappingURL=trait.js.map