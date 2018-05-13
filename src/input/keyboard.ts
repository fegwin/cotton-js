export const PRESSED = 1;
export const RELEASED = 0;

export const KEYDOWN = "keydown";
export const KEYUP = "keyup";

export class Keyboard {
  private keyStates: { [key: string]: number };
  private keyMap: { [key: string]: Array<(keyState: number) => void> };

  constructor(htmlElement: HTMLElement) {
    // Holds the current state of a given key
    this.keyStates = {};

    // Holds the callback functions for a key code
    this.keyMap = {};

    [KEYDOWN, KEYUP]
      .forEach(
          (eventName) => htmlElement.addEventListener(eventName, (event) => this.handleEvent(event as KeyboardEvent)),
      );
  }

  public addMapping(code: string, callback: (keyState: number) => void) {
    if (!this.keyMap[code]) {
      this.keyMap[code] = new Array<(keyState: number) => void>();
    }

    this.keyMap[code].push(callback);
  }

  private handleEvent(event: KeyboardEvent) {
    const { code } = event;

    event.preventDefault();

    if (!this.keyMap[code]) {
      // Did not have key mapped.
      return;
    }

    const keyState = event.type === KEYDOWN ? PRESSED : RELEASED;

    if (this.keyStates[code] === keyState) {
      return;
    }

    this.keyStates[code] = keyState;
    this.keyMap[code]
      .forEach((callback) => callback(keyState));
  }
}
