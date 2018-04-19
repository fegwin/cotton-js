const PRESSED = 1;
const RELEASED = 0;

const KEYDOWN = 'keydown';
const KEYUP = 'keyup';

export class Keyboard {
  keyStates: { [key: string]: number }
  keyMap: { [key: string]: Array<(keyState: number) => void> }

  constructor() {
    // Holds the current state of a given key
    this.keyStates = {};

    // Holds the callback functions for a key code
    this.keyMap = {};
  }

  addMapping(code: string, callback: () => void) {
    if (!this.keyMap[code]) {
      this.keyMap[code] = new Array<() => void>();
    }

    this.keyMap[code].push(callback);
  }

  handleEvent(event: KeyboardEvent) {
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
      .forEach(callback => callback(keyState));
  }

  listenTo(htmlElement: HTMLElement) {
    [KEYDOWN, KEYUP]
      .forEach(eventName => htmlElement.addEventListener(eventName, event => this.handleEvent(event)));
  }
}
