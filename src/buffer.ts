export class Buffer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  constructor(width: number, height: number, canvas?: HTMLCanvasElement) {
    this.canvas = canvas || document.createElement('canvas');
    this.canvas.width = canvas ? canvas.width : width;
    this.canvas.height = canvas ? canvas.height : height;
    this.context = this.canvas.getContext('2d');
  }

  getContext() {
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
};
