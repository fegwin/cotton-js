/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animator.ts":
/*!*************************!*\
  !*** ./src/animator.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Animator {
    constructor(compositor, context, deltaTime = 1 / 60) {
        this.accumulatedTime = 0;
        this.lastTime = 0;
        this.deltaTime = deltaTime;
        this.compositor = compositor;
        this.context = context;
    }
    enqueue() {
        window.requestAnimationFrame(this.update);
    }
    update(time) {
        this.accumulatedTime += (time - this.lastTime) / 1000;
        if (this.accumulatedTime > 1) {
            this.accumulatedTime = 1;
        }
        while (this.accumulatedTime > this.deltaTime) {
            this.animate(this.deltaTime);
            this.accumulatedTime -= this.deltaTime;
        }
        this.lastTime = time;
        this.enqueue();
    }
    animate(deltaTime) {
        this.compositor.update(deltaTime);
        this.compositor.draw(this.context);
    }
    start() {
        this.enqueue();
    }
}
exports.default = Animator;


/***/ }),

/***/ "./src/compositor.ts":
/*!***************************!*\
  !*** ./src/compositor.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Compositor {
    constructor(width, height, layers = []) {
        this.layers = layers;
        this.buffer = document.createElement('canvas');
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext('2d');
    }
    addLayer(layer) {
        this.layers.push(layer);
    }
    update(deltaTime) {
        this.layers.forEach(layer => layer.update(deltaTime));
    }
    draw(context) {
        this.layers.forEach(layer => layer.draw(this.bufferContext));
        context.drawImage(this.buffer, 0, 0);
    }
}
exports.default = Compositor;


/***/ }),

/***/ "./src/entity.ts":
/*!***********************!*\
  !*** ./src/entity.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = __webpack_require__(/*! ./util/math */ "./src/util/math.ts");
class Entity {
    constructor(traits = []) {
        this.name = "entity";
        this.pos = new math_1.Vec(0, 0);
        this.vel = new math_1.Vec(0, 0);
        this.size = new math_1.Vec(0, 0);
        this.lifetime = 0;
        this.calculateBounds();
        this.initialiseTraits(traits);
    }
    initialiseTraits(traits) {
        traits.forEach(trait => {
            this.traits[trait.getName()] = trait;
        });
    }
    calculateBounds() {
        this.bounds = new math_1.BoundingBox(this.pos, this.size);
    }
    draw() {
        throw new Error(`This needs to be implemented by the child class (${this.name})`);
    }
    update(deltaTime) {
        for (var trait in this.traits) {
            this.traits[trait].update(this, deltaTime);
        }
        this.lifetime += deltaTime;
    }
}
exports.default = Entity;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(/*! ./util */ "./src/util/index.ts");
exports.util = util_1.default;
const layer_1 = __webpack_require__(/*! ./layer */ "./src/layer.ts");
exports.Layer = layer_1.default;
const entity_1 = __webpack_require__(/*! ./entity */ "./src/entity.ts");
exports.Entity = entity_1.default;
const animator_1 = __webpack_require__(/*! ./animator */ "./src/animator.ts");
exports.Animator = animator_1.default;
const compositor_1 = __webpack_require__(/*! ./compositor */ "./src/compositor.ts");
exports.Compositor = compositor_1.default;


/***/ }),

/***/ "./src/layer.ts":
/*!**********************!*\
  !*** ./src/layer.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Layer {
    constructor(width, height, entities = []) {
        this.entities = entities;
        this.width = width;
        this.height = height;
        this.buffer = document.createElement("canvas");
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext("2d");
    }
    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
    draw(context) {
        this.bufferContext.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(entity => entity.draw());
        context.drawImage(this.buffer, 0, 0);
    }
}
exports.default = Layer;


/***/ }),

/***/ "./src/util/image.ts":
/*!***************************!*\
  !*** ./src/util/image.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),

/***/ "./src/util/index.ts":
/*!***************************!*\
  !*** ./src/util/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __webpack_require__(/*! ./image */ "./src/util/image.ts");
const json_1 = __webpack_require__(/*! ./json */ "./src/util/json.ts");
const math_1 = __webpack_require__(/*! ./math */ "./src/util/math.ts");
exports.default = Object.assign(image_1.default, json_1.default, {
    BoundingBox: math_1.BoundingBox,
    getRandomNumber: math_1.getRandomNumber,
    Vec: math_1.Vec
});


/***/ }),

/***/ "./src/util/json.ts":
/*!**************************!*\
  !*** ./src/util/json.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Json {
    loadJson(url) {
        return fetch(url).then(r => r.json());
    }
}
exports.default = Json;


/***/ }),

/***/ "./src/util/math.ts":
/*!**************************!*\
  !*** ./src/util/math.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BoundingBox {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
    }
    overlaps(box) {
        return (this.bottom > box.top &&
            this.top < box.bottom &&
            this.left < box.right &&
            this.right > box.left);
    }
    get bottom() {
        return this.pos.y + this.size.y;
    }
    set bottom(y) {
        this.pos.y = y - this.size.y;
    }
    get top() {
        return this.pos.y;
    }
    set top(y) {
        this.pos.y = y;
    }
    get left() {
        return this.pos.x;
    }
    set left(x) {
        this.pos.x = x;
    }
    get right() {
        return this.pos.x + this.size.x;
    }
    set right(x) {
        this.pos.x = x - this.size.x;
    }
}
exports.BoundingBox = BoundingBox;
class Vec {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Vec = Vec;
exports.getRandomNumber = (min, max) => Math.random() * (max - min) + min;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbWFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9qc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtJQU9FLFlBQ0UsVUFBc0IsRUFDdEIsT0FBaUMsRUFDakMsWUFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxD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QyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFaRCxrQkFZQztBQUVZLHVCQUFlLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUUsQ0FDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyIsImZpbGUiOiJjb3R0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgQ29tcG9zaXRvciBmcm9tIFwiLi9jb21wb3NpdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdG9yIHtcbiAgY29udGV4dDogYW55O1xuICBjb21wb3NpdG9yOiBDb21wb3NpdG9yO1xuICBkZWx0YVRpbWU6IG51bWJlcjtcbiAgbGFzdFRpbWU6IG51bWJlcjtcbiAgYWNjdW11bGF0ZWRUaW1lOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9zaXRvcjogQ29tcG9zaXRvcixcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gNjBcbiAgKSB7XG4gICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgIHRoaXMuZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuXG4gICAgdGhpcy5jb21wb3NpdG9yID0gY29tcG9zaXRvcjtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgZW5xdWV1ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSArPSAodGltZSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcblxuICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkVGltZSA+IDEpIHtcbiAgICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lID0gMTtcbiAgICB9XG5cbiAgICB3aGlsZSAodGhpcy5hY2N1bXVsYXRlZFRpbWUgPiB0aGlzLmRlbHRhVGltZSkge1xuICAgICAgdGhpcy5hbmltYXRlKHRoaXMuZGVsdGFUaW1lKTtcbiAgICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lIC09IHRoaXMuZGVsdGFUaW1lO1xuICAgIH1cblxuICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xuXG4gICAgdGhpcy5lbnF1ZXVlKCk7XG4gIH1cblxuICBhbmltYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jb21wb3NpdG9yLnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgIHRoaXMuY29tcG9zaXRvci5kcmF3KHRoaXMuY29udGV4dCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmVucXVldWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IExheWVyIGZyb20gJy4vbGF5ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NpdG9yIHtcbiAgYnVmZmVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBidWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICBsYXllcnM6IExheWVyW107XG5cbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGxheWVyczogTGF5ZXJbXSA9IFtdKSB7XG4gICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuYnVmZmVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQgPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyKSB7XG4gICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLnVwZGF0ZShkZWx0YVRpbWUpKTtcbiAgfVxuXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsYXllciA9PiBsYXllci5kcmF3KHRoaXMuYnVmZmVyQ29udGV4dCkpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQm91bmRpbmdCb3gsIFZlYyB9IGZyb20gXCIuL3V0aWwvbWF0aFwiO1xuaW1wb3J0IFRyYWl0IGZyb20gXCIuL3RyYWl0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHJhaXRzOiB7IFtpZDogc3RyaW5nXTogVHJhaXQgfTtcblxuICBsaWZldGltZTogbnVtYmVyO1xuICBzaXplOiBWZWM7XG4gIHZlbDogVmVjO1xuICBwb3M6IFZlYztcblxuICBib3VuZHM6IEJvdW5kaW5nQm94O1xuXG4gIGNvbnN0cnVjdG9yKHRyYWl0czogVHJhaXRbXSA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gXCJlbnRpdHlcIjtcblxuICAgIHRoaXMucG9zID0gbmV3IFZlYygwLCAwKTtcbiAgICB0aGlzLnZlbCA9IG5ldyBWZWMoMCwgMCk7XG4gICAgdGhpcy5zaXplID0gbmV3IFZlYygwLCAwKTtcblxuICAgIHRoaXMubGlmZXRpbWUgPSAwO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHMoKTtcbiAgICB0aGlzLmluaXRpYWxpc2VUcmFpdHModHJhaXRzKTtcbiAgfVxuXG4gIGluaXRpYWxpc2VUcmFpdHModHJhaXRzOiBUcmFpdFtdKTogdm9pZCB7XG4gICAgdHJhaXRzLmZvckVhY2godHJhaXQgPT4ge1xuICAgICAgdGhpcy50cmFpdHNbdHJhaXQuZ2V0TmFtZSgpXSA9IHRyYWl0O1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlQm91bmRzKCkge1xuICAgIHRoaXMuYm91bmRzID0gbmV3IEJvdW5kaW5nQm94KHRoaXMucG9zLCB0aGlzLnNpemUpO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVGhpcyBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgKCR7dGhpcy5uYW1lfSlgXG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIGZvciAodmFyIHRyYWl0IGluIHRoaXMudHJhaXRzKSB7XG4gICAgICB0aGlzLnRyYWl0c1t0cmFpdF0udXBkYXRlKHRoaXMsIGRlbHRhVGltZSk7XG4gICAgfVxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGFUaW1lO1xuICB9XG59XG4iLCJpbXBvcnQgdXRpbCBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgTGF5ZXIgZnJvbSBcIi4vbGF5ZXJcIjtcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgQW5pbWF0b3IgZnJvbSBcIi4vYW5pbWF0b3JcIjtcbmltcG9ydCBDb21wb3NpdG9yIGZyb20gXCIuL2NvbXBvc2l0b3JcIjtcblxuZXhwb3J0IHtcbiAgdXRpbCxcbiAgTGF5ZXIsXG4gIEVudGl0eSxcbiAgQW5pbWF0b3IsXG4gIENvbXBvc2l0b3Jcbn07XG4iLCJpbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciB7XG4gIGVudGl0aWVzOiBFbnRpdHlbXTtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGJ1ZmZlcjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGJ1ZmZlckNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZW50aXRpZXM6IEVudGl0eVtdID0gW10pIHtcbiAgICB0aGlzLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIHRoaXMuYnVmZmVyLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuYnVmZmVyQ29udGV4dCA9IHRoaXMuYnVmZmVyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4gZW50aXR5LnVwZGF0ZShkZWx0YVRpbWUpKTtcbiAgfVxuXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgdGhpcy5idWZmZXJDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5lbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiBlbnRpdHkuZHJhdygpKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlciwgMCwgMCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvdHRvbkltYWdlIHtcbiAgbG9hZEltYWdlKHVybDogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgfSk7XG4gICAgICBpbWcuc3JjID0gdXJsO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgaW1hZ2UgZnJvbSBcIi4vaW1hZ2VcIjtcbmltcG9ydCBqc29uIGZyb20gXCIuL2pzb25cIjtcbmltcG9ydCB7IEJvdW5kaW5nQm94LCBnZXRSYW5kb21OdW1iZXIsIFZlYyB9IGZyb20gXCIuL21hdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihpbWFnZSwganNvbiwge1xuICBCb3VuZGluZ0JveCxcbiAgZ2V0UmFuZG9tTnVtYmVyLFxuICBWZWNcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnNvbiB7XG4gIGxvYWRKc29uKHVybDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ociA9PiByLmpzb24oKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCb3VuZGluZ0JveCB7XG4gIHNpemU6IFZlYztcbiAgcG9zOiBWZWM7XG5cbiAgY29uc3RydWN0b3IocG9zOiBWZWMsIHNpemU6IFZlYykge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICBvdmVybGFwcyhib3g6IEJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYm90dG9tID4gYm94LnRvcCAmJlxuICAgICAgdGhpcy50b3AgPCBib3guYm90dG9tICYmXG4gICAgICB0aGlzLmxlZnQgPCBib3gucmlnaHQgJiZcbiAgICAgIHRoaXMucmlnaHQgPiBib3gubGVmdFxuICAgICk7XG4gIH1cblxuICBnZXQgYm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLnBvcy55ICsgdGhpcy5zaXplLnk7XG4gIH1cblxuICBzZXQgYm90dG9tKHkpIHtcbiAgICB0aGlzLnBvcy55ID0geSAtIHRoaXMuc2l6ZS55O1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueTtcbiAgfVxuXG4gIHNldCB0b3AoeSkge1xuICAgIHRoaXMucG9zLnkgPSB5O1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLng7XG4gIH1cblxuICBzZXQgbGVmdCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHg7XG4gIH1cblxuICBnZXQgcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLnggKyB0aGlzLnNpemUueDtcbiAgfVxuXG4gIHNldCByaWdodCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHggLSB0aGlzLnNpemUueDtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFZlYyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXQoeCwgeSk7XG4gIH1cblxuICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbU51bWJlciA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+XG4gIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=