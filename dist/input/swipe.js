"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWIPEUP = "swipeup";
exports.SWIPEDOWN = "swipedown";
exports.SWIPELEFT = "swipeleft";
exports.SWIPERIGHT = "swiperight";
exports.SWIPEIDLE = "swipeidle";
var Swipe = (function () {
    function Swipe(htmlElement) {
        var _this = this;
        this.xDown = null;
        this.yDown = null;
        this.swipeMap = {};
        htmlElement.addEventListener("touchstart", function (e) { return _this.handleEventStart(e); }, false);
        htmlElement.addEventListener("touchend", function (e) { return _this.handleEventStop(e); }, false);
        htmlElement.addEventListener("touchmove", function (e) { return _this.handleEvent(e); }, false);
    }
    Swipe.prototype.addMapping = function (swipeDirection, callback) {
        if (!this.swipeMap[swipeDirection]) {
            this.swipeMap[swipeDirection] = new Array();
        }
        this.swipeMap[swipeDirection].push(callback);
    };
    Swipe.prototype.handleEventStart = function (event) {
        event.preventDefault();
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    };
    Swipe.prototype.handleEventStop = function (event) {
        event.preventDefault();
        this.xDown = null;
        this.yDown = null;
        this.runMappedEvents(exports.SWIPEIDLE);
    };
    Swipe.prototype.handleEvent = function (event) {
        event.preventDefault();
        if (!this.xDown || !this.yDown) {
            return;
        }
        var xUp = event.touches[0].clientX;
        var yUp = event.touches[0].clientY;
        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;
        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
            if (this.xDiff > 0) {
                this.runMappedEvents(exports.SWIPELEFT);
            }
            else {
                this.runMappedEvents(exports.SWIPERIGHT);
            }
        }
        else if (this.yDiff > 0) {
            this.runMappedEvents(exports.SWIPEUP);
        }
        else {
            this.runMappedEvents(exports.SWIPEDOWN);
        }
    };
    Swipe.prototype.runMappedEvents = function (swipeDirection) {
        if (!this.swipeMap[swipeDirection]) {
            return;
        }
        this.swipeMap[swipeDirection]
            .forEach(function (callback) { return callback(); });
    };
    return Swipe;
}());
exports.Swipe = Swipe;
//# sourceMappingURL=swipe.js.map