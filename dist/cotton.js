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
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/animator.js":
/*!***************************!*\
  !*** ./build/animator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Animator {\n    constructor(compositor, context, deltaTime = 1 / 60) {\n        this.accumulatedTime = 0;\n        this.lastTime = 0;\n        this.deltaTime = deltaTime;\n        this.compositor = compositor;\n        this.context = context;\n    }\n    enqueue() {\n        window.requestAnimationFrame(this.update);\n    }\n    update(time) {\n        this.accumulatedTime += (time - this.lastTime) / 1000;\n        if (this.accumulatedTime > 1) {\n            this.accumulatedTime = 1;\n        }\n        while (this.accumulatedTime > this.deltaTime) {\n            this.animate(this.deltaTime);\n            this.accumulatedTime -= this.deltaTime;\n        }\n        this.lastTime = time;\n        this.enqueue();\n    }\n    animate(deltaTime) {\n        this.compositor.update(deltaTime);\n        this.compositor.draw(this.context);\n    }\n    start() {\n        this.enqueue();\n    }\n}\nexports.default = Animator;\n//# sourceMappingURL=animator.js.map\n\n//# sourceURL=webpack:///./build/animator.js?");

/***/ }),

/***/ "./build/compositor.js":
/*!*****************************!*\
  !*** ./build/compositor.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Compositor {\n    constructor(width, height, layers = []) {\n        this.layers = layers;\n        this.buffer = document.createElement(\"canvas\");\n        this.buffer.width = width;\n        this.buffer.height = height;\n        this.bufferContext = this.buffer.getContext(\"2d\");\n    }\n    addLayer(layer) {\n        this.layers.push(layer);\n    }\n    update(deltaTime) {\n        this.layers.forEach(layer => layer.update(deltaTime));\n    }\n    draw(context) {\n        this.layers.forEach(layer => layer.draw(this.bufferContext));\n        context.drawImage(this.buffer, 0, 0);\n    }\n}\nexports.default = Compositor;\n//# sourceMappingURL=Compositor.js.map\n\n//# sourceURL=webpack:///./build/compositor.js?");

/***/ }),

/***/ "./build/entity.js":
/*!*************************!*\
  !*** ./build/entity.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst math_1 = __webpack_require__(/*! ./util/math */ \"./build/util/math.js\");\nclass Entity {\n    constructor(traits = []) {\n        this.name = \"entity\";\n        this.pos = new math_1.Vec(0, 0);\n        this.vel = new math_1.Vec(0, 0);\n        this.size = new math_1.Vec(0, 0);\n        this.lifetime = 0;\n        this.calculateBounds();\n        this.initialiseTraits(traits);\n    }\n    initialiseTraits(traits) {\n        traits.forEach(trait => {\n            this.traits[trait.getName()] = trait;\n        });\n    }\n    calculateBounds() {\n        this.bounds = new math_1.BoundingBox(this.pos, this.size);\n    }\n    draw() {\n        throw new Error(`This needs to be implemented by the child class (${this.name})`);\n    }\n    update(deltaTime) {\n        for (var trait in this.traits) {\n            this.traits[trait].update(this, deltaTime);\n        }\n        this.lifetime += deltaTime;\n    }\n}\nexports.default = Entity;\n//# sourceMappingURL=Entity.js.map\n\n//# sourceURL=webpack:///./build/entity.js?");

/***/ }),

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst util_1 = __webpack_require__(/*! ./util */ \"./build/util/index.js\");\nconst layer_1 = __webpack_require__(/*! ./layer */ \"./build/layer.js\");\nconst entity_1 = __webpack_require__(/*! ./entity */ \"./build/entity.js\");\nconst animator_1 = __webpack_require__(/*! ./animator */ \"./build/animator.js\");\nconst compositor_1 = __webpack_require__(/*! ./compositor */ \"./build/compositor.js\");\nvar util_2 = __webpack_require__(/*! ./util */ \"./build/util/index.js\");\nexports.util = util_2.default;\nvar layer_2 = __webpack_require__(/*! ./layer */ \"./build/layer.js\");\nexports.Layer = layer_2.default;\nvar entity_2 = __webpack_require__(/*! ./entity */ \"./build/entity.js\");\nexports.Entity = entity_2.default;\nvar animator_2 = __webpack_require__(/*! ./animator */ \"./build/animator.js\");\nexports.Animator = animator_2.default;\nvar compositor_2 = __webpack_require__(/*! ./compositor */ \"./build/compositor.js\");\nexports.Compositor = compositor_2.default;\nexports.default = {\n    util: util_1.default,\n    Layer: layer_1.default,\n    Entity: entity_1.default,\n    Animator: animator_1.default,\n    Compositor: compositor_1.default\n};\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./build/index.js?");

/***/ }),

/***/ "./build/layer.js":
/*!************************!*\
  !*** ./build/layer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Layer {\n    constructor(width, height, entities = []) {\n        this.entities = entities;\n        this.width = width;\n        this.height = height;\n        this.buffer = document.createElement(\"canvas\");\n        this.buffer.width = width;\n        this.buffer.height = height;\n        this.bufferContext = this.buffer.getContext(\"2d\");\n    }\n    update(deltaTime) {\n        this.entities.forEach(entity => entity.update(deltaTime));\n    }\n    draw(context) {\n        this.bufferContext.clearRect(0, 0, this.width, this.height);\n        this.entities.forEach(entity => entity.draw());\n        context.drawImage(this.buffer, 0, 0);\n    }\n}\nexports.default = Layer;\n//# sourceMappingURL=Layer.js.map\n\n//# sourceURL=webpack:///./build/layer.js?");

/***/ }),

/***/ "./build/util/image.js":
/*!*****************************!*\
  !*** ./build/util/image.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass CottonImage {\n    loadImage(url) {\n        return new Promise(resolve => {\n            const img = new Image();\n            img.addEventListener(\"load\", () => {\n                resolve(img);\n            });\n            img.src = url;\n        });\n    }\n}\nexports.default = CottonImage;\n//# sourceMappingURL=image.js.map\n\n//# sourceURL=webpack:///./build/util/image.js?");

/***/ }),

/***/ "./build/util/index.js":
/*!*****************************!*\
  !*** ./build/util/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst image_1 = __webpack_require__(/*! ./image */ \"./build/util/image.js\");\nconst json_1 = __webpack_require__(/*! ./json */ \"./build/util/json.js\");\nconst math_1 = __webpack_require__(/*! ./math */ \"./build/util/math.js\");\nexports.default = Object.assign(image_1.default, json_1.default, {\n    BoundingBox: math_1.BoundingBox,\n    getRandomNumber: math_1.getRandomNumber,\n    Vec: math_1.Vec\n});\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///./build/util/index.js?");

/***/ }),

/***/ "./build/util/json.js":
/*!****************************!*\
  !*** ./build/util/json.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Json {\n    loadJson(url) {\n        return fetch(url).then(r => r.json());\n    }\n}\nexports.default = Json;\n//# sourceMappingURL=json.js.map\n\n//# sourceURL=webpack:///./build/util/json.js?");

/***/ }),

/***/ "./build/util/math.js":
/*!****************************!*\
  !*** ./build/util/math.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass BoundingBox {\n    constructor(pos, size) {\n        this.pos = pos;\n        this.size = size;\n    }\n    overlaps(box) {\n        return (this.bottom > box.top &&\n            this.top < box.bottom &&\n            this.left < box.right &&\n            this.right > box.left);\n    }\n    get bottom() {\n        return this.pos.y + this.size.y;\n    }\n    set bottom(y) {\n        this.pos.y = y - this.size.y;\n    }\n    get top() {\n        return this.pos.y;\n    }\n    set top(y) {\n        this.pos.y = y;\n    }\n    get left() {\n        return this.pos.x;\n    }\n    set left(x) {\n        this.pos.x = x;\n    }\n    get right() {\n        return this.pos.x + this.size.x;\n    }\n    set right(x) {\n        this.pos.x = x - this.size.x;\n    }\n}\nexports.BoundingBox = BoundingBox;\nclass Vec {\n    constructor(x, y) {\n        this.set(x, y);\n    }\n    set(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n}\nexports.Vec = Vec;\nexports.getRandomNumber = (min, max) => Math.random() * (max - min) + min;\n//# sourceMappingURL=math.js.map\n\n//# sourceURL=webpack:///./build/util/math.js?");

/***/ })

/******/ });