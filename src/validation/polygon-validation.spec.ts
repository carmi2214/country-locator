import {validatePolygon} from "./polygon-validation";

describe('validatePolygon tests', () => {
    test('received null - throws error', () => {
        expect(() => validatePolygon(null as any)).toThrow();
    });
    test('received array with null values - throws error', () => {
        expect(() => validatePolygon([[1, 3], null, [4, 5], [1, 3]] as any)).toThrow();
    });
    test('received array with string values - throws error', () => {
        expect(() => validatePolygon([[1, 3], [4, 5], "some string", [1, 3]] as any)).toThrow();
    });
    test('received array with empty arrays - throws error', () => {
        expect(() => validatePolygon([[], [2, 7], [4, 5], []] as any)).toThrow();
    });
    test('received array that contains array with not enough numbers - throws error', () => {
        expect(() => validatePolygon([[9, 8], [1], [4, 5], [9, 8]] as any)).toThrow();
    });
    test('received polygon that his first and last positions are not the same - throws error', () => {
        expect(() => validatePolygon([[9, 8], [1, 2], [4, 5], [8, 9]])).toThrow();
    });
    test.each([
        [0],
        [1],
        [2],
        [3],
    ])('polygon has %s vertices - throws error (must have 4 or more vertices)', (lastIndex) => {
        const polygon = [[9, 8], [1, 2], [9, 8]];
        expect(() => validatePolygon(polygon.slice(0, lastIndex) as any)).toThrow('Each LinearRing of a Polygon must have 4 or more Positions.');
    });
    test('received array that contains array with more numbers than needed - does NOT throw', () => {
        expect(() => validatePolygon([[9, 8], [1, 2], [8, 9], [4, 5, 6], [9, 8]] as any)).not.toThrow();
    });
    test('received array that contains zeros - does NOT throw', () => {
        expect(() => validatePolygon([[0, 0], [1, 2], [8, 9], [4, 5], [0, 0]] as any)).not.toThrow();
    });
    test('received valid polygon - does NOT throw', () => {
        expect(() => validatePolygon([[9, 8], [1, 2], [4, 5], [9, 8]] as any)).not.toThrow();
    });
});
