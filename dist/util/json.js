"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadJson(url) {
    return fetch(url).then(function (r) { return r.json(); });
}
exports.loadJson = loadJson;
//# sourceMappingURL=json.js.map