export function find4PointOfRect([a, b, c]) {
    return [c[0] - b[0] + a[0], c[1] - b[1] + a[1]];
}

export function centerOfLine(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

export function centerOfRect([a, b, c]) {
    return centerOfLine(a, c);
}

export function areaOfRect([a, b, c]) {
    return Math.abs(a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
}

export function distanceBetweenPoints(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
}

export function isPointInsideCircle(point, circleRadius, circleCenter) {
    return distanceBetweenPoints(point, circleCenter) <= circleRadius;
}
