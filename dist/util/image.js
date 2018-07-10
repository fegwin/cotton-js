"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
function loadImage(url) {
    return new es6_promise_1.Promise(function (resolve) {
        var img = new Image();
        img.addEventListener("load", function () {
            resolve(img);
        });
        img.src = url;
    });
}
exports.loadImage = loadImage;
//# sourceMappingURL=image.js.map