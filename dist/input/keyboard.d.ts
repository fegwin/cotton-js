export declare const PRESSED = 1;
export declare const RELEASED = 0;
export declare const KEYDOWN = "keydown";
export declare const KEYUP = "keyup";
export declare class Keyboard {
    private keyStates;
    private keyMap;
    constructor(htmlElement: HTMLElement);
    addMapping(code: string, callback: (keyState: number) => void): void;
    private handleEvent(event);
}
