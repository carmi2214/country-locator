import jsonFile from "jsonfile";
import path from "path";
import {CountriesGeoJson} from "../../types";

const countriesGeoJsonFilePath = path.join(__dirname, '../../../countries.geojson');
export const COUNTRIES_GEO_JSON = jsonFile.readFileSync(countriesGeoJsonFilePath) as CountriesGeoJson;
export const NOT_A_COUNTRY_CODE = '-99';
