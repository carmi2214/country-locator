import {findCountryByCoordinate} from "./find-country-by-coordinate";
import {validateCoordinate} from "../validation/coordinate-validation";
import {mocked} from 'ts-jest/utils';

jest.mock('../validation/coordinate-validation', () => ({
    validateCoordinate: jest.fn()
        .mockImplementation(jest.requireActual('../validation/coordinate-validation').validateCoordinate)
}));
const validateCoordinateMock = mocked(validateCoordinate);

describe('findCountryByCoordinate tests', function () {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('calls validateCoordinate', () => {
        findCountryByCoordinate(0, 0);
        expect(validateCoordinateMock).toBeCalled();
    });

    test('validateCoordinate throws error - throws error', () => {
        const errorMessage = 'some error message';
        validateCoordinateMock.mockImplementationOnce(() => {
            throw TypeError(errorMessage);
        });
        expect(() => findCountryByCoordinate(0, 0)).toThrow(new TypeError(errorMessage));
    });

    describe('valid params were given', () => {
        test('a coordinate in London should give United Kingdom', () => {
            const countryInfo = findCountryByCoordinate(51.477339, 0);
            expect(countryInfo?.name).toBe('United Kingdom');
            expect(countryInfo?.code).toBe('GBR');
        });
        test('a coordinate in Tel Aviv should give Israel', () => {
            const countryInfo = findCountryByCoordinate(32.068581, 34.777849);
            expect(countryInfo?.name).toBe('Israel');
            expect(countryInfo?.code).toBe('ISR');
        });
        test('a coordinate in Crete should give Greece', () => {
            const countryInfo = findCountryByCoordinate([24.853544, 35.309385]);
            expect(countryInfo?.name).toBe('Greece');
            expect(countryInfo?.code).toBe('GRC');
        });
        test('a coordinate in West Bank should give Palestine', () => {
            const countryInfo = findCountryByCoordinate(32.066399, 35.216347);
            expect(countryInfo?.name).toBe('Palestine');
            expect(countryInfo?.code).toBe('PSE');
        });
        test('a coordinate in Hawaii should give USA', () => {
            const countryInfo = findCountryByCoordinate([-157.863991, 21.317146]);
            expect(countryInfo?.name).toBe('United States of America');
            expect(countryInfo?.code).toBe('USA');
        });
        test('a coordinate in Brussels should give Belgium', () => {
            const countryInfo = findCountryByCoordinate(50.874338, 4.248688);
            expect(countryInfo?.name).toBe('Belgium');
            expect(countryInfo?.code).toBe('BEL');
        });
    });

    describe('no country in given coordinate', () => {
        test('returns undefined', () => {
            const countryInfo = findCountryByCoordinate(0, 0);
            expect(countryInfo).toBeUndefined();
        });
    });
});
