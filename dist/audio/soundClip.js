"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sound_1 = require("./Sound");
var SoundClip = (function (_super) {
    __extends(SoundClip, _super);
    function SoundClip(url) {
        var _this = _super.call(this) || this;
        return _this;
    }
    SoundClip.prototype.play = function (loop) {
        return;
    };
    SoundClip.prototype.playAt = function (msFromStart) {
        return;
    };
    SoundClip.prototype.stop = function () {
        return;
    };
    return SoundClip;
}(Sound_1.Sound));
exports.SoundClip = SoundClip;
//# sourceMappingURL=soundClip.js.map