export interface ISides {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

/** Provides dimensions to bound an entity
 *  and the methods to calculate overlapping entities.
 */
export class BoundingBox {
  /**
   * Check if box a contains box b
   * @param a Box to test
   * @param b Box to test against
   */
  public static contains(a: BoundingBox, b: BoundingBox) {
    return !(
      b.left < a.left ||
      b.top < a.top ||
      b.right > a.right ||
      b.bottom > a.bottom
    );
  }

  /**
   * Check if box a touches box b
   * @param a Box to test
   * @param b Box to test against
   */
  public static touches(a: BoundingBox, b: BoundingBox) {
    // has horizontal gap
    if (a.left > b.right || b.left > a.right) { return false; }

    // has vertical gap
    if (a.top > b.bottom || b.top > a.bottom) { return false; }

    return true;
  }

  /**
   * Check if box a overlaps box b
   * @param a Box to test
   * @param b Box to test against
   */
  public static overlaps(a: BoundingBox, b: BoundingBox) {
    // no horizontal overlap
    if (a.left >= b.right || b.left >= a.right) { return false; }

    // no vertical overlap
    if (a.top >= b.bottom || b.top >= a.bottom) { return false; }

    return true;
  }

  /**
   * Get an object describing which sides are touching/overlapping given box a and box b
   * @param box1 Box to test
   * @param box2 Box to test against
   */
  public static getOverlappingSides(box1: BoundingBox, box2: BoundingBox): ISides {
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;

    if (BoundingBox.touches(box1, box2) && box1.left < box2.left && box1.right >= box2.left) { right = true; }
    if (BoundingBox.touches(box1, box2) && box1.right > box2.right && box1.left <= box2.right) { left = true; }
    if (BoundingBox.touches(box1, box2) && box1.top < box2.bottom && box1.bottom >= box2.bottom) { top = true; }
    if (BoundingBox.touches(box1, box2) && box1.bottom > box2.top && box1.top <= box2.top) { bottom = true; }

    return {
      bottom,
      left,
      right,
      top,
    };
  }

  private size: Vector2;
  private pos: Vector2;

  /**
   *
   * @param pos The top left position of the bounding box
   * @param size The size from the position
   */
  public constructor(pos: Vector2, size: Vector2) {
    this.pos = pos;
    this.size = size;
  }

  public get bottom() {
    return this.pos.y + this.size.y;
  }

  public set bottom(y) {
    this.pos.y = y - this.size.y;
  }

  get top() {
    return this.pos.y;
  }

  set top(y) {
    this.pos.y = y;
  }

  get left() {
    return this.pos.x;
  }

  set left(x) {
    this.pos.x = x;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  set right(x) {
    this.pos.x = x - this.size.x;
  }
}

/**
 * A simple 2D vector class
 * Has x
 * Also has y
 */
export class Vector2 {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.set(x, y);
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

/** Retrieves a random number between min and max.
 * This includes decimal places.
 */
export const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

/** Retrieves a random number between min and max.
 * This only includes whole numbers.
 */
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * This method will get the sign of the number passed in
 * 1, -1, 0 are the outputs
 * @param n The number you are checking
 */
export const sign = (n: number) => n && n / Math.abs(n);
