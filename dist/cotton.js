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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animator.js":
/*!*************************!*\
  !*** ./src/animator.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Animator; });\nclass Animator {\n  constructor(compositor, context, deltaTime = 1 / 60) {\n    this.accumulatedTime = 0;\n    this.lastTime = 0;\n    this.deltaTime = deltaTime;\n\n    this.compositor = compositor;\n    this.context = context;\n  }\n\n  enqueue() {\n    window.requestAnimationFrame(this.update);\n  }\n\n  update(time) {\n    this.accumulatedTime += (time - this.lastTime) / 1000;\n\n    if (this.accumulatedTime > 1) {\n      this.accumulatedTime = 1;\n    }\n\n    while (this.accumulatedTime > this.deltaTime) {\n      this.animate(this.deltaTime);\n      this.accumulatedTime -= this.deltaTime;\n    }\n\n    this.lastTime = time;\n\n    this.enqueue();\n  }\n\n  animate(deltaTime) {\n    this.compositor.update(deltaTime);\n    this.compositor.draw(this.context);\n  }\n\n  start() {\n    this.enqueue();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/animator.js?");

/***/ }),

/***/ "./src/compositor.js":
/*!***************************!*\
  !*** ./src/compositor.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Compositor; });\nclass Compositor {\n  constructor(width, height, layers = []) {\n    this.layers = layers;\n    this.buffer = document.createElement('canvas');\n    this.buffer.width = width;\n    this.buffer.height = height;\n    this.bufferContext = this.buffer.getContext('2d');\n  }\n\n  addLayer(layer) {\n    this.layers.push(layer);\n  }\n\n  update(deltaTime) {\n    this.layers.forEach(layer => layer.update(deltaTime));\n  }\n\n  draw(context) {\n    this.layers.forEach(layer => layer.draw(this.bufferContext));\n    context.drawImage(this.buffer, 0, 0);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/compositor.js?");

/***/ }),

/***/ "./src/entity.js":
/*!***********************!*\
  !*** ./src/entity.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Entity; });\n/* harmony import */ var _util_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/math */ \"./src/util/math.js\");\n\n\nclass Entity {\n  constructor(traits = []) {\n    this.name = 'entity';\n\n    this.traits = traits;\n    this.pos = new _util_math__WEBPACK_IMPORTED_MODULE_0__[\"Vec\"](0, 0);\n    this.vel = new _util_math__WEBPACK_IMPORTED_MODULE_0__[\"Vec\"](0, 0);\n    this.size = new _util_math__WEBPACK_IMPORTED_MODULE_0__[\"Vec\"](0, 0);\n    this.lifetime = 0;\n\n    this.calculateBounds();\n    this.initialiseTraits();\n  }\n\n  initialiseTraits() {\n    this.traits.forEach((trait) => {\n      this[trait.getName()] = trait;\n    });\n  }\n\n  calculateBounds() {\n    this.bounds = new _util_math__WEBPACK_IMPORTED_MODULE_0__[\"BoundingBox\"](this.pos, this.size);\n  }\n\n  draw() {\n    throw new Error(`This needs to be implemented by the child class (${this.name})`);\n  }\n\n  update(deltaTime) {\n    this.traits.forEach(trait => trait.update(this, deltaTime));\n    this.lifetime += deltaTime;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/entity.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: util, Layer, Entity, Animator, Compositor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util/index.js\");\n/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ \"./src/layer.js\");\n/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity */ \"./src/entity.js\");\n/* harmony import */ var _animator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animator */ \"./src/animator.js\");\n/* harmony import */ var _compositor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./compositor */ \"./src/compositor.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"util\", function() { return _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Layer\", function() { return _layer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Entity\", function() { return _entity__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Animator\", function() { return _animator__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Compositor\", function() { return _compositor__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  util: _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  Layer: _layer__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  Entity: _entity__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  Animator: _animator__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  Compositor: _compositor__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/layer.js":
/*!**********************!*\
  !*** ./src/layer.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Layer; });\nclass Layer {\n  constructor(width, height, entities = []) {\n    this.entities = entities;\n    this.width = width;\n    this.height = height;\n\n    this.buffer = document.createElement('canvas');\n    this.buffer.width = width;\n    this.buffer.height = height;\n    this.bufferContext = this.buffer.getContext('2d');\n  }\n\n  update(deltaTime) {\n    this.entities.forEach(entity => entity.update(deltaTime));\n  }\n\n  draw(context) {\n    this.bufferContext.clearRect(0, 0, this.width, this.height);\n    this.entities.forEach(entity => entity.draw(this.bufferContext));\n    context.drawImage(this.buffer, 0, 0);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/layer.js?");

/***/ }),

/***/ "./src/util/image.js":
/*!***************************!*\
  !*** ./src/util/image.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  loadImage: function loadImage(url) {\n    return new Promise((resolve) => {\n      const img = new Image();\n      img.addEventListener('load', () => {\n        resolve(img);\n      });\n      img.src = url;\n    });\n  },\n});\n\n\n//# sourceURL=webpack:///./src/util/image.js?");

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image */ \"./src/util/image.js\");\n/* harmony import */ var _json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./json */ \"./src/util/json.js\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ \"./src/util/math.js\");\n\n\n\n\nconst toExport = Object.assign(_image__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _json__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  BoundingBox: _math__WEBPACK_IMPORTED_MODULE_2__[\"BoundingBox\"],\n  getRandomNumber: _math__WEBPACK_IMPORTED_MODULE_2__[\"getRandomNumber\"],\n  Matrix: _math__WEBPACK_IMPORTED_MODULE_2__[\"Matrix\"],\n  Vec: _math__WEBPACK_IMPORTED_MODULE_2__[\"Vec\"],\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (toExport);\n\n\n//# sourceURL=webpack:///./src/util/index.js?");

/***/ }),

/***/ "./src/util/json.js":
/*!**************************!*\
  !*** ./src/util/json.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  loadJson: function loadJSON(url) {\n    return fetch(url)\n      .then(r => r.json());\n  },\n});\n\n\n//# sourceURL=webpack:///./src/util/json.js?");

/***/ }),

/***/ "./src/util/math.js":
/*!**************************!*\
  !*** ./src/util/math.js ***!
  \**************************/
/*! exports provided: BoundingBox, Matrix, Vec, getRandomNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BoundingBox\", function() { return BoundingBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Matrix\", function() { return Matrix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Vec\", function() { return Vec; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRandomNumber\", function() { return getRandomNumber; });\nclass BoundingBox {\n  constructor(pos, size) {\n    this.pos = pos;\n    this.size = size;\n  }\n\n  overlaps(box) {\n    return this.bottom > box.top\n      && this.top < box.bottom\n      && this.left < box.right\n      && this.right > box.left;\n  }\n\n  get bottom() {\n    return this.pos.y + this.size.y;\n  }\n\n  set bottom(y) {\n    this.pos.y = y - this.size.y;\n  }\n\n  get top() {\n    return this.pos.y;\n  }\n\n  set top(y) {\n    this.pos.y = y;\n  }\n\n  get left() {\n    return this.pos.x;\n  }\n\n  set left(x) {\n    this.pos.x = x;\n  }\n\n  get right() {\n    return this.pos.x + this.size.x;\n  }\n\n  set right(x) {\n    this.pos.x = x - this.size.x;\n  }\n}\n\nclass Matrix {\n  constructor() {\n    this.grid = [];\n  }\n\n  forEach(callback) {\n    this.grid.forEach((column, x) => {\n      column.forEach((value, y) => {\n        callback(value, x, y);\n      });\n    });\n  }\n\n  get(x, y) {\n    const col = this.grid[x];\n    if (col) {\n      return col[y];\n    }\n    return undefined;\n  }\n\n  set(x, y, value) {\n    if (!this.grid[x]) {\n      this.grid[x] = [];\n    }\n\n    this.grid[x][y] = value;\n  }\n}\n\nclass Vec {\n  constructor(x, y) {\n    this.set(x, y);\n  }\n\n  set(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\n\nconst getRandomNumber = (min, max) => (Math.random() * (max - min)) + min;\n\n\n//# sourceURL=webpack:///./src/util/math.js?");

/***/ })

/******/ });