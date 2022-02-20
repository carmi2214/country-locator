import {POLYGON_VALIDATION_ERROR_MESSAGE} from "../common/constants/error-messages";
import {polygon as createPolygon, Polygon, Feature} from "@turf/helpers";

export const validatePolygon = (polygon: number[][]): Feature<Polygon> => {
    const validationError = new Error(POLYGON_VALIDATION_ERROR_MESSAGE);
    if (!polygon) throw validationError;
    polygon.forEach(vertex => {
        if (!vertex) throw validationError;
        const [x, y] = vertex;
        if (!x && x !== 0 || !y && y !== 0) throw validationError;
        if (typeof x !== 'number' || typeof y !== 'number') throw validationError;
    });
    return createPolygon([polygon])
}
