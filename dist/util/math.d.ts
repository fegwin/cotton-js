export declare class BoundingBox {
    static contains(a: BoundingBox, b: BoundingBox): boolean;
    static touches(a: BoundingBox, b: BoundingBox): boolean;
    static overlaps(a: BoundingBox, b: BoundingBox): boolean;
    static getOverlappingSides(box1: BoundingBox, box2: BoundingBox): {
        bottom: boolean;
        left: boolean;
        right: boolean;
        top: boolean;
    };
    private size;
    private pos;
    constructor(pos: Point, size: Point);
    contains(box: BoundingBox): boolean;
    touches(box: BoundingBox): boolean;
    overlaps(box: BoundingBox): boolean;
    getOverlappingSides(box: BoundingBox): {
        bottom: boolean;
        left: boolean;
        right: boolean;
        top: boolean;
    };
    bottom: number;
    top: number;
    left: number;
    right: number;
}
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): void;
}
export declare const getRandomNumber: (min: number, max: number) => number;
export declare const getRandomInt: (min: number, max: number) => number;
