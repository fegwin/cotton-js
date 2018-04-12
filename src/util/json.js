"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Json {
    loadJson(url) {
        return fetch(url).then(r => r.json());
    }
}
exports.default = Json;
//# sourceMappingURL=json.js.map