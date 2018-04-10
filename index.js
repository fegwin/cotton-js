import * as _util from './util';
import Layer from './layer';
import Entity from './entity';
import Animator from './animator';
import Compositor from './compositor';

export const util = { ..._util };
export { default as Layer } from './layer';
export { default as Entity } from './entity';
export { default as Animator } from './animator';
export { default as Compositor } from './compositor';

export default {
  Util: _util,
  Layer,
  Entity,
  Animator,
  Compositor,
  test: () => true,
};
