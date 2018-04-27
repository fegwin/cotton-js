import { Compositor } from "./compositor";
/**
 * Animates all entities in CottonJS.
 * This class controls the updating of
 * entities based on delta time (FPS)
 */
export class Animator {
  private compositor: Compositor;
  private deltaTime: number;
  private lastTime: number;
  private accumulatedTime: number;

  /**
   * @param compositor The compositor to animate
   * @param deltaTime The time since the last update cycle
   */
  public constructor(compositor: Compositor, deltaTime: number = 1 / 60) {
    this.accumulatedTime = 0;
    this.lastTime = 0;
    this.deltaTime = deltaTime;
    this.compositor = compositor;

    this.animate = this.animate.bind(this);
  }

  /**
   * Start the animator
   */
  public start(): void {
    this.enqueue();
  }

  /**
   * Provides the logic to step animation and provide
   * the logic for the game loop. This includes handling
   * of time and the step size between animation frames.
   * @param time The time since the animation has started
   */
  protected animate(time: number): void {
    this.accumulatedTime += (time - this.lastTime) / 1000;

    if (this.accumulatedTime > 1) {
      this.accumulatedTime = 1;
    }

    while (this.accumulatedTime >= this.deltaTime) {
      this.compositor.update(this.deltaTime);
      this.accumulatedTime -= this.deltaTime;
    }

    this.compositor.paint();
    this.lastTime = time;

    this.enqueue();
  }

  private enqueue(): void {
    window.requestAnimationFrame(this.animate);
  }
}
