import { Vector2 } from "../util/math";
export declare const CLICK = "click";
export declare const MOVE = "move";
export interface IMouseInfo {
    pointerPosition: Vector2;
    buttonCode: string;
}
export declare class Mouse {
    private pointerPosition;
    private mouseMap;
    constructor(htmlElement: HTMLElement);
    addMapping(code: string, callback: () => void): void;
    handleClickEvent(event: MouseEvent): void;
    handleMoveEvent(event: MouseEvent): void;
}
