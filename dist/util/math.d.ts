export declare class BoundingBox {
    private size;
    private pos;
    constructor(pos: Vec, size: Vec);
    overlaps(box: BoundingBox): boolean;
    static overlaps(box1: BoundingBox, box2: BoundingBox): boolean;
    bottom: number;
    top: number;
    left: number;
    right: number;
}
export declare class Vec {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): void;
}
export declare const getRandomNumber: (min: number, max: number) => number;
export declare const getRandomInt: (min: number, max: number) => number;
