"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var CottonImage = (function () {
    function CottonImage() {
    }
    CottonImage.prototype.loadImage = function (url) {
        return new es6_promise_1.Promise(function (resolve) {
            var img = new Image();
            img.addEventListener('load', function () {
                resolve(img);
            });
            img.src = url;
        });
    };
    return CottonImage;
}());
exports.CottonImage = CottonImage;
//# sourceMappingURL=image.js.map