import { Promise } from "es6-promise";

export class CottonImage {
  public loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.src = url;
    });
  }
}
