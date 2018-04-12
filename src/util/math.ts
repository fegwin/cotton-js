export class BoundingBox {
  size: Vec;
  pos: Vec;

  constructor(pos: Vec, size: Vec) {
    this.pos = pos;
    this.size = size;
  }

  overlaps(box: BoundingBox) {
    return (
      this.bottom > box.top &&
      this.top < box.bottom &&
      this.left < box.right &&
      this.right > box.left
    );
  }

  get bottom() {
    return this.pos.y + this.size.y;
  }

  set bottom(y) {
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
export class Vec {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.set(x, y);
  }

  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}

export const getRandomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;