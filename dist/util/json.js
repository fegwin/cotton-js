"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Json = (function () {
    function Json() {
    }
    Json.prototype.loadJson = function (url) {
        return fetch(url).then(function (r) { return r.json(); });
    };
    return Json;
}());
exports.Json = Json;
//# sourceMappingURL=json.js.map