export interface CountryFeature {
    type: string,
    geometry: {
        type: 'Point' | 'MultiPoint' | 'LineString' | 'MultiLineString' | 'Polygon' | 'MultiPolygon' | 'GeometryCollection',
        coordinates: any[],
    },
    properties: {
        ADMIN: string,
        ISO_A3: string,
        ISO_A2: string,
    },
}

export interface CountriesGeoJson {
    type: string,
    features: CountryFeature[],
}

export interface CountryInfo {
    code: string,
    name: string,
}

export interface Coordinate {
    latitude: number,
    longitude: number,
}

export interface Point {
    x: number,
    y: number,
}
