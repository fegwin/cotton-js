"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("./buffer");
var image_1 = require("./util/image");
var json_1 = require("./util/json");
var SpriteSheet = (function () {
    function SpriteSheet(sprites, animations) {
        this.sprites = sprites;
        this.animations = animations;
    }
    SpriteSheet.createSpriteSheet = function (spriteDef, spriteImage) {
        if (!spriteDef.width || !spriteDef.height) {
            throw new Error("Inalid sprite def");
        }
        var sprites = {};
        if (spriteDef.sprites) {
            spriteDef.sprites.forEach(function (sprite) {
                var spriteBuffers = [false, true].map(function (flip) {
                    var buf = new buffer_1.Buffer(sprite.width, sprite.height);
                    var context = buf.getContext();
                    if (flip) {
                        context.scale(-1, -1);
                        context.translate(-sprite.width, 0);
                    }
                    context.drawImage(spriteImage, sprite.x, sprite.y, sprite.width, sprite.height, 0, 0, sprite.width, sprite.height);
                    return buf;
                });
                sprites[sprite.name] = spriteBuffers;
            });
        }
        var animations = {};
        if (spriteDef.animations) {
            spriteDef.animations.forEach(function (animation) {
                animations[animation.name] = function (animationDelta, flip) {
                    var spriteIndex = Math.floor(animationDelta / animation.animationLength) % animation.sprites.length;
                    return animation.sprites[spriteIndex];
                };
            });
        }
        return new SpriteSheet(sprites, animations);
    };
    SpriteSheet.loadSpriteSheet = function (assetPath, name) {
        return __awaiter(this, void 0, void 0, function () {
            var spriteDef, spriteImage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, json_1.loadJson(assetPath + "/" + name + ".json")];
                    case 1:
                        spriteDef = _a.sent();
                        if (!spriteDef.imageUrl) {
                            throw new Error("Invalid SpriteDef");
                        }
                        return [4, image_1.loadImage("" + spriteDef.imageUrl)];
                    case 2:
                        spriteImage = _a.sent();
                        return [2, SpriteSheet.createSpriteSheet(spriteDef, spriteImage)];
                }
            });
        });
    };
    SpriteSheet.prototype.getSprite = function (name, flip) {
        return this.sprites[name][flip ? 1 : 0];
    };
    SpriteSheet.prototype.getSpriteForAnimation = function (name, animationDelta, flip) {
        return this.animations[name](animationDelta, flip);
    };
    return SpriteSheet;
}());
exports.SpriteSheet = SpriteSheet;
//# sourceMappingURL=sprite-sheet.js.map