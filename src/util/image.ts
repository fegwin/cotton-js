import { Promise } from "es6-promise";

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.src = url;
  });
}
