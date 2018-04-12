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



const util = Object.assign(_image__WEBPACK_IMPORTED_MODULE_0__["default"], _json__WEBPACK_IMPORTED_MODULE_1__["default"], {
    BoundingBox: _math__WEBPACK_IMPORTED_MODULE_2__["BoundingBox"],
    getRandomNumber: _math__WEBPACK_IMPORTED_MODULE_2__["getRandomNumber"],
    Vec: _math__WEBPACK_IMPORTED_MODULE_2__["Vec"]
});
/* harmony default export */ __webpack_exports__["default"] = (util);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbWFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9qc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFYztJQU9aLFlBQ0UsVUFBc0IsRUFDdEIsT0FBaUMsRUFDakMsWUFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxD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ZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IENvbXBvc2l0b3IgZnJvbSBcIi4vY29tcG9zaXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRvciB7XG4gIGNvbnRleHQ6IGFueTtcbiAgY29tcG9zaXRvcjogQ29tcG9zaXRvcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG4gIGxhc3RUaW1lOiBudW1iZXI7XG4gIGFjY3VtdWxhdGVkVGltZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbXBvc2l0b3I6IENvbXBvc2l0b3IsXG4gICAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgIGRlbHRhVGltZTogbnVtYmVyID0gMSAvIDYwXG4gICkge1xuICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lID0gMDtcbiAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICB0aGlzLmRlbHRhVGltZSA9IGRlbHRhVGltZTtcblxuICAgIHRoaXMuY29tcG9zaXRvciA9IGNvbXBvc2l0b3I7XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIGVucXVldWUoKSB7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG4gIH1cblxuICB1cGRhdGUodGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgKz0gKHRpbWUgLSB0aGlzLmxhc3RUaW1lKSAvIDEwMDA7XG5cbiAgICBpZiAodGhpcy5hY2N1bXVsYXRlZFRpbWUgPiAxKSB7XG4gICAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSA9IDE7XG4gICAgfVxuXG4gICAgd2hpbGUgKHRoaXMuYWNjdW11bGF0ZWRUaW1lID4gdGhpcy5kZWx0YVRpbWUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZSh0aGlzLmRlbHRhVGltZSk7XG4gICAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSAtPSB0aGlzLmRlbHRhVGltZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RUaW1lID0gdGltZTtcblxuICAgIHRoaXMuZW5xdWV1ZSgpO1xuICB9XG5cbiAgYW5pbWF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIHRoaXMuY29tcG9zaXRvci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICB0aGlzLmNvbXBvc2l0b3IuZHJhdyh0aGlzLmNvbnRleHQpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5lbnF1ZXVlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBMYXllciBmcm9tICcuL2xheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9zaXRvciB7XG4gIGJ1ZmZlckNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgYnVmZmVyOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgbGF5ZXJzOiBMYXllcltdO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBsYXllcnM6IExheWVyW10gPSBbXSkge1xuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzO1xuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5idWZmZXIud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmJ1ZmZlci5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5idWZmZXJDb250ZXh0ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dCgnMmQnKTtcbiAgfVxuXG4gIGFkZExheWVyKGxheWVyOiBMYXllcikge1xuICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsYXllciA9PiBsYXllci51cGRhdGUoZGVsdGFUaW1lKSk7XG4gIH1cblxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gbGF5ZXIuZHJhdyh0aGlzLmJ1ZmZlckNvbnRleHQpKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlciwgMCwgMCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJvdW5kaW5nQm94LCBWZWMgfSBmcm9tIFwiLi91dGlsL21hdGhcIjtcbmltcG9ydCBUcmFpdCBmcm9tIFwiLi90cmFpdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHkge1xuICBuYW1lOiBzdHJpbmc7XG4gIHRyYWl0czogeyBbaWQ6IHN0cmluZ106IFRyYWl0IH07XG5cbiAgbGlmZXRpbWU6IG51bWJlcjtcbiAgc2l6ZTogVmVjO1xuICB2ZWw6IFZlYztcbiAgcG9zOiBWZWM7XG5cbiAgYm91bmRzOiBCb3VuZGluZ0JveDtcblxuICBjb25zdHJ1Y3Rvcih0cmFpdHM6IFRyYWl0W10gPSBbXSkge1xuICAgIHRoaXMubmFtZSA9IFwiZW50aXR5XCI7XG5cbiAgICB0aGlzLnBvcyA9IG5ldyBWZWMoMCwgMCk7XG4gICAgdGhpcy52ZWwgPSBuZXcgVmVjKDAsIDApO1xuICAgIHRoaXMuc2l6ZSA9IG5ldyBWZWMoMCwgMCk7XG5cbiAgICB0aGlzLmxpZmV0aW1lID0gMDtcblxuICAgIHRoaXMuY2FsY3VsYXRlQm91bmRzKCk7XG4gICAgdGhpcy5pbml0aWFsaXNlVHJhaXRzKHRyYWl0cyk7XG4gIH1cblxuICBpbml0aWFsaXNlVHJhaXRzKHRyYWl0czogVHJhaXRbXSk6IHZvaWQge1xuICAgIHRyYWl0cy5mb3JFYWNoKHRyYWl0ID0+IHtcbiAgICAgIHRoaXMudHJhaXRzW3RyYWl0LmdldE5hbWUoKV0gPSB0cmFpdDtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUJvdW5kcygpIHtcbiAgICB0aGlzLmJvdW5kcyA9IG5ldyBCb3VuZGluZ0JveCh0aGlzLnBvcywgdGhpcy5zaXplKTtcbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYFRoaXMgbmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQgYnkgdGhlIGNoaWxkIGNsYXNzICgke3RoaXMubmFtZX0pYFxuICAgICk7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICBmb3IgKHZhciB0cmFpdCBpbiB0aGlzLnRyYWl0cykge1xuICAgICAgdGhpcy50cmFpdHNbdHJhaXRdLnVwZGF0ZSh0aGlzLCBkZWx0YVRpbWUpO1xuICAgIH1cbiAgICB0aGlzLmxpZmV0aW1lICs9IGRlbHRhVGltZTtcbiAgfVxufVxuIiwiaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC9pbmRleFwiO1xuaW1wb3J0IExheWVyIGZyb20gXCIuL2xheWVyXCI7XG5pbXBvcnQgRW50aXR5IGZyb20gXCIuL2VudGl0eVwiO1xuaW1wb3J0IEFuaW1hdG9yIGZyb20gXCIuL2FuaW1hdG9yXCI7XG5pbXBvcnQgQ29tcG9zaXRvciBmcm9tIFwiLi9jb21wb3NpdG9yXCI7XG5cbmV4cG9ydCB7XG4gIHV0aWwsXG4gIExheWVyLFxuICBFbnRpdHksXG4gIEFuaW1hdG9yLFxuICBDb21wb3NpdG9yXG59O1xuIiwiaW1wb3J0IEVudGl0eSBmcm9tIFwiLi9lbnRpdHlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXIge1xuICBlbnRpdGllczogRW50aXR5W107XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBidWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICBidWZmZXJDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGVudGl0aWVzOiBFbnRpdHlbXSA9IFtdKSB7XG4gICAgdGhpcy5lbnRpdGllcyA9IGVudGl0aWVzO1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuYnVmZmVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQgPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KFwiMmRcIik7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IGVudGl0eS51cGRhdGUoZGVsdGFUaW1lKSk7XG4gIH1cblxuICBkcmF3KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xuICAgIHRoaXMuYnVmZmVyQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuZW50aXRpZXMuZm9yRWFjaChlbnRpdHkgPT4gZW50aXR5LmRyYXcoKSk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIsIDAsIDApO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb3R0b25JbWFnZSB7XG4gIGxvYWRJbWFnZSh1cmw6IHN0cmluZyk6IFByb21pc2U8SFRNTEltYWdlRWxlbWVudD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgIH0pO1xuICAgICAgaW1nLnNyYyA9IHVybDtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGltYWdlIGZyb20gXCIuL2ltYWdlXCI7XG5pbXBvcnQganNvbiBmcm9tIFwiLi9qc29uXCI7XG5pbXBvcnQgeyBCb3VuZGluZ0JveCwgZ2V0UmFuZG9tTnVtYmVyLCBWZWMgfSBmcm9tIFwiLi9tYXRoXCI7XG5cbmNvbnN0IHV0aWwgPSBPYmplY3QuYXNzaWduKGltYWdlLCBqc29uLCB7XG4gIEJvdW5kaW5nQm94LFxuICBnZXRSYW5kb21OdW1iZXIsXG4gIFZlY1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHV0aWw7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBKc29uIHtcbiAgbG9hZEpzb24odXJsOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIGZldGNoKHVybCkudGhlbihyID0+IHIuanNvbigpKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEJvdW5kaW5nQm94IHtcbiAgc2l6ZTogVmVjO1xuICBwb3M6IFZlYztcblxuICBjb25zdHJ1Y3Rvcihwb3M6IFZlYywgc2l6ZTogVmVjKSB7XG4gICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIG92ZXJsYXBzKGJveDogQm91bmRpbmdCb3gpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5ib3R0b20gPiBib3gudG9wICYmXG4gICAgICB0aGlzLnRvcCA8IGJveC5ib3R0b20gJiZcbiAgICAgIHRoaXMubGVmdCA8IGJveC5yaWdodCAmJlxuICAgICAgdGhpcy5yaWdodCA+IGJveC5sZWZ0XG4gICAgKTtcbiAgfVxuXG4gIGdldCBib3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLnkgKyB0aGlzLnNpemUueTtcbiAgfVxuXG4gIHNldCBib3R0b20oeSkge1xuICAgIHRoaXMucG9zLnkgPSB5IC0gdGhpcy5zaXplLnk7XG4gIH1cblxuICBnZXQgdG9wKCkge1xuICAgIHJldHVybiB0aGlzLnBvcy55O1xuICB9XG5cbiAgc2V0IHRvcCh5KSB7XG4gICAgdGhpcy5wb3MueSA9IHk7XG4gIH1cblxuICBnZXQgbGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueDtcbiAgfVxuXG4gIHNldCBsZWZ0KHgpIHtcbiAgICB0aGlzLnBvcy54ID0geDtcbiAgfVxuXG4gIGdldCByaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueCArIHRoaXMuc2l6ZS54O1xuICB9XG5cbiAgc2V0IHJpZ2h0KHgpIHtcbiAgICB0aGlzLnBvcy54ID0geCAtIHRoaXMuc2l6ZS54O1xuICB9XG59XG5leHBvcnQgY2xhc3MgVmVjIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldCh4LCB5KTtcbiAgfVxuXG4gIHNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0UmFuZG9tTnVtYmVyID0gKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT5cbiAgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==