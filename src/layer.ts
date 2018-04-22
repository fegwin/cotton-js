import { Buffer } from "./buffer";
import { Entity } from "./entity";
import { EntityGraph } from "./entity-graph";
import { BoundingBox, Point } from "./util/math";

export class Layer {
  public bounds: BoundingBox;

  private width: number;
  private height: number;

  private entityGraph: EntityGraph;
  private entities: Entity[] = [];

  private buffer: Buffer;

  public constructor(width: number, height: number, entityGraph: EntityGraph, entities: Entity[] = []) {
    this.width = width;
    this.height = height;

    this.entityGraph = entityGraph;
    this.buffer = new Buffer(this.width, this.height);

    this.calculateBounds();
    this.addEntities(entities);
  }

  public addEntity(entity: Entity): void {
    this.addEntities([entity]);
  }

  public addEntities(entities: Entity[]): void {
    this.entities = this.entities.concat(entities);
  }

  public removeEntity(entity: Entity): void {
    this.entities = this.entities.filter((e) => {
      return e !== entity;
    });
    this.entityGraph.deregisterEntity(entity);
  }

  // This method is called to request all entities to run their calculations
  // General use will not require you to call this
  // This is called for you by the animator
  public update(deltaTime: number): void {
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }
  }

  // This method is called to update the layer buffer and then paint
  // the resulting canvas onto the passed in context
  // This is called for you by the animator
  public paintOn(context: CanvasRenderingContext2D): void {
    this.buffer.clear();

    for (const entity of this.entities) {
      // Only draw the entity if it is visible.
      if (BoundingBox.overlaps(this.bounds, entity.bounds)) {
        entity.paintOn(this.buffer.getContext());
      }
    }

    context.drawImage(this.buffer.getCanvas(), 0, 0);
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(new Point(0, 0), new Point(this.width, this.height));
  }
}
