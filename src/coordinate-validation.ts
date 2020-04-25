import {Coordinate} from "./types";

export const validateCoordinate = (coordinateOrLat: Coordinate | number, longitude?: number): Coordinate => {
    const errorMessage = `Invalid arguments were given. Must send either a coordinate or lat & long as numbers.`;
    let coordinate: Coordinate;
    if (typeof coordinateOrLat === 'number') {
        if (typeof longitude !== 'number') throw TypeError(errorMessage);
        coordinate = {
            latitude: coordinateOrLat,
            longitude
        };
    } else if (coordinateOrLat?.longitude && coordinateOrLat?.longitude) {
        if (typeof coordinateOrLat.latitude !== 'number' || typeof coordinateOrLat.longitude !== 'number') {
            throw TypeError(errorMessage);
        }
        coordinate = coordinateOrLat;
    } else {
        throw TypeError(errorMessage);
    }
    return coordinate;
};
