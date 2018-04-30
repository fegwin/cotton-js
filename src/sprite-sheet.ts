import { Buffer } from "./buffer";

export default abstract class SpriteSheet {
  private width: number;
  private height: number;

  private image: HTMLImageElement;
  private tiles: { [id: number]: Buffer };

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.tiles = {};
  }

  public abstract async loadImage(): Promise<HTMLImageElement>;
}
