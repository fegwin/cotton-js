export class BoundingBox {
  public static overlaps(box1: BoundingBox, box2: BoundingBox) {
    return (
      box1.bottom > box2.top &&
      box1.top < box2.bottom &&
      box1.left < box2.right &&
      box1.right > box2.left
    );
  }

  public static getOverlappingSides(entity: BoundingBox, box2: BoundingBox) {
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;

    if (entity.left < box2.right && entity.right > box2.left) { left = true; }
    if (entity.right > box2.left && entity.left < box2.right) { right = true; }
    if (entity.top < box2.bottom && entity.bottom > box2.top) { top = true; }
    if (entity.bottom > box2.top && entity.top < box2.top) { bottom = true; }

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
