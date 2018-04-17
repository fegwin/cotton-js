import { Entity } from './entity';
import { BoundingBox, Vec } from './util/math';

export class Layer {
  private width: number;
  private height: number;

  public bounds: BoundingBox;

  private entities: Entity[] = [];

  private buffer: HTMLCanvasElement;
  private bufferContext: CanvasRenderingContext2D;

  public constructor(width: number, height: number, entities: Entity[] = []) {
    this.width = width;
    this.height = height;

    this.buffer = document.createElement('canvas');
    this.buffer.width = width;
    this.buffer.height = height;
    this.bufferContext = this.buffer.getContext('2d');

    this.calculateBounds();
    this.addEntities(entities);
  }

  private calculateBounds() {
    this.bounds = new BoundingBox(new Vec(0, 0), new Vec(this.width, this.height));
  }

  public addEntity(entity: Entity): void {
    this.addEntities([entity]);
  }

  public addEntities(entities: Entity[]): void {
    entities.forEach(entity => entity.setup());
    this.entities = this.entities.concat(entities);
  }

  public removeEntity(entity: Entity): void {
    this.entities = this.entities.filter(e => {
      return e !== entity;
    });
  }

  public update(deltaTime: number): void {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(deltaTime);
    }
  }

  public drawOnTo(bufferContext: CanvasRenderingContext2D): void {
    //this.bufferContext.clearRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.entities.length; i++) {
      var entity = this.entities[i];
      // Only draw the entity if it is visible.
      if (BoundingBox.overlaps(this.bounds, entity.bounds)) entity.drawTo(bufferContext);
    }

    //bufferContext.drawImage(this.buffer, 0, 0);
  }
}
