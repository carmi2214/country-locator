import {COORDINATE_VALIDATION_ERROR_MESSAGE} from "../common/constants/error-messages";
import {point as createPoint, Point, Feature} from '@turf/helpers';

export const validateCoordinate = (pointOrLat: number[] | number, longitude?: number): Feature<Point> => {
    const validationError = new Error(COORDINATE_VALIDATION_ERROR_MESSAGE);
    let point: Feature<Point>;
    if (typeof pointOrLat === 'number') {
        if (typeof longitude !== 'number') throw validationError;
        point = createPoint([longitude, pointOrLat]);
    } else if (Array.isArray(pointOrLat)) {
        const [x, y] = pointOrLat;
        if (!x && x !== 0 || !y && y !== 0) throw validationError;
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw validationError;
        }
        point = createPoint(pointOrLat);
    } else {
        throw validationError;
    }
    return point;
};
