export declare class Keyboard {
    private keyStates;
    private keyMap;
    constructor(htmlElement: HTMLElement);
    addMapping(code: string, callback: () => void): void;
    handleEvent(event: KeyboardEvent): void;
}
