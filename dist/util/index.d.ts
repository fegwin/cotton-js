import { loadImage } from "./image";
import { loadJson } from "./json";
import { BoundingBox, Vector2 } from "./math";
export declare const util: {
    BoundingBox: typeof BoundingBox;
    Vector2: typeof Vector2;
    getRandomInt: (min: number, max: number) => number;
    getRandomNumber: (min: number, max: number) => number;
    loadImage: typeof loadImage;
    loadJson: typeof loadJson;
};
