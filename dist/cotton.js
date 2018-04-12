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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/index */ "./src/util/index.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity */ "./src/entity.ts");
/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animator */ "./src/animator.ts");
/* harmony import */ var _compositor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compositor */ "./src/compositor.ts");





/* harmony default export */ __webpack_exports__["default"] = ({
    util: _util_index__WEBPACK_IMPORTED_MODULE_0__["default"],
    Layer: _layer__WEBPACK_IMPORTED_MODULE_1__["default"],
    Entity: _entity__WEBPACK_IMPORTED_MODULE_2__["default"],
    Animator: _animator__WEBPACK_IMPORTED_MODULE_3__["default"],
    Compositor: _compositor__WEBPACK_IMPORTED_MODULE_4__["default"]
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuaW1hdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9jb21wb3NpdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9sYXllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbWFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9qc29uLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL21hdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pFYztJQU9aLFlBQ0UsVUFBc0IsRUFDdEIsT0FBaUMsRUFDakMsWUFBb0IsQ0FBQyxHQUFHLEVBQUU7UUFFMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFdEQsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN4QztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsT0FBTyxDQUFDLFNBQWlCO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQ2pEYTtJQUtaLFlBQVksS0FBYSxFQUFFLE1BQWMsRUFBRSxTQUFrQixFQUFFO1FBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFZO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBaUI7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDN0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQjhDO0FBR2pDO0lBV1osWUFBWSxTQUFrQixFQUFFO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSw4Q0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksOENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLDhDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELGdCQUFnQixDQUFDLE1BQWU7UUFDOUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHNEQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNLElBQUksS0FBSyxDQUNiLG9EQUFvRCxJQUFJLENBQUMsSUFBSSxHQUFHLENBQ2pFLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQWlCO1FBQ3RCLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRCtCO0FBQ0o7QUFDRTtBQUNJO0FBQ0k7QUFFdEMsK0RBQWU7SUFDYix5REFBSTtJQUNKLHFEQUFLO0lBQ0wsdURBQU07SUFDTiwyREFBUTtJQUNSLCtEQUFVO0NBQ1gsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDVlk7SUFPWixZQUFZLEtBQWEsRUFBRSxNQUFjLEVBQUUsV0FBcUIsRUFBRTtRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxNQUFNLENBQUMsU0FBaUI7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFpQztRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0Y7Ozs7Ozs7Ozs7Ozs7OztBQzdCYTtJQUNaLFNBQVMsQ0FBQyxHQUFXO1FBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWMkI7QUFDRjtBQUNpQztBQUUzRCwrREFBZTtJQUNiLHFEQUFLO0lBQ0wsbURBQUk7SUFDSiw4REFBVztJQUNYLHNFQUFlO0lBQ2YsOENBQUc7Q0FDSixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNWWTtJQUNaLFFBQVEsQ0FBQyxHQUFXO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKSztJQUlKLFlBQVksR0FBUSxFQUFFLElBQVM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWdCO1FBQ3ZCLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHO1lBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU07WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSztZQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQ3RCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFDSztJQUlKLFlBQVksQ0FBUyxFQUFFLENBQVM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUztRQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztDQUNGO0FBRU0sTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEVBQUUsQ0FDMUQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyIsImZpbGUiOiJjb3R0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgQ29tcG9zaXRvciBmcm9tIFwiLi9jb21wb3NpdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdG9yIHtcbiAgY29udGV4dDogYW55O1xuICBjb21wb3NpdG9yOiBDb21wb3NpdG9yO1xuICBkZWx0YVRpbWU6IG51bWJlcjtcbiAgbGFzdFRpbWU6IG51bWJlcjtcbiAgYWNjdW11bGF0ZWRUaW1lOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY29tcG9zaXRvcjogQ29tcG9zaXRvcixcbiAgICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gNjBcbiAgKSB7XG4gICAgdGhpcy5hY2N1bXVsYXRlZFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgIHRoaXMuZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuXG4gICAgdGhpcy5jb21wb3NpdG9yID0gY29tcG9zaXRvcjtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgZW5xdWV1ZSgpIHtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjY3VtdWxhdGVkVGltZSArPSAodGltZSAtIHRoaXMubGFzdFRpbWUpIC8gMTAwMDtcblxuICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkVGltZSA+IDEpIHtcbiAgICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lID0gMTtcbiAgICB9XG5cbiAgICB3aGlsZSAodGhpcy5hY2N1bXVsYXRlZFRpbWUgPiB0aGlzLmRlbHRhVGltZSkge1xuICAgICAgdGhpcy5hbmltYXRlKHRoaXMuZGVsdGFUaW1lKTtcbiAgICAgIHRoaXMuYWNjdW11bGF0ZWRUaW1lIC09IHRoaXMuZGVsdGFUaW1lO1xuICAgIH1cblxuICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xuXG4gICAgdGhpcy5lbnF1ZXVlKCk7XG4gIH1cblxuICBhbmltYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5jb21wb3NpdG9yLnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgIHRoaXMuY29tcG9zaXRvci5kcmF3KHRoaXMuY29udGV4dCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLmVucXVldWUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IExheWVyIGZyb20gJy4vbGF5ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb3NpdG9yIHtcbiAgYnVmZmVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBidWZmZXI6IEhUTUxDYW52YXNFbGVtZW50O1xuICBsYXllcnM6IExheWVyW107XG5cbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGxheWVyczogTGF5ZXJbXSA9IFtdKSB7XG4gICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLmJ1ZmZlci53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuYnVmZmVyLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQgPSB0aGlzLmJ1ZmZlci5nZXRDb250ZXh0KCcyZCcpO1xuICB9XG5cbiAgYWRkTGF5ZXIobGF5ZXI6IExheWVyKSB7XG4gICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG4gIH1cblxuICB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IGxheWVyLnVwZGF0ZShkZWx0YVRpbWUpKTtcbiAgfVxuXG4gIGRyYXcoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsYXllciA9PiBsYXllci5kcmF3KHRoaXMuYnVmZmVyQ29udGV4dCkpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQm91bmRpbmdCb3gsIFZlYyB9IGZyb20gXCIuL3V0aWwvbWF0aFwiO1xuaW1wb3J0IFRyYWl0IGZyb20gXCIuL3RyYWl0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHJhaXRzOiB7IFtpZDogc3RyaW5nXTogVHJhaXQgfTtcblxuICBsaWZldGltZTogbnVtYmVyO1xuICBzaXplOiBWZWM7XG4gIHZlbDogVmVjO1xuICBwb3M6IFZlYztcblxuICBib3VuZHM6IEJvdW5kaW5nQm94O1xuXG4gIGNvbnN0cnVjdG9yKHRyYWl0czogVHJhaXRbXSA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gXCJlbnRpdHlcIjtcblxuICAgIHRoaXMucG9zID0gbmV3IFZlYygwLCAwKTtcbiAgICB0aGlzLnZlbCA9IG5ldyBWZWMoMCwgMCk7XG4gICAgdGhpcy5zaXplID0gbmV3IFZlYygwLCAwKTtcblxuICAgIHRoaXMubGlmZXRpbWUgPSAwO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHMoKTtcbiAgICB0aGlzLmluaXRpYWxpc2VUcmFpdHModHJhaXRzKTtcbiAgfVxuXG4gIGluaXRpYWxpc2VUcmFpdHModHJhaXRzOiBUcmFpdFtdKTogdm9pZCB7XG4gICAgdHJhaXRzLmZvckVhY2godHJhaXQgPT4ge1xuICAgICAgdGhpcy50cmFpdHNbdHJhaXQuZ2V0TmFtZSgpXSA9IHRyYWl0O1xuICAgIH0pO1xuICB9XG5cbiAgY2FsY3VsYXRlQm91bmRzKCkge1xuICAgIHRoaXMuYm91bmRzID0gbmV3IEJvdW5kaW5nQm94KHRoaXMucG9zLCB0aGlzLnNpemUpO1xuICB9XG5cbiAgZHJhdygpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgVGhpcyBuZWVkcyB0byBiZSBpbXBsZW1lbnRlZCBieSB0aGUgY2hpbGQgY2xhc3MgKCR7dGhpcy5uYW1lfSlgXG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcikge1xuICAgIGZvciAodmFyIHRyYWl0IGluIHRoaXMudHJhaXRzKSB7XG4gICAgICB0aGlzLnRyYWl0c1t0cmFpdF0udXBkYXRlKHRoaXMsIGRlbHRhVGltZSk7XG4gICAgfVxuICAgIHRoaXMubGlmZXRpbWUgKz0gZGVsdGFUaW1lO1xuICB9XG59XG4iLCJpbXBvcnQgdXRpbCBmcm9tIFwiLi91dGlsL2luZGV4XCI7XG5pbXBvcnQgTGF5ZXIgZnJvbSBcIi4vbGF5ZXJcIjtcbmltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5pbXBvcnQgQW5pbWF0b3IgZnJvbSBcIi4vYW5pbWF0b3JcIjtcbmltcG9ydCBDb21wb3NpdG9yIGZyb20gXCIuL2NvbXBvc2l0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB1dGlsLFxuICBMYXllcixcbiAgRW50aXR5LFxuICBBbmltYXRvcixcbiAgQ29tcG9zaXRvclxufTtcbiIsImltcG9ydCBFbnRpdHkgZnJvbSBcIi4vZW50aXR5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExheWVyIHtcbiAgZW50aXRpZXM6IEVudGl0eVtdO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgYnVmZmVyOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgYnVmZmVyQ29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG4gIGNvbnN0cnVjdG9yKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBlbnRpdGllczogRW50aXR5W10gPSBbXSkge1xuICAgIHRoaXMuZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5idWZmZXIud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmJ1ZmZlci5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5idWZmZXJDb250ZXh0ID0gdGhpcy5idWZmZXIuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB9XG5cbiAgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy5lbnRpdGllcy5mb3JFYWNoKGVudGl0eSA9PiBlbnRpdHkudXBkYXRlKGRlbHRhVGltZSkpO1xuICB9XG5cbiAgZHJhdyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICB0aGlzLmJ1ZmZlckNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmVudGl0aWVzLmZvckVhY2goZW50aXR5ID0+IGVudGl0eS5kcmF3KCkpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLCAwLCAwKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ290dG9uSW1hZ2Uge1xuICBsb2FkSW1hZ2UodXJsOiBzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlKGltZyk7XG4gICAgICB9KTtcbiAgICAgIGltZy5zcmMgPSB1cmw7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBpbWFnZSBmcm9tIFwiLi9pbWFnZVwiO1xuaW1wb3J0IGpzb24gZnJvbSBcIi4vanNvblwiO1xuaW1wb3J0IHsgQm91bmRpbmdCb3gsIGdldFJhbmRvbU51bWJlciwgVmVjIH0gZnJvbSBcIi4vbWF0aFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGltYWdlLFxuICBqc29uLFxuICBCb3VuZGluZ0JveCxcbiAgZ2V0UmFuZG9tTnVtYmVyLFxuICBWZWMsXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSnNvbiB7XG4gIGxvYWRKc29uKHVybDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBmZXRjaCh1cmwpLnRoZW4ociA9PiByLmpzb24oKSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCb3VuZGluZ0JveCB7XG4gIHNpemU6IFZlYztcbiAgcG9zOiBWZWM7XG5cbiAgY29uc3RydWN0b3IocG9zOiBWZWMsIHNpemU6IFZlYykge1xuICAgIHRoaXMucG9zID0gcG9zO1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gIH1cblxuICBvdmVybGFwcyhib3g6IEJvdW5kaW5nQm94KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYm90dG9tID4gYm94LnRvcCAmJlxuICAgICAgdGhpcy50b3AgPCBib3guYm90dG9tICYmXG4gICAgICB0aGlzLmxlZnQgPCBib3gucmlnaHQgJiZcbiAgICAgIHRoaXMucmlnaHQgPiBib3gubGVmdFxuICAgICk7XG4gIH1cblxuICBnZXQgYm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLnBvcy55ICsgdGhpcy5zaXplLnk7XG4gIH1cblxuICBzZXQgYm90dG9tKHkpIHtcbiAgICB0aGlzLnBvcy55ID0geSAtIHRoaXMuc2l6ZS55O1xuICB9XG5cbiAgZ2V0IHRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wb3MueTtcbiAgfVxuXG4gIHNldCB0b3AoeSkge1xuICAgIHRoaXMucG9zLnkgPSB5O1xuICB9XG5cbiAgZ2V0IGxlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLng7XG4gIH1cblxuICBzZXQgbGVmdCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHg7XG4gIH1cblxuICBnZXQgcmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zLnggKyB0aGlzLnNpemUueDtcbiAgfVxuXG4gIHNldCByaWdodCh4KSB7XG4gICAgdGhpcy5wb3MueCA9IHggLSB0aGlzLnNpemUueDtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFZlYyB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZXQoeCwgeSk7XG4gIH1cblxuICBzZXQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldFJhbmRvbU51bWJlciA9IChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+XG4gIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=