import {findCountriesByPolygon} from "./find-countries-by-polygon";
import {CountryInfo} from "../types";
import {mocked} from "ts-jest/utils";
import {validatePolygon} from "../validation/polygon-validation";

jest.mock('../validation/polygon-validation', () => ({
    validatePolygon: jest.fn()
        .mockImplementation(jest.requireActual('../validation/polygon-validation').validatePolygon)
}));
const validatePolygonMock = mocked(validatePolygon);

const usaCountryInfo: CountryInfo = {
    name: 'United States of America',
    code: 'USA',
    isoA3Code: 'USA',
    isoA2Code: 'US',
};
const mexicoCountryInfo: CountryInfo = {
    name: 'Mexico',
    code: 'MEX',
    isoA3Code: 'MEX',
    isoA2Code: 'MX',
};
const canadaCountryInfo: CountryInfo = {
    name: 'Canada',
    code: 'CAN',
    isoA3Code: 'CAN',
    isoA2Code: 'CA',
};
const bahamasCountryInfo: CountryInfo = {
    name: 'The Bahamas',
    code: 'BHS',
    isoA3Code: 'BHS',
    isoA2Code: 'BS',
};

describe('findCountriesByPolygon tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('calls validateCoordinate', () => {
        findCountriesByPolygon([[1, 2], [3, 4], [5, 6], [1, 2]]);
        expect(validatePolygonMock).toBeCalled();
    });

    test('validatePolygon throws error - throws error', () => {
        const errorMessage = 'some error message';
        validatePolygonMock.mockImplementationOnce(() => {
            throw Error(errorMessage);
        });
        expect(() => findCountriesByPolygon([[1, 2], [3, 4], [5, 6], [1, 2]])).toThrow(new Error(errorMessage));
    });

    test('polygon inside USA - returns USA', () => {
        const polygon = [
            [
                -115.4443359375,
                45.67548217560647
            ],
            [
                -120.498046875,
                39.9434364619742
            ],
            [
                -88.72558593749999,
                32.02670629333614
            ],
            [
                -85.869140625,
                40.01078714046552
            ],
            [
                -115.4443359375,
                45.67548217560647
            ]
        ];
        const countries = findCountriesByPolygon(polygon);
        expect(countries).toStrictEqual([
            usaCountryInfo
        ]);
    });

    test('polygon intersects USA, Canada - returns USA, Canada', () => {
        const polygon = [
            [
                -108.28125,
                51.069016659603896
            ],
            [
                -105.8203125,
                47.040182144806664
            ],
            [
                -97.734375,
                50.17689812200107
            ],
            [
                -108.28125,
                51.069016659603896
            ]
        ];
        const countries = findCountriesByPolygon(polygon);
        expect(countries).toStrictEqual([
            canadaCountryInfo,
            usaCountryInfo
        ]);
    });

    test('polygon intersects Canada and Mexico across the USA - returns USA, Canada, Mexico', () => {
        const polygon = [
            [
                -112.5,
                51.998410382390325
            ],
            [
                -108.544921875,
                27.137368359795584
            ],
            [
                -100.986328125,
                26.27371402440643
            ],
            [
                -101.953125,
                51.45400691005982
            ],
            [
                -112.5,
                51.998410382390325
            ]
        ];
        const countries = findCountriesByPolygon(polygon);
        expect(countries).toStrictEqual([
            canadaCountryInfo,
            mexicoCountryInfo,
            usaCountryInfo
        ]);
    });

    test('polygon is around USA - returns USA, Canada, Mexico, Bahamas', () => {
        const polygon = [
            [
                -131.484375,
                49.781264058178344
            ],
            [
                -137.548828125,
                44.15068115978094
            ],
            [
                -128.935546875,
                26.194876675795218
            ],
            [
                -96.240234375,
                22.755920681486405
            ],
            [
                -72.50976562499999,
                26.43122806450644
            ],
            [
                -59.501953125,
                42.48830197960227
            ],
            [
                -62.314453125,
                48.3416461723746
            ],
            [
                -76.2890625,
                50.3454604086048
            ],
            [
                -109.77539062499999,
                53.173119202640635
            ],
            [
                -131.484375,
                49.781264058178344
            ]
        ];
        const countries = findCountriesByPolygon(polygon);
        expect(countries).toStrictEqual([
            bahamasCountryInfo,
            canadaCountryInfo,
            mexicoCountryInfo,
            usaCountryInfo
        ]);
    });

    test('polygon in the pacific ocean - returns empty array', () => {
        const polygon = [
            [
                183.69140625,
                38.41055825094609
            ],
            [
                168.046875,
                38.685509760012
            ],
            [
                163.65234374999997,
                28.613459424004414
            ],
            [
                182.8125,
                29.84064389983441
            ],
            [
                183.69140625,
                38.41055825094609
            ]
        ];
        const countries = findCountriesByPolygon(polygon);
        expect(countries).toStrictEqual([]);
    });
});
