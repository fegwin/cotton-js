import Entity from "./Entity";

export default class Layer {
  entities: Entity[];
  width: number;
  height: number;
  buffer: HTMLCanvasElement;
  bufferContext: CanvasRenderingContext2D;

  constructor(width: number, height: number, entities = []) {
    this.entities = entities;
    this.width = width;
    this.height = height;

    this.buffer = document.createElement("canvas");
    this.buffer.width = width;
    this.buffer.height = height;
    this.bufferContext = this.buffer.getContext("2d");
  }

  update(deltaTime: number) {
    this.entities.forEach(entity => entity.update(deltaTime));
  }

  draw(context: CanvasRenderingContext2D) {
    this.bufferContext.clearRect(0, 0, this.width, this.height);
    this.entities.forEach(entity => entity.draw());
    context.drawImage(this.buffer, 0, 0);
  }
}
