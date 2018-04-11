import Compositor from "./Compositor";

export default class Animator {
  context: any;
  compositor: Compositor;
  deltaTime: number;
  lastTime: number;
  accumulatedTime: number;

  constructor(
    compositor: Compositor,
    context: CanvasRenderingContext2D,
    deltaTime: number = 1 / 60
  ) {
    this.accumulatedTime = 0;
    this.lastTime = 0;
    this.deltaTime = deltaTime;

    this.compositor = compositor;
    this.context = context;
  }

  enqueue() {
    window.requestAnimationFrame(this.update);
  }

  update(time: number) {
    this.accumulatedTime += (time - this.lastTime) / 1000;

    if (this.accumulatedTime > 1) {
      this.accumulatedTime = 1;
    }

    while (this.accumulatedTime > this.deltaTime) {
      this.animate(this.deltaTime);
      this.accumulatedTime -= this.deltaTime;
    }

    this.lastTime = time;

    this.enqueue();
  }

  animate(deltaTime: number) {
    this.compositor.update(deltaTime);
    this.compositor.draw(this.context);
  }

  start() {
    this.enqueue();
  }
}
