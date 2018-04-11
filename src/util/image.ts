export default class CottonImage {
  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const img = new Image();
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.src = url;
    });
  }
}
