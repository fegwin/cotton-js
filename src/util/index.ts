import image from "./image";
import json from "./json";
import { BoundingBox, getRandomNumber, Vec } from "./math";

const util = Object.assign(image, json, {
  BoundingBox,
  getRandomNumber,
  Vec
});

export default util;
