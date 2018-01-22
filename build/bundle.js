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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getClickedPoint"] = getClickedPoint;
/* harmony export (immutable) */ __webpack_exports__["addListener"] = addListener;
/* harmony export (immutable) */ __webpack_exports__["updateTooltipValues"] = updateTooltipValues;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geo_math__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draw_canvas__ = __webpack_require__(2);



/**
 *  pointSize * 2 helps user to click on small points
 * */
function getClickedPoint(points, point, pointSize) {
    return points.findIndex(__WEBPACK_IMPORTED_MODULE_0__geo_math__["d" /* isPointInsideCircle */].bind(null, point, pointSize * 2));
}

/**
 *  useful reusable snippet
 * */
function addListener(source, eventName, cb) {
    source.addEventListener(eventName, cb);
    return function () {
        source.removeEventListener(eventName, cb)
    }
}

/**
 *  helper to fill ui tooltip
 * */
function updateTooltipValues(points) {
    let content = '';
    const center = Object(__WEBPACK_IMPORTED_MODULE_0__geo_math__["b" /* centerOfRect */])(points);
    const area = Object(__WEBPACK_IMPORTED_MODULE_0__geo_math__["a" /* areaOfRect */])(points);
    content += `<div><span>Area:</span><span>${area}px<sup>2</sup></span></div>`;
    points.forEach((el, i) => {
        content += `<div><span>Point ${i}:</span><span>${el[0]}px ${el[1]}px</span></div>`
    });
    content += `<div><span>Center:</span><span>${center[0]}px ${center[1]}px</span></div>`;
    return content;
}

function drawCanvas(shapes, ev, window, document, ctx) {
    const tooltip = document.getElementById('tooltip');
    const clickedPoint = [ev.clientX, ev.clientY];
    if (shapes.points.length > 2) {
        const clickedPointID = getClickedPoint(shapes.points, clickedPoint, shapes.defaultPointSize);
        /**
         * if user clicks on selected point - we start to listen to move event, to follow his actions
         * */
        if (clickedPointID > -1) {
            const mouseMove = addListener(window, 'mousemove', ev => {
                shapes.points[clickedPointID] = [ev.clientX, ev.clientY];
                tooltip.innerHTML = updateTooltipValues(shapes.points);
                redraw(document, ctx, shapes);
                Object(__WEBPACK_IMPORTED_MODULE_1__draw_canvas__["b" /* drawFilledPoint */])(ctx, shapes.defaultPointSize, shapes.points[clickedPointID]);
            });
            /**
             * and we start to listen to mouseup event,
             * so if user stops - we stop listening to mousemove and mouseup events
             * */
            const mouseUp = addListener(window, 'mouseup', () => {
                mouseMove();
                mouseUp();
                redraw(document, ctx, shapes);
            });
        }
    }
    else {
        shapes.points.push(clickedPoint);
        if (shapes.points.length > 2) {
            tooltip.innerHTML = updateTooltipValues(shapes.points);
        }
    }
    redraw(document, ctx, shapes);
}

/**
 *  ctx.canvas.width = container.clientWidth resizes canvas to fit it's container
 *  and whenever this function is called - canvas gets cleaned because of this.
 * */
function redraw(document, ctx, shapes) {
    const container = document.getElementsByClassName('container')[0];
    ctx.canvas.width = container.clientWidth;
    ctx.canvas.height = container.clientHeight;
    shapes.points.forEach(e => Object(__WEBPACK_IMPORTED_MODULE_1__draw_canvas__["c" /* drawPoint */])(ctx, shapes.defaultPointSize, e));
    if (shapes.points.length > 2) {
        Object(__WEBPACK_IMPORTED_MODULE_1__draw_canvas__["d" /* drawRect */])(ctx, ...shapes.points, Object(__WEBPACK_IMPORTED_MODULE_0__geo_math__["c" /* find4PointOfRect */])(shapes.points));
        Object(__WEBPACK_IMPORTED_MODULE_1__draw_canvas__["a" /* drawCircle */])(ctx, Object(__WEBPACK_IMPORTED_MODULE_0__geo_math__["b" /* centerOfRect */])(shapes.points),
            Math.sqrt(Object(__WEBPACK_IMPORTED_MODULE_0__geo_math__["a" /* areaOfRect */])(shapes.points) / Math.PI),
            shapes.defaultPointSize);
    }
}

/**
 *  add all listeners on init
 * */
function init(document, window, shapes) {
    const canvas = document.getElementById('main');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const clearButton = document.getElementById('clear');
        const aboutButton = document.getElementById('about');
        const tooltip = document.getElementById('tooltip');
        const dialogWindow = document.getElementById('dialog');

        addListener(window, 'resize', () => redraw(document, ctx, shapes));
        addListener(clearButton, 'click', () => {
            shapes.points.length = 0;
            redraw(document, ctx, shapes);
            tooltip.innerHTML = '';
        });
        addListener(canvas, 'mousedown', (e) => drawCanvas(shapes, e, window, document, ctx));
        const activateDialogWindow =  () => {
            dialogWindow.classList.add('active');
            const removeActive = addListener(dialogWindow, 'click', () => {
                dialogWindow.classList.remove('active');
                removeActive();
            });
        };
        addListener(aboutButton, 'click', activateDialogWindow);
        /**
        * call activateDialogWindow so the about window will be showed to user on initial load
        * */
        activateDialogWindow();
        redraw(document, ctx, shapes);
    }
}

const SHAPES = {
    points: [],
    defaultPointSize: 5.5,
};
/**
 * start program on window load
 * */
window.onload = () => init(document, window, SHAPES);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = find4PointOfRect;
/* unused harmony export centerOfLine */
/* harmony export (immutable) */ __webpack_exports__["b"] = centerOfRect;
/* harmony export (immutable) */ __webpack_exports__["a"] = areaOfRect;
/* unused harmony export distanceBetweenPoints */
/* harmony export (immutable) */ __webpack_exports__["d"] = isPointInsideCircle;
function find4PointOfRect([a, b, c]) {
    return [c[0] - b[0] + a[0], c[1] - b[1] + a[1]];
}

function centerOfLine(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function centerOfRect([a, b, c]) {
    return centerOfLine(a, c);
}

function areaOfRect([a, b, c]) {
    return Math.abs(a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
}

function distanceBetweenPoints(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

function isPointInsideCircle(point, circleRadius, circleCenter) {
    return distanceBetweenPoints(point, circleCenter) <= circleRadius;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = drawPoint;
/* harmony export (immutable) */ __webpack_exports__["b"] = drawFilledPoint;
/* harmony export (immutable) */ __webpack_exports__["a"] = drawCircle;
/* harmony export (immutable) */ __webpack_exports__["d"] = drawRect;
const TAU = Math.PI * 2;

function drawPoint(ctx, pointSize, [a, b]) {
    ctx.beginPath();
    ctx.arc(a, b, pointSize, TAU, 0, false);
    ctx.moveTo(a, b);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function drawFilledPoint(ctx, pointSize, [a, b]) {
    ctx.beginPath();
    ctx.arc(a, b, pointSize, TAU, 0, false);
    ctx.moveTo(a, b);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function drawCircle(ctx, center, radius, pointSize) {
    drawPoint(ctx, pointSize / 3, center);
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, TAU, 0, false);
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
}

function drawRect(ctx, a, b, c, d) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.lineTo(d[0], d[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}

/***/ })
/******/ ]);