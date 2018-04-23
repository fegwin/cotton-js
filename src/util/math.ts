export class BoundingBox {
  // Check if rectangle a contains rectangle b
  // Each object (a and b) should have 2 properties to represent the
  // top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
  public static contains(a: BoundingBox, b: BoundingBox) {
    return !(
      b.left < a.left ||
      b.top < a.top ||
      b.right > a.right ||
      b.bottom > a.bottom
    );
  }

  // Check if rectangle a touches rectangle b
  // Each object (a and b) should have 2 properties to represent the
  // top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
  public static touches(a: BoundingBox, b: BoundingBox) {
    // has horizontal gap
    if (a.left > b.right || b.left > a.right) { return false; }

    // has vertical gap
    if (a.top > b.bottom || b.top > a.bottom) { return false; }

    return true;
  }

  // Check if rectangle a overlaps rectangle b
  // Each object (a and b) should have 2 properties to represent the
  // top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
  public static  overlaps(a: BoundingBox, b: BoundingBox) {
    // no horizontal overlap
    if (a.left >= b.right || b.left >= a.right) { return false; }

    // no vertical overlap
    if (a.top >= b.bottom || b.top >= a.bottom) { return false; }

    return true;
  }

  public static getOverlappingSides(box1: BoundingBox, box2: BoundingBox) {
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

  private size: Point;
  private pos: Point;

  public constructor(pos: Point, size: Point) {
    this.pos = pos;
    this.size = size;
  }

  public contains(box: BoundingBox) {
    return BoundingBox.contains(this, box);
  }

  public touches(box: BoundingBox) {
    return BoundingBox.touches(this, box);
  }

  public overlaps(box: BoundingBox) {
    return BoundingBox.overlaps(this, box);
  }

  public getOverlappingSides(box: BoundingBox) {
    return BoundingBox.getOverlappingSides(this, box);
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
export class Point {
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

export const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
