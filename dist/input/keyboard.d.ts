export declare class Keyboard {
    keyStates: {
        [key: string]: number;
    };
    keyMap: {
        [key: string]: Array<(keyState: number) => void>;
    };
    constructor(htmlElement: HTMLElement);
    addMapping(code: string, callback: () => void): void;
    handleEvent(event: KeyboardEvent): void;
}
