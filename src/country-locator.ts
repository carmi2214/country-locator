import jsonFile from 'jsonfile';
import {CountryFeature, CountriesGeoJson, CountryInfo, Point, Coordinate} from "./types";
import * as path from 'path';
import {validateCoordinate} from "./coordinate-validation";

const countries = jsonFile.readFileSync(path.join(__dirname, '../countries.geojson'));

/**
 * Determines if a point with given x and y is in a polygon or not
 * Based on the Jordan curve theorem
 */
const isPointInPolygon = (polygon: number[][], point: Point): boolean => {
    const vertices = polygon.length - 1;
    const X_INDEX = 0;
    const Y_INDEX = 1;
    let isInPolygon = false;
    for (let i = 0, j = vertices; i <= vertices; j = i++) {
        if (((polygon[i][Y_INDEX] > point.y) !== (polygon[j][Y_INDEX] > point.y)) &&
            (point.x < (polygon[j][X_INDEX] - polygon[i][X_INDEX]) * (point.y - polygon[i][Y_INDEX]) / (polygon[j][Y_INDEX] - polygon[i][Y_INDEX]) + polygon[i][X_INDEX])) {
            isInPolygon = !isInPolygon;
        }
    }
    return isInPolygon;
};

/**
 * Determines if a given coordinate is in a territory of a country or not
 */
const isCoordinateInCountry = (country: CountryFeature, coordinate: Coordinate): boolean => {
    const coordinateAsPoint: Point = {
        x: coordinate.longitude,
        y: coordinate.latitude
    };
    if (country.geometry.type === 'Polygon') {
        return isPointInPolygon(country.geometry.coordinates[0], coordinateAsPoint);
    } else if (country.geometry.type === 'MultiPolygon') {
        return country.geometry.coordinates.some((coordinate: any) => {
            return isPointInPolygon(coordinate[0], coordinateAsPoint);
        });
    }
    return false;
};

/**
 * Finds country and its details from given coordinate
 * @param coordinate - latitude and longitude
 * @return CountryInfo - country's code and name. null if not in a country
 */
export function findCountryByCoordinate(coordinate: Coordinate): CountryInfo | undefined;
/**
 * Finds country and its details from given coordinate
 * @param latitude of coordinate
 * @param longitude of coordinate
 * @return CountryInfo - country's code and name. null if not in a country
 */
export function findCountryByCoordinate(latitude: number, longitude: number): CountryInfo | undefined;


export function findCountryByCoordinate(coordinateOrLat: Coordinate | number, longitude?: number): CountryInfo | undefined {
    const coordinate = validateCoordinate(coordinateOrLat, longitude);
    const countriesFeatures = (countries as CountriesGeoJson).features;
    const countryFound = countriesFeatures
        ?.find((country: CountryFeature) => isCoordinateInCountry(country, coordinate));

    if (!countryFound) return;

    const {ISO_A3: code, ADMIN: name} = countryFound.properties;
    return {
        code,
        name
    };
}
