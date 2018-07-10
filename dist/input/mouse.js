"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = require("../util/math");
exports.CLICK = "click";
exports.MOVE = "move";
var Mouse = (function () {
    function Mouse(htmlElement) {
        var _this = this;
        this.mouseMap = {};
        this.pointerPosition = new math_1.Vector2(0, 0);
        htmlElement.addEventListener("mousemove", function (e) { return _this.handleMoveEvent(e); });
        htmlElement.addEventListener("click", function (e) { return _this.handleClickEvent(e); });
        htmlElement.addEventListener("contextmenu", function (e) { return e.preventDefault(); });
    }
    Mouse.prototype.addMapping = function (code, callback) {
        if (!this.mouseMap[code]) {
            this.mouseMap[code] = new Array();
        }
        this.mouseMap[code].push(callback);
    };
    Mouse.prototype.handleClickEvent = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.mouseMap[exports.CLICK]) {
            return;
        }
        this.mouseMap[exports.CLICK]
            .forEach(function (callback) { return callback({
            buttonCode: exports.CLICK,
            pointerPosition: _this.pointerPosition,
        }); });
    };
    Mouse.prototype.handleMoveEvent = function (event) {
        var _this = this;
        event.preventDefault();
        this.pointerPosition.set(event.clientX, event.clientY);
        if (!this.mouseMap[exports.MOVE]) {
            return;
        }
        this.mouseMap[exports.MOVE]
            .forEach(function (callback) { return callback({
            buttonCode: null,
            pointerPosition: _this.pointerPosition,
        }); });
    };
    return Mouse;
}());
exports.Mouse = Mouse;
//# sourceMappingURL=mouse.js.map