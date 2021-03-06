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

  public getPolygon(): Polygon {
    const h = Math.abs(this.top - this.bottom);
    const w = Math.abs(this.right - this.left);

    return new Polygon([
      new Vector2(0, 0),
      new Vector2(w, 0),
      new Vector2(w, h),
      new Vector2(0, h),
     ], new Vector2(this.pos.x, this.pos.y));
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

export class Circle {
  public position: Vector2;
  public size: Vector2;
  public centerPoint: Vector2;
  public radius: number;

  constructor(position: Vector2, radius: number) {
    this.position = position;
    this.radius = radius;

    this.size = new Vector2(radius * 2, radius * 2);
    this.centerPoint = new Vector2(position.x + radius, position.y + radius);
  }

  public getBoundingBox(): BoundingBox {
    return new BoundingBox(this.position, this.size);
  }
}

/**
 * A simple 2D vector class
 * Has x
 * Also has y
 *
 * TODO give credit to http://jriecken.github.io/sat-js/docs/SAT.html
 */
export class Vector2 {
  public x: number;
  public y: number;

  public constructor(x: number = 0, y: number = 0) {
    this.set(x, y);
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  // All the following methods are fluid api methods

  /**
   * Sets (x,y) for this Vector
   * @param x X value for Vector
   * @param y Y value for Vector
   * @returns self for chaining
   */
  public set(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;

    return this;
  }

  /**
   * Copy (x,y) from another Vector onto this one
   * @param other Vector which we want to copy
   * @returns self for chaining
   */
  public copy(other: Vector2): Vector2 {
    this.set(other.x, other.y);
    return this;
  }

  /**
   * Change this vector to be perpendicular to what it was before.
   * (Effectively roatates it 90 degrees in a clockwise direction)
   */
  public perpendicular(): Vector2 {
    return this.set(this.y, -this.x);
  }

  /**
   * Rotate this vector (counter-clockwise) by the specified angle (in radians).
   * @param angle Angle to rotate vector by
   * @param centrePoint Point about which to rotate this vector. If null, rotation will be around the origin
   * @returns self for chaining
   */
  public rotate(angle: number, centrePoint: Vector2 = null): Vector2 {
    if (!centrePoint) {
      return this.set(
        this.x * Math.cos(angle) - this.y * Math.sin(angle),
        this.x * Math.sin(angle) + this.y * Math.cos(angle),
      );
    }

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return this.set(
      (cos * (this.x - centrePoint.x)) + (sin * (this.y - centrePoint.y)) + centrePoint.x,
      (cos * (this.y - centrePoint.y)) - (sin * (this.x - centrePoint.x)) + centrePoint.y,
    );
  }

  /**
   * Will reverse the Vector
   * @returns self for chaining
   */
  public reverse(): Vector2 {
    return this.set(-this.x, -this.y);
  }

  /**
   * Changes vector to a unit vector
   * @returns self for chaining
   */
  public normalize(): Vector2 {
    const length = this.length();
    if (length > 0) {
      return this.set(this.x / length, this.y / length);
    }

    return this;
  }

  /**
   * Add a vector to this vector
   * @param other Vector to add to this vector
   * @returns self for chaining
   */
  public add(other: Vector2): Vector2 {
    return this.set(this.x + other.x, this.y + other.y);
  }

  /**
   * Subtract a vector from this vector
   * @param other Vector to add to this vector
   * @returns self for chaining
   */
  public subtract(other: Vector2): Vector2 {
    return this.set(this.x - other.x, this.y - other.y);
  }

  /**
   * Scales the vector by the passed in scale
   * Note, if only scale is passed in, both x and y will be scaled by scale
   * If scaleY is passed in, then x will be scaled by scale, and y will be scaled
   * by scaleY
   * @param scale Factor to scale by
   * @param scaleY Factor to scale Y by (if null, Y will be scaled by scale)
   * @returns self for chaining
   */
  public scale(scale: number, scaleY?: number): Vector2 {
    if (scaleY === null || scaleY === undefined) {
      return this.set(this.x * scale, this.y * scale);
    }

    return this.set(this.x * scale, this.y * scaleY);
  }

  /**
   * Project this vector on to another vector.
   * @param other other vector to project on to
   * @returns self for chaining
   */
  public project(other: Vector2): Vector2 {
    const amount = this.dot(other) / other.length2();
    return this.set(amount * other.x, amount * other.y);
  }

  /**
   * Project this vector on to another vector of unit lenth.
   * Faster when dealing with unit vectors
   * @param unitOther other vector to project on to
   * @returns self for chaining
   */
  public unitProject(unitOther: Vector2): Vector2 {
    const amount = this.dot(unitOther);
    return this.set(amount * unitOther.x, amount * unitOther.y);
  }

  /**
   * Reflects this vector on an arbitrary vector axis
   * @param axis vector representing the axis
   * @returns self for chaining
   */
  public reflect(axis: Vector2): Vector2 {
    return this
      .project(axis)
      .scale(2)
      .set(-this.x, -this.y);
  }

  /**
   * Reflects this vector on an arbitrary unit vector axis
   * Faster when dealing with unit vectors
   * @param axis vector representing the axis
   * @returns self for chaining
   */
  public unitReflect(unitAxis: Vector2) {
    return this
      .unitProject(unitAxis)
      .scale(2)
      .set(-this.x, -this.y);
  }

  /**
   * Compute dot product against another vector
   * @param other vector to do dot product against
   * @returns dot product
   */
  public dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   *  Get squared length of this vector
   */
  public length2(): number {
    return this.dot(this);
  }

  /**
   * Get length of this vector
   */
  public length(): number {
    return Math.sqrt(this.length2());
  }
}

export class Polygon {
  // Construct from methods
  public static fromPositionVector(position: Vector2): Polygon {
    const tinyBox = new BoundingBox(position, new Vector2(0.000001, 0.000001));

    return tinyBox.getPolygon();
  }

  public zeroShiftedCalcPoints: Vector2[];
  public calcPoints: Vector2[];
  public edges: Vector2[];
  public normals: Vector2[];

  public position: Vector2;
  public angle: number;
  public points: Vector2[];

  constructor(points?: Vector2[], position: Vector2 = new Vector2(0, 0), angle: number = 0) {
    this.position = position;
    this.angle = angle;
    this.points = points || [];
    this.calcPoints = [];
    this.edges = [];
    this.normals = [];

    this.recalculate();
  }

  public getBoundingBox(): BoundingBox {
    let xMin = 0;
    let yMin = 0;
    let xMax = 0;
    let yMax = 0;

    this.calcPoints.forEach((point) => {
      if (point.x < xMin) { xMin = point.x; }
      if (point.y < yMin) { yMin = point.y; }
      if (point.x > xMax) { xMax = point.x; }
      if (point.y > yMax) { yMax = point.y; }
    });

    const pos = new Vector2(0, 0);
    const size = new Vector2(Math.abs(xMin - xMax), Math.abs(yMin - yMax));

    return new BoundingBox(pos, size);
  }

  public setAngle(angle: number): Polygon {
    this.angle = angle;
    this.recalculate();
    return this;
  }

  public rotate(angle: number, centrePoint: Vector2 = null): Polygon {
    const points = this.points;
    points.forEach((point) => {
      point.rotate(angle, centrePoint);
    });
    this.recalculate();
    return this;
  }

  private recalculate() {
    this.calcPoints = [];
    this.edges = [];
    this.normals = [];
    this.zeroShiftedCalcPoints = [];

    this.points.forEach((point) => {
      const calcPoint = point.clone();
      if (this.angle) {
        calcPoint.rotate(this.angle);
      }
      this.calcPoints.push(calcPoint);
      this.edges.push(new Vector2(0, 0));
      this.normals.push(new Vector2(0, 0));
    });

    const len = this.calcPoints.length;
    this.calcPoints.forEach((point, idx) => {
      const nextPoint = idx < len - 1
        ? this.calcPoints[idx + 1]
        : this.calcPoints[0];

      const edge = this.edges[idx]
        .copy(nextPoint)
        .subtract(point);

      this.normals[idx]
        .copy(edge)
        .perpendicular()
        .normalize();
    });

    const offset = new Vector2(0, 0);
    this.calcPoints.forEach((calcPoint) => {
      if (calcPoint.x < offset.x) {
        offset.x = calcPoint.x;
      }
      if (calcPoint.y < offset.y) {
        offset.y = calcPoint.y;
      }
    });

    this.calcPoints.forEach((calcPoint) => {
      this.zeroShiftedCalcPoints.push(calcPoint.clone().subtract(offset));
    });
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
