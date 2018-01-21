import {areaOfRect, centerOfRect, find4PointOfRect, isPointInsideCircle} from './geo-math';
import {drawCircle, drawFilledPoint, drawPoint, drawRect} from './draw-canvas';

/**
 *  pointSize * 2 helps user to click on small points
 * */
export function getClickedPoint(points, point, pointSize) {
    return points.findIndex(isPointInsideCircle.bind(null, point, pointSize * 2));
}

/**
 *  useful reusable snippet
 * */
export function addListener(source, eventName, cb) {
    source.addEventListener(eventName, cb);
    return function () {
        source.removeEventListener(eventName, cb)
    }
}

/**
 *  helper to fill ui tooltip
 * */
export function updateTooltipValues(points) {
    let content = '';
    const center = centerOfRect(points);
    const area = areaOfRect(points);
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
                drawFilledPoint(ctx, shapes.defaultPointSize, shapes.points[clickedPointID]);
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
    shapes.points.forEach(e => drawPoint(ctx, shapes.defaultPointSize, e));
    if (shapes.points.length > 2) {
        drawRect(ctx, ...shapes.points, find4PointOfRect(shapes.points));
        drawCircle(ctx, centerOfRect(shapes.points),
            Math.sqrt(areaOfRect(shapes.points) / Math.PI),
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