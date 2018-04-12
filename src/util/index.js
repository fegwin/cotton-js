"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = require("./image");
const json_1 = require("./json");
const math_1 = require("./math");
exports.default = Object.assign(image_1.default, json_1.default, {
    BoundingBox: math_1.BoundingBox,
    getRandomNumber: math_1.getRandomNumber,
    Vec: math_1.Vec
});
//# sourceMappingURL=index.js.map