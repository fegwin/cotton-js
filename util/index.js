import image from './image';
import json from './json';
import { BoundingBox, getRandomNumber, Matrix, Vec } from './math';

export default {
  ...image,
  ...json,
  BoundingBox,
  getRandomNumber,
  Matrix,
  Vec,
};
