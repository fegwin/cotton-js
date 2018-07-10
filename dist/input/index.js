"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = require("./keyboard");
var mouse_1 = require("./mouse");
var swipe_1 = require("./swipe");
exports.input = {
    CLICK: mouse_1.CLICK,
    KEYDOWN: keyboard_1.KEYDOWN,
    KEYUP: keyboard_1.KEYUP,
    MOVE: mouse_1.MOVE,
    PRESSED: keyboard_1.PRESSED,
    RELEASED: keyboard_1.RELEASED,
    SWIPEDOWN: swipe_1.SWIPEDOWN,
    SWIPEIDLE: swipe_1.SWIPEIDLE,
    SWIPELEFT: swipe_1.SWIPELEFT,
    SWIPERIGHT: swipe_1.SWIPERIGHT,
    SWIPEUP: swipe_1.SWIPEUP,
    Keyboard: keyboard_1.Keyboard,
    Mouse: mouse_1.Mouse,
    Swipe: swipe_1.Swipe,
};
//# sourceMappingURL=index.js.map