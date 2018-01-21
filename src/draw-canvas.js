const TAU = Math.PI * 2;

export function drawPoint(ctx, pointSize, [a, b]) {
    ctx.beginPath();
    ctx.arc(a, b, pointSize, TAU, 0, false);
    ctx.moveTo(a, b);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

export function drawFilledPoint(ctx, pointSize, [a, b]) {
    ctx.beginPath();
    ctx.arc(a, b, pointSize, TAU, 0, false);
    ctx.moveTo(a, b);
    ctx.fillStyle = 'red';
    ctx.fill();
}

export function drawCircle(ctx, center, radius, pointSize) {
    drawPoint(ctx, pointSize / 3, center);
    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, TAU, 0, false);
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
}

export function drawRect(ctx, a, b, c, d) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.lineTo(d[0], d[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
}