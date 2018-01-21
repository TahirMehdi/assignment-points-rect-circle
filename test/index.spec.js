import {getClickedPoint, updateTooltipValues} from '../src/index';

describe('[getClickedPoint]', () => {
    it('should check if point is clicked - exact match', () => {
        const points = [[0, 0], [1, 0], [1, 1]];
        const point = [1, 1];
        const pointSize = 0.05;
        expect(getClickedPoint(points, point, pointSize)).toBe(2);
    });
    it('should check if point is clicked - match because of point size', () => {
        const points = [[0, 0], [10, 0], [10, 20]];
        const point = [10, 3];
        const pointSize = 1.5;
        expect(getClickedPoint(points, point, pointSize)).toBe(1);
    });
    it('should check if point is clicked - point is close, but point size is not big enough', () => {
        const points = [[0, 0], [10, 0], [10, 20]];
        const point = [10, 3];
        const pointSize = 1.49;
        expect(getClickedPoint(points, point, pointSize)).toBe(-1);
    });

    it('should check if the point is in the rectangle - exact match', () => {
        const points = [[0, 0], [10, 0], [10, 20]];
        const point = [10, 3];
        const pointSize = 1.5;
        expect(getClickedPoint(points, point, pointSize)).toBe(1);
    });
});

describe('[updateTooltipValues]', () => {
    it('should check update tooltip value', () => {
        const points = [[467, 213], [615, 328], [376, 461]];
        const text = `<div><span>Area:</span><span>47169px<sup>2</sup></span></div><div><span>Point 0:</span><span>467px 213px</span></div><div><span>Point 1:</span><span>615px 328px</span></div><div><span>Point 2:</span><span>376px 461px</span></div><div><span>Center:</span><span>421.5px 337px</span></div>`;
        expect(updateTooltipValues(points)).toEqual(text);
    });
});