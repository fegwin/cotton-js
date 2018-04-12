"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CottonImage {
    loadImage(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.addEventListener('load', () => {
                resolve(img);
            });
            img.src = url;
        });
    }
}
exports.default = CottonImage;
//# sourceMappingURL=image.js.map