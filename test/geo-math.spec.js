import {
    areaOfRect, centerOfLine, centerOfRect,
    distanceBetweenPoints, find4PointOfRect, isPointInsideCircle
} from '../src/geo-math';

describe('[find4PointOfRect]', () => {
    it('should calculate 4 point of rectangle', () => {
        const points = [[0, 0], [1, 0], [1, 1]];
        expect(find4PointOfRect(points)).toEqual([0, 1]);
    });

    it('should calculate 4 point of rectangle', () => {
        const points = [[0, 0], [0, 11], [10, 11]];
        expect(find4PointOfRect(points)).toEqual([10, 0]);
    });
});

describe('[centerOfLine]', () => {
    it('should return correct center of line', () => {
        expect(centerOfLine([2, 3], [9, 6])).toEqual([5.5, 4.5]);
    });
    it('should return correct center of line', () => {
        expect(centerOfLine([5.9, 25], [2, 9.9])).toEqual([3.95, 17.45]);
    });
});

describe('[centerOfRect]', () => {
    it('should calculate center point of rectangle', () => {
        const points = [[0, 0], [10, 0], [0, 11]];
        expect(centerOfRect(points)).toEqual([0, 5.5]);
    });

    it('should calculate center point of rectangle', () => {
        const points = [[-5, 6], [0, 9], [7, 11]];
        expect(centerOfRect(points)).toEqual([1, 8.5]);
    });
});

describe('[areaOfRect]', () => {
    it('should calculate area of rectangle', () => {
        const points = [[0, 0], [10, 0], [0, 11]];
        expect(areaOfRect(points)).toBe(110);
    });

    it('should calculate area of rectangle', () => {
        const points = [[0, 0], [1, 0], [0, 1]];
        expect(areaOfRect(points)).toBe(1);
    });
});

describe('[distanceBetweenPoints]', () => {
    it('should get distance between 2 points', () => {
        expect(distanceBetweenPoints([-5, 6], [7, 11])).toBe(13);
    });
    it('should get distance between 2 points', () => {
        expect(distanceBetweenPoints([12, 2], [12, 9])).toBe(7);
    });
});

describe('[isPointInsideCircle]', () => {
    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([0, 0], 5, [10, 10])).toBe(false);
    });
    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([0, 0], 0, [20, 10])).toBe(false);
    });

    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([20, 10], 0, [20, 10])).toBe(true);
    });

    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([12, 2], 6.9, [12, 9])).toBe(false);
    });
    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([12, 2], 7, [12, 9])).toBe(true);
    });
    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([-5, 6], 12.9, [7, 11])).toBe(false);
    });
    it('should check if point is inside circle', () => {
        expect(isPointInsideCircle([-5, 6], 13, [7, 11])).toBe(true);
    });
});