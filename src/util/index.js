import image from './image';
import json from './json';
import { BoundingBox, getRandomNumber, Matrix, Vec } from './math';

const toExport = Object.assign(image, json, {
  BoundingBox,
  getRandomNumber,
  Matrix,
  Vec,
});

export default toExport;
