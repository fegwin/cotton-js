import { Entity } from "..";
import { CircleEntity, PolygonEntity } from "../entity";
import { BoundingBox, ISides, Vector2 } from "../util/math";

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

  /**
   * @param entity Entity collided with
   */
  constructor(entity: Entity) {
    this.entity = entity;
  }
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

    const isColliding = testMethod(entity, testEntity);
    if (!isColliding) {
      return;
    }

    collisions.push(new SATCollision(testEntity));
  });

  return collisions;
};

// Entity Collision Test
export enum VoronoiRegion {
  LeftVoronoiRegion = 1,
  MiddleVoronoiRegion = 2,
  RightVoronoiRegion = 3,
}

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

export const testParticleCircle = (a: Entity, b: Entity): boolean => {
  const bAsCircle = b as CircleEntity;
  if (!bAsCircle) {
    throw new Error("Invalid type");
  }

  const differenceV = bAsCircle.position;
  const radiusSq = bAsCircle.radius * bAsCircle.radius;
  const distanceSq = differenceV.length2();

  return distanceSq <= radiusSq;
};

export const testParticlePolygon = (a: Entity, b: Entity): boolean => {
  const bAsPolygon = b as PolygonEntity;
  if (!bAsPolygon) {
    throw new Error("Invalid type");
  }

  throw new Error("Not yet implemented");
};

export const testCircleCircle = (a: Entity, b: Entity): boolean => {
  const aAsCircle = a as CircleEntity;
  const bAsCircle = b as CircleEntity;
  if (!aAsCircle || !bAsCircle) {
    throw new Error("Invalid type");
  }

  // Check if the distance between the centers of the two
  // circles is greater than their combined radius.
  const differenceV = aAsCircle
    .position
    .clone()
    .subtract(aAsCircle.position);

  const totalRadius = aAsCircle.radius * bAsCircle.radius;
  const totalRadiusSq = totalRadius * totalRadius;
  const distanceSq = differenceV.length2();

  // If the distance is bigger than the combined radius, they don't intersect.
  if (distanceSq > totalRadiusSq) {
    return false;
  }

  return true;
};

export const testPolygonCircle = (a: Entity, b: Entity): boolean => {
  const aAsPolygon = a as PolygonEntity;
  const bAsCircle = b as CircleEntity;
  if (!aAsPolygon || !bAsCircle) {
    throw new Error("Invalid type");
  }

  const circlePos = bAsCircle
    .position
    .clone()
    .subtract(aAsPolygon.position);

  const radius = bAsCircle.radius;
  const radius2 = radius * radius;
  const points = aAsPolygon.shape.calcPoints;
  const len = points.length;
  const edge = new Vector2(0, 0);
  const point = new Vector2(0, 0);

  for (let i = 0; i < len; i += 1) {
    const next = i === len - 1 ? 0 : i + 1;
    const prev = i === 0 ? len - 1 : i - 1;
    const overlap = 0;
    const overlapN = null;

    // Get the edge.
    edge.copy(aAsPolygon.shape.edges[i]);
    // Calculate the center of the circle relative to the starting point of the edge.
    point.copy(circlePos).subtract(points[i]);

    // Calculate which Voronoi region the center of the circle is in.
    let region = voronoiRegion(edge, point);

    // If it's the left region:
    if (region === VoronoiRegion.LeftVoronoiRegion) {
      // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
      edge.copy(aAsPolygon.shape.edges[prev]);

      // Calculate the center of the circle relative the starting point of the previous edge
      const point2 = new Vector2(0, 0)
        .copy(circlePos)
        .subtract(points[prev]);

      region = voronoiRegion(edge, point2);
      if (region === RIGHT_VORONOI_REGION) {
        // It's in the region we want.  Check if the circle intersects the point.
        var dist = point.len();
        if (dist > radius) {
          // No intersection
          T_VECTORS.push(circlePos);
          T_VECTORS.push(edge);
          T_VECTORS.push(point);
          T_VECTORS.push(point2);
          return false;
        } else if (response) {
          // It intersects, calculate the overlap.
          response['bInA'] = false;
          overlapN = point.normalize();
          overlap = radius - dist;
        }
      }
      T_VECTORS.push(point2);
      // If it's the right region:
    } else if (region === VoronoiRegion.RightVoronoiRegion) {

    } else {

    }
  }
};

export const testCirclePolygon = (a: Entity, b: Entity): boolean => {
  const aAsCircle = a as CircleEntity;
  const bAsPolygon = b as PolygonEntity;
  if (!aAsCircle || !bAsPolygon) {
    throw new Error("Invalid type");
  }

  return false;
};

export const testPolygonPolygon = (a: Entity, b: Entity): boolean => {
  const aAsPolygon = a as PolygonEntity;
  const bAsPolygon = b as PolygonEntity;
  if (!aAsPolygon || !bAsPolygon) {
    throw new Error("Invalid type");
  }

  return false;
};

const testMethods: { [key: string]: (a: Entity, b: Entity) => boolean } = {
  testCircleCircle,
  testCirclePolygon,
  testParticleCircle,
  testParticlePolygon,
  testPolygonCircle,
  testPolygonPolygon,
};
