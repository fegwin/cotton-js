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
    constructor(pos: Vector2, size: Vector2);
    bottom: number;
    top: number;
    left: number;
    right: number;
}
export declare class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): void;
}
export declare const getRandomNumber: (min: number, max: number) => number;
export declare const getRandomInt: (min: number, max: number) => number;
export declare const sign: (n: number) => number;
