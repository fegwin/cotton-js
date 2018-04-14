import { Entity } from './entity';

export class Layer {
  private entities: Entity[];
  private width: number;
  private height: number;
  private buffer: HTMLCanvasElement;
  private bufferContext: CanvasRenderingContext2D;

  public constructor(width: number, height: number, entities: Entity[] = []) {
    this.entities = entities;
    this.width = width;
    this.height = height;

    this.buffer = document.createElement('canvas');
    this.buffer.width = width;
    this.buffer.height = height;
    this.bufferContext = this.buffer.getContext('2d');
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  public removeEntity(entity: Entity): void {
    this.entities = this.entities.filter(e => {
      return e !== entity;
    });
  }

  public update(deltaTime: number): void {
    this.entities.forEach(entity => entity.update(deltaTime));
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.bufferContext.clearRect(0, 0, this.width, this.height);
    this.entities.forEach(entity => entity.draw(context));
    context.drawImage(this.buffer, 0, 0);
  }
}
