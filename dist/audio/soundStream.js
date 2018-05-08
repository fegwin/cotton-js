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
var SoundStream = (function (_super) {
    __extends(SoundStream, _super);
    function SoundStream() {
        var _this = _super.call(this) || this;
        return _this;
    }
    SoundStream.prototype.mute = function () {
        return;
    };
    SoundStream.prototype.unmute = function () {
        return;
    };
    return SoundStream;
}(Sound_1.Sound));
exports.SoundStream = SoundStream;
//# sourceMappingURL=soundStream.js.map