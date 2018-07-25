import { Vector2 } from "../util/math";

export const CLICK = "click";
export const MOVE = "move";

export interface IMouseInfo {
  pointerPositionPage: Vector2;
  pointerPositionOffset: Vector2;
  pointerPositionScreen: Vector2;
  pointerPositionClient: Vector2;
  buttonCode: string;
}

export class Mouse {
  private pointerPositionClient: Vector2;
  private pointerPositionScreen: Vector2;
  private pointerPositionOffset: Vector2;
  private pointerPositionPage: Vector2;

  private mouseMap: { [key: string]: Array<(mouseInfo: IMouseInfo) => void> };

  constructor(htmlElement: HTMLElement) {
    // Holds the callback functions for the various bindings
    this.mouseMap = {};

    // Current position of the pointer
    this.pointerPositionPage = new Vector2(0, 0);
    this.pointerPositionOffset = new Vector2(0, 0);
    this.pointerPositionScreen = new Vector2(0, 0);
    this.pointerPositionClient = new Vector2(0, 0);

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
        pointerPositionClient: this.pointerPositionClient,
        pointerPositionOffset: this.pointerPositionOffset,
        pointerPositionPage: this.pointerPositionPage,
        pointerPositionScreen: this.pointerPositionScreen,
      }));
  }

  public handleMoveEvent(event: MouseEvent) {
    event.preventDefault();
    this.pointerPositionClient.set(event.clientX, event.clientY);
    this.pointerPositionPage.set(event.pageX, event.pageY);
    this.pointerPositionOffset.set(event.offsetX, event.offsetY);
    this.pointerPositionScreen.set(event.screenX, event.screenY);

    if (!this.mouseMap[MOVE]) {
      return;
    }

    this.mouseMap[MOVE]
      .forEach((callback) => callback({
        buttonCode: null,
        pointerPositionClient: this.pointerPositionClient,
        pointerPositionOffset: this.pointerPositionOffset,
        pointerPositionPage: this.pointerPositionPage,
        pointerPositionScreen: this.pointerPositionScreen,
      }));
  }
}
