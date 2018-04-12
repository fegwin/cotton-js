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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animator; });
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


/***/ }),

/***/ "./src/compositor.ts":
/*!***************************!*\
  !*** ./src/compositor.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Compositor; });
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


/***/ }),

/***/ "./src/entity.ts":
/*!***********************!*\
  !*** ./src/entity.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/math */ "./src/util/math.ts");

class Entity {
    constructor(traits = []) {
        this.name = "entity";
        this.pos = new _util_math__WEBPACK_IMPORTED_MODULE_0__["Vec"](0, 0);
        this.vel = new _util_math__WEBPACK_IMPORTED_MODULE_0__["Vec"](0, 0);
        this.size = new _util_math__WEBPACK_IMPORTED_MODULE_0__["Vec"](0, 0);
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
        this.bounds = new _util_math__WEBPACK_IMPORTED_MODULE_0__["BoundingBox"](this.pos, this.size);
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


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: util, Layer, Entity, Animator, Compositor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/index */ "./src/util/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "util", function() { return _util_index__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return _layer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity */ "./src/entity.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return _entity__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animator */ "./src/animator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return _animator__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _compositor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compositor */ "./src/compositor.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Compositor", function() { return _compositor__WEBPACK_IMPORTED_MODULE_4__["default"]; });









/***/ }),

/***/ "./src/layer.ts":
/*!**********************!*\
  !*** ./src/layer.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layer; });
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


/***/ }),

/***/ "./src/util/image.ts":
/*!***************************!*\
  !*** ./src/util/image.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CottonImage; });
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


/***/ }),

/***/ "./src/util/index.ts":
/*!***************************!*\
  !*** ./src/util/index.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image */ "./src/util/image.ts");
/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json */ "./src/util/json.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/util/math.ts");



/* harmony default export */ __webpack_exports__["default"] = ({
    image: _image__WEBPACK_IMPORTED_MODULE_0__["default"],
    json: _json__WEBPACK_IMPORTED_MODULE_1__["default"],
    BoundingBox: _math__WEBPACK_IMPORTED_MODULE_2__["BoundingBox"],
    getRandomNumber: _math__WEBPACK_IMPORTED_MODULE_2__["getRandomNumber"],
    Vec: _math__WEBPACK_IMPORTED_MODULE_2__["Vec"],
});


/***/ }),

/***/ "./src/util/json.ts":
/*!**************************!*\
  !*** ./src/util/json.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Json; });
class Json {
    loadJson(url) {
        return fetch(url).then(r => r.json());
    }
}


/***/ }),

/***/ "./src/util/math.ts":
/*!**************************!*\
  !*** ./src/util/math.ts ***!
  \**************************/
/*! exports provided: BoundingBox, Vec, getRandomNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoundingBox", function() { return BoundingBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vec", function() { return Vec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNumber", function() { return getRandomNumber; });
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
class Vec {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
const getRandomNumber = (min, max) => Math.random() * (max - min) + min;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbWFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9qc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFYztJQU9aLFlBQ0UsVUFBc0IsRUFDdEIsT0FBaUMsRUFDakMsWUFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxD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QUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQUNLO0lBSUosWUFBWSxDQUFTLEVBQUUsQ0FBUztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3RCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFFTSxNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUMxRCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6ImNvdHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBDb21wb3NpdG9yIGZyb20gXCIuL2NvbXBvc2l0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0b3Ige1xuICBjb250ZXh0OiBhbnk7XG4gIGNvbXBvc2l0b3I6IENvbXBvc2l0b3I7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xuICBsYXN0VGltZTogbnVtYmVyO1xuICBhY2N1bXVsYXRlZFRpbWU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb21wb3NpdG9yOiBDb21wb3NpdG9yLFxuICAgIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICBkZWx0YVRpbWU6IG51bWJlciA9IDEgLyA2MFxuICApIHtcbiAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSA9IDA7XG4gICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgdGhpcy5kZWx0YVRpbWUgPSBkZWx0YVRpbWU7XG5cbiAgICB0aGlzLmNvbXBvc2l0b3IgPSBjb21wb3NpdG9yO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICBlbnF1ZXVlKCkge1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuICB9XG5cbiAgdXBkYXRlKHRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lICs9ICh0aW1lIC0gdGhpcy5sYXN0VGltZSkgLyAxMDAwO1xuXG4gICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRUaW1lID4gMSkge1xuICAgICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgPSAxO1xuICAgIH1cblxuICAgIHdoaWxlICh0aGlzLmFjY3VtdWxhdGVkVGltZSA+IHRoaXMuZGVsdGFUaW1lKSB7XG4gICAgICB0aGlzLmFuaW1hdGUodGhpcy5kZWx0YVRpbWUpO1xuICAgICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgLT0gdGhpcy5kZWx0YVRpbWU7XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0VGltZSA9IHRpbWU7XG5cbiAgICB0aGlzLmVucXVldWUoKTtcbiAgfVxuXG4gIGFuaW1hdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvbXBvc2l0b3IudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgdGhpcy5jb21wb3NpdG9yLmRyYXcodGhpcy5jb250ZXh0KTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuZW5xdWV1ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgTGF5ZXIgZnJvbSAnLi9sYXllcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvc2l0b3Ige1xuICBidWZmZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIGJ1ZmZlcjogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGxheWVyczogTGF5ZXJbXTtcblxuICBjb25zdHJ1Y3Rvcih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbGF5ZXJzOiBMYXllcltdID0gW10pIHtcbiAgICB0aGlzLmxheWVycyA9IGxheWVycztcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuYnVmZmVyLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5idWZmZXIuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuYnVmZmVyQ29udGV4dCA9IHRoaXMuYnVmZmVyLmdldENvbnRleHQoJzJkJyk7XG4gIH1cblxuICBhZGRMYXllcihsYXllcjogTGF5ZXIpIHtcbiAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gbGF5ZXIudXBkYXRlKGRlbHRhVGltZSkpO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLmRyYXcodGhpcy5idWZmZXJDb250ZXh0KSk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIsIDAsIDApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCb3VuZGluZ0JveCwgVmVjIH0gZnJvbSBcIi4vdXRpbC9tYXRoXCI7XG5pbXBvcnQgVHJhaXQgZnJvbSBcIi4vdHJhaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcbiAgbmFtZTogc3RyaW5nO1xuICB0cmFpdHM6IHsgW2lkOiBzdHJpbmddOiBUcmFpdCB9O1xuXG4gIGxpZmV0aW1lOiBudW1iZXI7XG4gIHNpemU6IFZlYztcbiAgdmVsOiBWZWM7XG4gIHBvczogVmVjO1xuXG4gIGJvdW5kczogQm91bmRpbmdCb3g7XG5cbiAgY29uc3RydWN0b3IodHJhaXRzOiBUcmFpdFtdID0gW10pIHtcbiAgICB0aGlzLm5hbWUgPSBcImVudGl0eVwiO1xuXG4gICAgdGhpcy5wb3MgPSBuZXcgVmVjKDAsIDApO1xuICAgIHRoaXMudmVsID0gbmV3IFZlYygwLCAwKTtcbiAgICB0aGlzLnNpemUgPSBuZXcgVmVjKDAsIDApO1xuXG4gICAgdGhpcy5saWZldGltZSA9IDA7XG5cbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kcygpO1xuICAgIHRoaXMuaW5pdGlhbGlzZVRyYWl0cyh0cmFpdHMpO1xuICB9XG5cbiAgaW5pdGlhbGlzZVRyYWl0cyh0cmFpdHM6IFRyYWl0W10pOiB2b2lkIHtcbiAgICB0cmFpdHMuZm9yRWFjaCh0cmFpdCA9PiB7XG4gICAgICB0aGlzLnRyYWl0c1t0cmFpdC5nZXROYW1lKCldID0gdHJhaXQ7XG4gICAgfSk7XG4gIH1cblxuICBjYWxjdWxhdGVCb3VuZHMoKSB7XG4gICAgdGhpcy5ib3VuZHMgPSBuZXcgQm91bmRpbmdCb3godGhpcy5wb3MsIHRoaXMuc2l6ZSk7XG4gIH1cblxuICBkcmF3KCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBUaGlzIG5lZWRzIHRvIGJlIGltcGxlbWVudGVkIGJ5IHRoZSBjaGlsZCBjbGFzcyAoJHt0aGlzLm5hbWV9KWBcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgZm9yICh2YXIgdHJhaXQgaW4gdGhpcy50cmFpdHMpIHtcbiAgICAgIHRoaXMudHJhaXRzW3RyYWl0XS51cGRhdGUodGhpcywgZGVsdGFUaW1lKTtcbiAgICB9XG4gICAgdGhpcy5saWZldGltZSArPSBkZWx0YVRpbWU7XG4gIH1cbn1cbiIsImltcG9ydCB1dGlsIGZyb20gXCIuL3V0aWwvaW5kZXhcIjtcbmltcG9ydCBMYXllciBmcm9tIFwiLi9sYXllclwiO1xuaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcbmltcG9ydCBBbmltYXRvciBmcm9tIFwiLi9hbmltYXRvclwiO1xuaW1wb3J0IENvbXBvc2l0b3IgZnJvbSBcIi4vY29tcG9zaXRvclwiO1xuXG5leHBvcnQge1xuICB1dGlsLFxuICBMYXllcixcbiAgRW50aXR5LFxuICBBbmltYXRvcixcbiAgQ29tcG9zaXRvclxufTtcbiIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcbiAgZW50aXRpZXM6IEVudGl0eVtdO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgYnVmZmVyOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgYnVmZmVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBlbnRpdGllczogRW50aXR5W10gPSBbXSkge1xuICAgIHRoaXMuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5idWZmZXIud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmJ1ZmZlci5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5idWZmZXJDb250ZXh0ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5lbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiBlbnRpdHkudXBkYXRlKGRlbHRhVGltZSkpO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IGVudGl0eS5kcmF3KCkpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ290dG9uSW1hZ2Uge1xuICBsb2FkSW1hZ2UodXJsOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICB9KTtcbiAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBpbWFnZSBmcm9tIFwiLi9pbWFnZVwiO1xuaW1wb3J0IGpzb24gZnJvbSBcIi4vanNvblwiO1xuaW1wb3J0IHsgQm91bmRpbmdCb3gsIGdldFJhbmRvbU51bWJlciwgVmVjIH0gZnJvbSBcIi4vbWF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGltYWdlLFxuICBqc29uLFxuICBCb3VuZGluZ0JveCxcbiAgZ2V0UmFuZG9tTnVtYmVyLFxuICBWZWMsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnNvbiB7XG4gIGxvYWRKc29uKHVybDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ociA9PiByLmpzb24oKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCb3VuZGluZ0JveCB7XG4gIHNpemU6IFZlYztcbiAgcG9zOiBWZWM7XG5cbiAgY29uc3RydWN0b3IocG9zOiBWZWMsIHNpemU6IFZlYykge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICBvdmVybGFwcyhib3g6IEJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYm90dG9tID4gYm94LnRvcCAmJlxuICAgICAgdGhpcy50b3AgPCBib3guYm90dG9tICYmXG4gICAgICB0aGlzLmxlZnQgPCBib3gucmlnaHQgJiZcbiAgICAgIHRoaXMucmlnaHQgPiBib3gubGVmdFxuICAgICk7XG4gIH1cblxuICBnZXQgYm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLnBvcy55ICsgdGhpcy5zaXplLnk7XG4gIH1cblxuICBzZXQgYm90dG9tKHkpIHtcbiAgICB0aGlzLnBvcy55ID0geSAtIHRoaXMuc2l6ZS55O1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueTtcbiAgfVxuXG4gIHNldCB0b3AoeSkge1xuICAgIHRoaXMucG9zLnkgPSB5O1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLng7XG4gIH1cblxuICBzZXQgbGVmdCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHg7XG4gIH1cblxuICBnZXQgcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLnggKyB0aGlzLnNpemUueDtcbiAgfVxuXG4gIHNldCByaWdodCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHggLSB0aGlzLnNpemUueDtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFZlYyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXQoeCwgeSk7XG4gIH1cblxuICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbU51bWJlciA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+XG4gIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=