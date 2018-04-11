import image from "./image";
import json from "./json";
import { BoundingBox, getRandomNumber, Vec } from "./math";

export default Object.assign(image, json, {
  BoundingBox,
  getRandomNumber,
  Vec
});
