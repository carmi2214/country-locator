import {CountryFeature, CountryInfo} from "../../types";

export const extractCountryInfoFromCountryFeature = (countryFeature: CountryFeature): CountryInfo => {
    const {ISO_A3, ISO_A2, ADMIN} = countryFeature.properties;
    return {
        code: ISO_A3,
        isoA3Code: ISO_A3,
        isoA2Code: ISO_A2,
        name: ADMIN,
    };
}