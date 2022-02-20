export interface CountryFeature {
    type: string,
    geometry: {
        type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon' | 'GeometryCollection',
        coordinates: any[],
    },
    properties: any,
}

export interface CountriesGeoJson {
    type: string,
    features: CountryFeature[],
}

export interface CountryInfo {
    code: string,
    name: string,
    isoA2Code: string;
    isoA3Code: string;
}
