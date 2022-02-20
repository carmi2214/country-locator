import {CountryFeature, CountryInfo} from "../types";
import {validateCoordinate} from "../validation/coordinate-validation";
import {COUNTRIES_GEO_JSON} from "../common/constants/all-countries";
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {polygon, multiPolygon, Point, Feature} from '@turf/helpers';
import {extractCountryInfoFromCountryFeature} from "../common/utils/countries-geojson-utils";

/**
 * Determines if a given point is in a territory of a country or not
 */
const isPointInCountry = (country: CountryFeature, point: Feature<Point>): boolean => {
    const {type: countryGeoType, coordinates: countryCoordinates} = country.geometry;
    if (countryGeoType === 'Polygon') {
        return booleanPointInPolygon(point, polygon(countryCoordinates));
    } else if (countryGeoType === 'MultiPolygon') {
        return booleanPointInPolygon(point, multiPolygon(countryCoordinates));
    }
    return false;
};

/**
 * Finds country and its details from given coordinate
 * @param point - an array of two numbers - [x, y].
 * PAY ATTENTION: x == longitude, y == latitude!
 * @return CountryInfo - country's code and name. null if not in a country
 */
export function findCountryByCoordinate(point: number[]): CountryInfo | undefined;
/**
 * Finds country and its details from given coordinate
 * @param latitude - latitude of coordinate
 * @param longitude - longitude of coordinate
 * @return CountryInfo - country's code and name. null if not in a country
 */
export function findCountryByCoordinate(latitude: number, longitude: number): CountryInfo | undefined;

export function findCountryByCoordinate(pointOrLat: number[] | number, longitude?: number): CountryInfo | undefined {
    const coordinate = validateCoordinate(pointOrLat, longitude);
    const countryFound = COUNTRIES_GEO_JSON.features
        ?.find((country: CountryFeature) => isPointInCountry(country, coordinate));

    if (!countryFound) return;

    return extractCountryInfoFromCountryFeature(countryFound);
}
