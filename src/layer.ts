import { Entity } from './entity';
import { BoundingBox, Point } from './util/math';
import { Buffer } from './buffer';

export class Layer {
  private width: number;
  private height: number;

  public bounds: BoundingBox;

  private entities: Entity[] = [];

  private buffer: Buffer;

  public constructor(width: number, height: number, entities: Entity[] = []) {
    this.width = width;
    this.height = height;

    this.buffer = new Buffer(this.width, this.height);

    this.calculateBounds();
    this.addEntities(entities);
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(new Point(0, 0), new Point(this.width, this.height));
  }

  public addEntity(entity: Entity): void {
    this.addEntities([entity]);
  }

  public addEntities(entities: Entity[]): void {
    this.entities = this.entities.concat(entities);
  }

  public removeEntity(entity: Entity): void {
    this.entities = this.entities.filter(e => {
      return e !== entity;
    });
  }

  // This method is called to request all entities to run their calculations
  // General use will not require you to call this
  // This is called for you by the animator
  public update(deltaTime: number): void {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(deltaTime);
    }
  }

  // This method is called to update the layer buffer and then paint
  // the resulting canvas onto the passed in context
  // This is called for you by the animator
  public paintOn(context: CanvasRenderingContext2D): void {
    this.buffer.clear();

    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      // Only draw the entity if it is visible.
      if (BoundingBox.overlaps(this.bounds, entity.bounds)) entity.paintOn(this.buffer.getContext());
    }

    context.drawImage(this.buffer.getCanvas(), 0, 0);
  }
}
