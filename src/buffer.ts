/**
 * Used as a container to paint on
 */
export class Buffer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  /**
   * @param width The width of the buffer
   * @param height The height of the buffer
   * @param canvas An existing element that will be used to paint with
   */
  constructor(width: number, height: number, canvas?: HTMLCanvasElement) {
    this.canvas = canvas || document.createElement("canvas");
    this.canvas.width = canvas ? canvas.width : width;
    this.canvas.height = canvas ? canvas.height : height;
    this.context = this.canvas.getContext("2d");

    this.width = width;
    this.height = height;
  }

  /**
   * Retrieve the context of the buffer
   */
  public getContext() {
    return this.context;
  }

  /**
   * Retrieve the canvas of the buffer
   */
  public getCanvas() {
    return this.canvas;
  }

  /**
   * Clears the buffer and remove anything painted
   */
  public clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
