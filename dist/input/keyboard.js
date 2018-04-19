"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PRESSED = 1;
var RELEASED = 0;
var KEYDOWN = 'keydown';
var KEYUP = 'keyup';
var Keyboard = (function () {
    function Keyboard(htmlElement) {
        var _this = this;
        this.keyStates = {};
        this.keyMap = {};
        [KEYDOWN, KEYUP]
            .forEach(function (eventName) { return htmlElement.addEventListener(eventName, function (event) { return _this.handleEvent(event); }); });
    }
    Keyboard.prototype.addMapping = function (code, callback) {
        if (!this.keyMap[code]) {
            this.keyMap[code] = new Array();
        }
        this.keyMap[code].push(callback);
    };
    Keyboard.prototype.handleEvent = function (event) {
        var code = event.code;
        event.preventDefault();
        if (!this.keyMap[code]) {
            return;
        }
        var keyState = event.type === KEYDOWN ? PRESSED : RELEASED;
        if (this.keyStates[code] === keyState) {
            return;
        }
        this.keyStates[code] = keyState;
        this.keyMap[code]
            .forEach(function (callback) { return callback(keyState); });
    };
    return Keyboard;
}());
exports.Keyboard = Keyboard;
//# sourceMappingURL=keyboard.js.map