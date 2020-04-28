import {validateCoordinate} from "./coordinate-validation";

describe('validateCoordinate tests', () => {
    describe.each([
        ['some string', 5.1],
        [31, false],
        [true, 'some string'],
        [null, null],
        [971, null],
        [null, 31.232]
    ])('latitude is %s, longitude is %s', (latitude: any, longitude: any) => {
        test('should throw if latitude or longitude are not numbers, sending as array', () => {
            expect(() => validateCoordinate([longitude, latitude]))
                .toThrow(`Invalid arguments were given. Must send either a point as array or lat & long as numbers.`);
        });

        test('should throw if latitude or longitude are not numbers, sending as numbers', () => {
            expect(() => validateCoordinate(latitude, longitude))
                .toThrow(`Invalid arguments were given. Must send either a point as array or lat & long as numbers.`);
        });
    });
});
