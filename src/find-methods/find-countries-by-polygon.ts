import {CountryInfo, CountryFeature} from "../types";
import intersect from '@turf/intersect';
import {polygon as createPolygon, Polygon, Feature} from '@turf/helpers';
import {COUNTRIES_GEO_JSON, NOT_A_COUNTRY_CODE} from "../common/constants/all-countries";
import {validatePolygon} from "../validation/polygon-validation";
import {extractCountryInfoFromCountryFeature} from "../common/utils/countries-geojson-utils";

const countryIntersectsWithPolygon = (country: CountryFeature, polygon: Feature<Polygon>): boolean => {
    const {properties, geometry} = country;
    if (properties.ISO_A3 === NOT_A_COUNTRY_CODE) return false;
    if (geometry.type === 'Polygon') {
        try {
            return intersect(createPolygon(geometry.coordinates), polygon) !== null;
        } catch {
            return false;
        }
    } else if (geometry.type === 'MultiPolygon') {
        return geometry.coordinates.some((coordinate: any) => {
            try {
                const countryTurfPolygon = createPolygon(coordinate);
                return intersect(countryTurfPolygon, polygon) !== null;
            } catch {
                return false;
            }
        });
    }
    return false;
};

/**
 * Finds countries that intersect with a given polygon.
 * @param polygon - a polygon of coordinates - has to be at least 4 points.
 * @return CountryInfo[] - array of countries (code and name) that intersect
 * with the given polygon. empty array if the polygon doesn't intersect anything.
 */
export function findCountriesByPolygon(polygon: number[][]): CountryInfo[] {
    const validPolygon = validatePolygon(polygon);
    const countriesInIntersection = COUNTRIES_GEO_JSON.features
        .filter(country => countryIntersectsWithPolygon(country, validPolygon));
    return countriesInIntersection.map(extractCountryInfoFromCountryFeature);
}
