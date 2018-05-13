export const SWIPEUP = "swipeup";
export const SWIPEDOWN = "swipedown";
export const SWIPELEFT = "swipeleft";
export const SWIPERIGHT = "swiperight";
export const SWIPEIDLE = "swipeidle";

export class Swipe {
  private xDown: number;
  private yDown: number;
  private xDiff: number;
  private yDiff: number;
  private swipeMap: { [key: string]: Array<() => void> };

  constructor(htmlElement: HTMLElement) {
    this.xDown = null;
    this.yDown = null;

    this.swipeMap = {};

    htmlElement.addEventListener("touchstart", (e) => this.handleEventStart(e as TouchEvent), false);
    htmlElement.addEventListener("touchend", (e) => this.handleEventStop(e as TouchEvent), false);
    htmlElement.addEventListener("touchmove", (e) => this.handleEvent(e as TouchEvent), false);
  }

  public addMapping(swipeDirection: string, callback: () => void) {
    if (!this.swipeMap[swipeDirection]) {
      this.swipeMap[swipeDirection] = new Array<() => void>();
    }

    this.swipeMap[swipeDirection].push(callback);
  }

  private handleEventStart(event: TouchEvent) {
    event.preventDefault();
    this.xDown = event.touches[0].clientX;
    this.yDown = event.touches[0].clientY;
  }

  private handleEventStop(event: TouchEvent) {
    event.preventDefault();

    this.xDown = null;
    this.yDown = null;

    this.runMappedEvents(SWIPEIDLE);
  }

  private handleEvent(event: TouchEvent) {
    event.preventDefault();
    if (!this.xDown || !this.yDown) {
      return;
    }

    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    this.xDiff = this.xDown - xUp;
    this.yDiff = this.yDown - yUp;

    if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
      if (this.xDiff > 0) {
        // left swipe
        this.runMappedEvents(SWIPELEFT);
      } else {
        // right swipe
        this.runMappedEvents(SWIPERIGHT);
      }
    } else if (this.yDiff > 0) {
      // up swipe
      this.runMappedEvents(SWIPEUP);
    } else {
      // down swipe
      this.runMappedEvents(SWIPEDOWN);
    }
  }

  private runMappedEvents(swipeDirection: string) {
    if (!this.swipeMap[swipeDirection]) {
      return;
    }

    this.swipeMap[swipeDirection]
      .forEach((callback) => callback());
  }
}
