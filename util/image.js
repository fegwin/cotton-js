export default function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.src = url;
  });
}
