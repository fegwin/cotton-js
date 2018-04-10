export default class Animator {
  constructor(compositor, context, deltaTime = 1 / 60) {
    this.accumulatedTime = 0;
    this.lastTime = 0;
    this.deltaTime = deltaTime;

    this.compositor = compositor;
    this.context = context;
  }

  enqueue() {
    window.requestAnimationFrame(this.update);
  }

  update(time) {
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

  animate(deltaTime) {
    this.compositor.update(deltaTime);
    this.compositor.draw(this.context);
  }

  start() {
    this.enqueue();
  }
}
