import { Entity } from "..";
import { BoundingBox, Circle, ISides, Polygon, Vector2 } from "../util/math";

// todo give credit to sat.js guy

export interface ICollision {
  entity: Entity;
}

export interface ICollider {
  detectCollisions(): ICollision[];
}

export class AABBCollision implements ICollision {
  public entity: Entity;
  public sides: ISides;

  /**
   * @param entity Entity collided with
   * @param sides Sides that have collided
   */
  constructor(entity: Entity, sides: ISides) {
    this.entity = entity;
    this.sides = sides;
  }
}

export const detectCollisionsAABB = (
  entity: Entity,
  collidableEntityTraits: string[],
): AABBCollision[] => {
  const collidableEntities = entity
    .getEntityLibrary()
    .getEntitiesByTraitNames(collidableEntityTraits.map((trait) => trait));

  const collisions: AABBCollision[] = [];

  collidableEntities.forEach((testEntity) => {
    if (entity === testEntity) { return; }
    if (!BoundingBox.overlaps(entity.bounds, testEntity.bounds)) { return; }

    collisions.push(new AABBCollision(
      testEntity,
      BoundingBox.getOverlappingSides(entity.bounds, testEntity.bounds)),
    );
  });

  return collisions;
};

export class SATCollision implements ICollision {
  public entity: Entity;
  public response: ISATCollisionResponse;

  /**
   * @param entity Entity collided with
   */
  constructor(entity: Entity, collisionResponse: ISATCollisionResponse) {
    this.entity = entity;
    this.response = collisionResponse;
  }
}

export interface ISATResponse {
  overlap?: number;
  overlapN?: Vector2;
  overlapV?: Vector2;
  aInB?: boolean;
  bInA?: boolean;
}

export interface ISATCollisionResponse extends ISATResponse {
  isColliding: boolean;
}

export const detectCollisionsSAT = (
  entity: Entity,
  collidableEntityTraits: string[],
): SATCollision[] => {
  const collidableEntities = entity
    .getEntityLibrary()
    .getEntitiesByTraitNames(collidableEntityTraits.map((trait) => trait));

  const collisions: SATCollision[] = [];

  collidableEntities.forEach((testEntity) => {
    if (entity === testEntity) { return; }
    if (!BoundingBox.overlaps(entity.bounds, testEntity.bounds)) { return; }

    const aType = entity.getEntityType();
    const bType = testEntity.getEntityType();

    const testMethodKey = `test${aType}${bType}`;
    const testMethod = testMethods[testMethodKey];

    const collisionResponse = testMethod(entity.getHitBox(), testEntity.getHitBox());
    if (!collisionResponse.isColliding) {
      return;
    }

    collisions.push(new SATCollision(testEntity, collisionResponse));
  });

  return collisions;
};

// Entity Collision Test
export enum VoronoiRegion {
  LeftVoronoiRegion = 1,
  MiddleVoronoiRegion = 2,
  RightVoronoiRegion = 3,
}

const flattenPoints = (points: Vector2[], normal: Vector2) => {
  const result = [];

  let min = Number.MAX_VALUE;
  let max = -Number.MAX_VALUE;
  const len = points.length;

  for (let i = 0; i < len; i++ ) {
    // The magnitude of the projection of the point onto the normal
    const dot = points[i].dot(normal);
    if (dot < min) { min = dot; }
    if (dot > max) { max = dot; }
  }
  result[0] = min; result[1] = max;
  return result;
};

const isSeparatingAxis = (
  aPos: Vector2,
  bPos: Vector2,
  aPoints: Vector2[],
  bPoints: Vector2[],
  axis: Vector2,
  response: ISATResponse,
): boolean => {
  // The magnitude of the offset between the two polygons
  const offsetV = bPos.clone().subtract(aPos);
  const projectedOffset = offsetV.dot(axis);

  // Project the polygons onto the axis.
  const rangeA = flattenPoints(aPoints, axis);
  const rangeB = flattenPoints(bPoints, axis);

  // Move B's range to its position relative to A.
  rangeB[0] += projectedOffset;
  rangeB[1] += projectedOffset;

  // Check if there is a gap. If there is, this is a separating axis and we can stop
  if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
    return true;
  }

  // This is not a separating axis. If we're calculating a response, calculate the overlap.
  let overlap = 0;
  // A starts further left than B
  if (rangeA[0] < rangeB[0]) {
    response.aInB = false;
    // A ends before B does. We have to pull A out of B
    if (rangeA[1] < rangeB[1]) {
      overlap = rangeA[1] - rangeB[0];
      response.bInA = false;
    // B is fully inside A.  Pick the shortest way out.
    } else {
      const option1 = rangeA[1] - rangeB[0];
      const option2 = rangeB[1] - rangeA[0];
      overlap = option1 < option2 ? option1 : -option2;
    }
  // B starts further left than A
  } else {
    response.bInA = false;
    // B ends before A ends. We have to push A out of B
    if (rangeA[1] > rangeB[1]) {
      overlap = rangeA[0] - rangeB[1];
      response.aInB = false;
    // A is fully inside B.  Pick the shortest way out.
    } else {
      const option1 = rangeA[1] - rangeB[0];
      const option2 = rangeB[1] - rangeA[0];
      overlap = option1 < option2 ? option1 : -option2;
    }
  }
  // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
  const absOverlap = Math.abs(overlap);
  if (absOverlap < response.overlap) {
    response.overlap = absOverlap;
    response.overlapN.copy(axis);
    if (overlap < 0) {
      response.overlapN.reverse();
    }
  }

  return false;
};

export const voronoiRegion = (line: Vector2, point: Vector2): VoronoiRegion => {
  const len2 = line.length2();
  const dp = point.dot(line);

  // If the point is beyond the start of the line, it is in the
  // left voronoi region.
  if (dp < 0) {
    return VoronoiRegion.LeftVoronoiRegion;
  } else if (dp > len2) {
    // If the point is beyond the end of the line, it is in the
    // right voronoi region.
    return VoronoiRegion.RightVoronoiRegion;
  } else {
    // Otherwise, it's in the middle one.
    return VoronoiRegion.MiddleVoronoiRegion;
  }
};

export const testPointCircle = (p: Vector2, c: Circle): ISATCollisionResponse => {
  const differenceV = p
    .clone()
    .subtract(c.position);
  const radiusSq = c.radius * c.radius;
  const distanceSq = differenceV.length2();

  return {
    isColliding: distanceSq <= radiusSq,
  };
};

export const testPointPolygon = (a: Vector2, b: Polygon): ISATCollisionResponse => {
  const pointPolygon = Polygon.fromPositionVector(a);
  return testPolygonPolygon(pointPolygon, b);
};

export const testCircleCircle = (a: Circle, b: Circle): ISATCollisionResponse => {
  // Check if the distance between the centers of the two
  // circles is greater than their combined radius.
  const differenceV = b
    .position
    .clone()
    .subtract(a.position);

  const totalRadius = a.radius * b.radius;
  const totalRadiusSq = totalRadius * totalRadius;
  const distanceSq = differenceV.length2();

  // If the distance is bigger than the combined radius, they don't intersect.
  if (distanceSq > totalRadiusSq) {
    return {
      isColliding: false,
    };
  }

  const dist = Math.sqrt(distanceSq);
  const overlap = totalRadius - dist;

  return {
    aInB: a.radius <= b.radius && dist <= b.radius - a.radius,
    bInA: b.radius <= a.radius && dist <= a.radius - b.radius,
    isColliding: true,
    overlap,
    overlapN: differenceV.clone().normalize(),
    overlapV: differenceV.clone().scale(overlap),
  };
};

export const testPolygonCircle = (polygon: Polygon, circle: Circle): ISATCollisionResponse => {
  // Get the position of the circle relative to the polygon.
  const circlePos = circle
    .position
    .clone()
    .subtract(polygon.position);

  const radius = circle.radius;
  const radius2 = radius * radius;
  const points = polygon.calcPoints;
  const len = points.length;
  const edge = new Vector2(0, 0);
  const point = new Vector2(0, 0);

  const response: ISATCollisionResponse = {
    aInB: true,
    bInA: true,
    isColliding: true,
    overlap: Number.MAX_VALUE,
    overlapN: new Vector2(),
    overlapV: new Vector2(),
  };

  // For each edge in the polygon:
  for (let i = 0; i < len; i++) {
    const next = i === len - 1 ? 0 : i + 1;
    const prev = i === 0 ? len - 1 : i - 1;
    let overlap = 0;
    let overlapN = null;

    // Get the edge.
    edge.copy(polygon.edges[i]);
    // Calculate the center of the circle relative to the starting point of the edge.
    point.copy(circlePos).subtract(points[i]);

    // If the distance between the center of the circle and the point
    // is bigger than the radius, the polygon is definitely not fully in
    // the circle.
    if (response && point.length2() > radius2) {
      response.aInB = false;
    }

    // Calculate which Voronoi region the center of the circle is in.
    let region = voronoiRegion(edge, point);

    // If it's the left region:
    if (region === VoronoiRegion.LeftVoronoiRegion) {
      // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
      edge.copy(polygon.edges[prev]);

      // Calculate the center of the circle relative the starting point of the previous edge
      const point2 = circlePos.clone().subtract(points[prev]);
      region = voronoiRegion(edge, point2);

      if (region === VoronoiRegion.RightVoronoiRegion) {
        // It's in the region we want.  Check if the circle intersects the point.
        const dist = point.length();
        if (dist > radius) {
          // No intersection
          return {
            isColliding: false,
          };
        } else {
          // It intersects, calculate the overlap.
          response.bInA = false;
          overlapN = point.normalize();
          overlap = radius - dist;
        }
      }
    // If it's the right region:
    } else if (region === VoronoiRegion.RightVoronoiRegion) {
      // We need to make sure we're in the left region on the next edge
      edge.copy(polygon.edges[next]);
      // Calculate the center of the circle relative to the starting point of the next edge.
      point.copy(circlePos).subtract(points[next]);
      region = voronoiRegion(edge, point);

      if (region === VoronoiRegion.LeftVoronoiRegion) {
        // It's in the region we want.  Check if the circle intersects the point.
        const dist = point.length();
        if (dist > radius) {
          // No intersection
          return {
            isColliding: false,
          };
        } else {
          // It intersects, calculate the overlap.
          response.bInA = false;
          overlapN = point.normalize();
          overlap = radius - dist;
        }
      }
    // Otherwise, it's the middle region:
    } else {
      // Need to check if the circle is intersecting the edge,
      // Change the edge into its "edge normal".
      const normal = edge.perpendicular().normalize();
      // Find the perpendicular distance between the center of the
      // circle and the edge.
      const dist = point.dot(normal);
      const distAbs = Math.abs(dist);
      // If the circle is on the outside of the edge, there is no intersection.
      if (dist > 0 && distAbs > radius) {
        // No intersection
        return {
          isColliding: false,
        };
      } else {
        // It intersects, calculate the overlap.
        overlapN = normal;
        overlap = radius - dist;
        // If the center of the circle is on the outside of the edge, or part of the
        // circle is on the outside, the circle is not fully inside the polygon.
        if (dist >= 0 || overlap < 2 * radius) {
          response.bInA = false;
        }
      }
    }

    // If this is the smallest overlap we've seen, keep it.
    // (overlapN may be null if the circle was in the wrong Voronoi region).
    if (overlapN && Math.abs(overlap) < Math.abs(response.overlap)) {
      response.overlap = overlap;
      response.overlapN = overlapN;
    }
  }

  // Calculate the final overlap vector - based on the smallest overlap.
  if (response) {
    response.overlapV = response.overlapN.clone().scale(response.overlap);
  }

  return response;
};

export const testCirclePolygon = (circle: Circle, polygon: Polygon): ISATCollisionResponse => {
  // Test the polygon against the circle.
  const response = testPolygonCircle(polygon, circle);

  // Swap A and B in the response.
  const aInB = response.aInB;
  response.overlapN.reverse();
  response.overlapV.reverse();
  response.aInB = response.bInA;
  response.bInA = aInB;

  return response;
};

export const testPolygonPolygon = (a: Polygon, b: Polygon): ISATCollisionResponse => {
  const aPoints = a.calcPoints;
  const aLen = aPoints.length;
  const bPoints = b.calcPoints;
  const bLen = bPoints.length;

  const satResponse: ISATResponse = {
    aInB: true,
    bInA: true,
    overlap: Number.MAX_VALUE,
    overlapN: new Vector2(),
    overlapV: new Vector2(),
  };

  // If any of the edge normals of A is a separating axis, no intersection.
  for (let i = 0; i < aLen; i++) {
    if (isSeparatingAxis(a.position, b.position, aPoints, bPoints, a.normals[i], satResponse)) {
      return {
        isColliding: false,
      };
    }
  }

  // If any of the edge normals of B is a separating axis, no intersection.
  for (let i = 0; i < bLen; i++) {
    if (isSeparatingAxis(a.position, b.position, aPoints, bPoints, b.normals[i], satResponse)) {
      return {
        isColliding: false,
      };
    }
  }

  const response: ISATCollisionResponse = {
    isColliding: true,
    ...satResponse,
  };

  // Since none of the edge normals of A or B are a separating axis, there is an intersection
  // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
  // final overlap vector.

  response.overlapV
    .copy(response.overlapN)
    .scale(response.overlap);

  return response;
};

const testMethods: { [key: string]: (
    a: Vector2 | Polygon | Circle, b: Entity | Polygon | Circle,
  ) => ISATCollisionResponse } = {
  testCircleCircle,
  testCirclePolygon,
  testPointCircle,
  testPointPolygon,
  testPolygonCircle,
  testPolygonPolygon,
};
