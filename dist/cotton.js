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
const index_1 = __webpack_require__(/*! ./util/index */ "./src/util/index.ts");
const layer_1 = __webpack_require__(/*! ./layer */ "./src/layer.ts");
const entity_1 = __webpack_require__(/*! ./entity */ "./src/entity.ts");
const animator_1 = __webpack_require__(/*! ./animator */ "./src/animator.ts");
const compositor_1 = __webpack_require__(/*! ./compositor */ "./src/compositor.ts");
exports.default = {
    util: index_1.default,
    Layer: layer_1.default,
    Entity: entity_1.default,
    Animator: animator_1.default,
    Compositor: compositor_1.default
};


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
exports.default = {
    image: image_1.default,
    json: json_1.default,
    BoundingBox: math_1.BoundingBox,
    getRandomNumber: math_1.getRandomNumber,
    Vec: math_1.Vec,
};


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbWFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9qc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtJQU9FLFlBQ0UsVUFBc0IsRUFDdEIsT0FBaUMsRUFDakMsWUFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxD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QUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQVpELGtCQVlDO0FBRVksdUJBQWUsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUMxRCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6ImNvdHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBDb21wb3NpdG9yIGZyb20gXCIuL2NvbXBvc2l0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3Ige1xuICBjb250ZXh0OiBhbnk7XG4gIGNvbXBvc2l0b3I6IENvbXBvc2l0b3I7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xuICBsYXN0VGltZTogbnVtYmVyO1xuICBhY2N1bXVsYXRlZFRpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb21wb3NpdG9yOiBDb21wb3NpdG9yLFxuICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBkZWx0YVRpbWU6IG51bWJlciA9IDEgLyA2MFxuICApIHtcbiAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSA9IDA7XG4gICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgdGhpcy5kZWx0YVRpbWUgPSBkZWx0YVRpbWU7XG5cbiAgICB0aGlzLmNvbXBvc2l0b3IgPSBjb21wb3NpdG9yO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICBlbnF1ZXVlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lICs9ICh0aW1lIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuXG4gICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRUaW1lID4gMSkge1xuICAgICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgPSAxO1xuICAgIH1cblxuICAgIHdoaWxlICh0aGlzLmFjY3VtdWxhdGVkVGltZSA+IHRoaXMuZGVsdGFUaW1lKSB7XG4gICAgICB0aGlzLmFuaW1hdGUodGhpcy5kZWx0YVRpbWUpO1xuICAgICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgLT0gdGhpcy5kZWx0YVRpbWU7XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG5cbiAgICB0aGlzLmVucXVldWUoKTtcbiAgfVxuXG4gIGFuaW1hdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbXBvc2l0b3IudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgdGhpcy5jb21wb3NpdG9yLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuZW5xdWV1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgTGF5ZXIgZnJvbSAnLi9sYXllcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2l0b3Ige1xuICBidWZmZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGJ1ZmZlcjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGxheWVyczogTGF5ZXJbXTtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbGF5ZXJzOiBMYXllcltdID0gW10pIHtcbiAgICB0aGlzLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuYnVmZmVyLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuYnVmZmVyQ29udGV4dCA9IHRoaXMuYnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBhZGRMYXllcihsYXllcjogTGF5ZXIpIHtcbiAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gbGF5ZXIudXBkYXRlKGRlbHRhVGltZSkpO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLmRyYXcodGhpcy5idWZmZXJDb250ZXh0KSk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIsIDAsIDApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCb3VuZGluZ0JveCwgVmVjIH0gZnJvbSBcIi4vdXRpbC9tYXRoXCI7XG5pbXBvcnQgVHJhaXQgZnJvbSBcIi4vdHJhaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0cmFpdHM6IHsgW2lkOiBzdHJpbmddOiBUcmFpdCB9O1xuXG4gIGxpZmV0aW1lOiBudW1iZXI7XG4gIHNpemU6IFZlYztcbiAgdmVsOiBWZWM7XG4gIHBvczogVmVjO1xuXG4gIGJvdW5kczogQm91bmRpbmdCb3g7XG5cbiAgY29uc3RydWN0b3IodHJhaXRzOiBUcmFpdFtdID0gW10pIHtcbiAgICB0aGlzLm5hbWUgPSBcImVudGl0eVwiO1xuXG4gICAgdGhpcy5wb3MgPSBuZXcgVmVjKDAsIDApO1xuICAgIHRoaXMudmVsID0gbmV3IFZlYygwLCAwKTtcbiAgICB0aGlzLnNpemUgPSBuZXcgVmVjKDAsIDApO1xuXG4gICAgdGhpcy5saWZldGltZSA9IDA7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kcygpO1xuICAgIHRoaXMuaW5pdGlhbGlzZVRyYWl0cyh0cmFpdHMpO1xuICB9XG5cbiAgaW5pdGlhbGlzZVRyYWl0cyh0cmFpdHM6IFRyYWl0W10pOiB2b2lkIHtcbiAgICB0cmFpdHMuZm9yRWFjaCh0cmFpdCA9PiB7XG4gICAgICB0aGlzLnRyYWl0c1t0cmFpdC5nZXROYW1lKCldID0gdHJhaXQ7XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVCb3VuZHMoKSB7XG4gICAgdGhpcy5ib3VuZHMgPSBuZXcgQm91bmRpbmdCb3godGhpcy5wb3MsIHRoaXMuc2l6ZSk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBUaGlzIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyAoJHt0aGlzLm5hbWV9KWBcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgZm9yICh2YXIgdHJhaXQgaW4gdGhpcy50cmFpdHMpIHtcbiAgICAgIHRoaXMudHJhaXRzW3RyYWl0XS51cGRhdGUodGhpcywgZGVsdGFUaW1lKTtcbiAgICB9XG4gICAgdGhpcy5saWZldGltZSArPSBkZWx0YVRpbWU7XG4gIH1cbn1cbiIsImltcG9ydCB1dGlsIGZyb20gXCIuL3V0aWwvaW5kZXhcIjtcbmltcG9ydCBMYXllciBmcm9tIFwiLi9sYXllclwiO1xuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCBBbmltYXRvciBmcm9tIFwiLi9hbmltYXRvclwiO1xuaW1wb3J0IENvbXBvc2l0b3IgZnJvbSBcIi4vY29tcG9zaXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHV0aWwsXG4gIExheWVyLFxuICBFbnRpdHksXG4gIEFuaW1hdG9yLFxuICBDb21wb3NpdG9yXG59O1xuIiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIge1xuICBlbnRpdGllczogRW50aXR5W107XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBidWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICBidWZmZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGVudGl0aWVzOiBFbnRpdHlbXSA9IFtdKSB7XG4gICAgdGhpcy5lbnRpdGllcyA9IGVudGl0aWVzO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuYnVmZmVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQgPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KFwiMmRcIik7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IGVudGl0eS51cGRhdGUoZGVsdGFUaW1lKSk7XG4gIH1cblxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMuYnVmZmVyQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4gZW50aXR5LmRyYXcoKSk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIsIDAsIDApO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3R0b25JbWFnZSB7XG4gIGxvYWRJbWFnZSh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgIH0pO1xuICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGltYWdlIGZyb20gXCIuL2ltYWdlXCI7XG5pbXBvcnQganNvbiBmcm9tIFwiLi9qc29uXCI7XG5pbXBvcnQgeyBCb3VuZGluZ0JveCwgZ2V0UmFuZG9tTnVtYmVyLCBWZWMgfSBmcm9tIFwiLi9tYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW1hZ2UsXG4gIGpzb24sXG4gIEJvdW5kaW5nQm94LFxuICBnZXRSYW5kb21OdW1iZXIsXG4gIFZlYyxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uIHtcbiAgbG9hZEpzb24odXJsOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihyID0+IHIuanNvbigpKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEJvdW5kaW5nQm94IHtcbiAgc2l6ZTogVmVjO1xuICBwb3M6IFZlYztcblxuICBjb25zdHJ1Y3Rvcihwb3M6IFZlYywgc2l6ZTogVmVjKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIG92ZXJsYXBzKGJveDogQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5ib3R0b20gPiBib3gudG9wICYmXG4gICAgICB0aGlzLnRvcCA8IGJveC5ib3R0b20gJiZcbiAgICAgIHRoaXMubGVmdCA8IGJveC5yaWdodCAmJlxuICAgICAgdGhpcy5yaWdodCA+IGJveC5sZWZ0XG4gICAgKTtcbiAgfVxuXG4gIGdldCBib3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLnkgKyB0aGlzLnNpemUueTtcbiAgfVxuXG4gIHNldCBib3R0b20oeSkge1xuICAgIHRoaXMucG9zLnkgPSB5IC0gdGhpcy5zaXplLnk7XG4gIH1cblxuICBnZXQgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLnBvcy55O1xuICB9XG5cbiAgc2V0IHRvcCh5KSB7XG4gICAgdGhpcy5wb3MueSA9IHk7XG4gIH1cblxuICBnZXQgbGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueDtcbiAgfVxuXG4gIHNldCBsZWZ0KHgpIHtcbiAgICB0aGlzLnBvcy54ID0geDtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueCArIHRoaXMuc2l6ZS54O1xuICB9XG5cbiAgc2V0IHJpZ2h0KHgpIHtcbiAgICB0aGlzLnBvcy54ID0geCAtIHRoaXMuc2l6ZS54O1xuICB9XG59XG5leHBvcnQgY2xhc3MgVmVjIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldCh4LCB5KTtcbiAgfVxuXG4gIHNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tTnVtYmVyID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT5cbiAgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==