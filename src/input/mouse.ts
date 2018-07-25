import { Vector2 } from "../util/math";

export const CLICK = "click";
export const MOVE = "move";

export interface IMouseInfo {
  pointerPosition: Vector2;
  buttonCode: string;
}

export class Mouse {
  private pointerPosition: Vector2;
  private mouseMap: { [key: string]: Array<(mouseInfo: IMouseInfo) => void> };

  constructor(htmlElement: HTMLElement) {
    // Holds the callback functions for the various bindings
    this.mouseMap = {};

    // Current position of the pointer
    this.pointerPosition = new Vector2(0, 0);

    htmlElement.addEventListener("mousemove", (e) => this.handleMoveEvent(e));
    htmlElement.addEventListener("click", (e) => this.handleClickEvent(e as MouseEvent));
    htmlElement.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  public addMapping(code: string, callback: (mouseInfo: IMouseInfo) => void) {
    if (!this.mouseMap[code]) {
      this.mouseMap[code] = new Array<() => void>();
    }

    this.mouseMap[code].push(callback);
  }

  public handleClickEvent(event: MouseEvent) {
    event.preventDefault();

    if (!this.mouseMap[CLICK]) {
      return;
    }

    this.mouseMap[CLICK]
      .forEach((callback) => callback({
        buttonCode: CLICK,
        pointerPosition: this.pointerPosition,
      }));
  }

  public handleMoveEvent(event: MouseEvent) {
    event.preventDefault();
    this.pointerPosition.set(event.clientX, event.clientY);

    if (!this.mouseMap[MOVE]) {
      return;
    }

    this.mouseMap[MOVE]
      .forEach((callback) => callback({
        buttonCode: null,
        pointerPosition: this.pointerPosition,
      }));
  }
}
