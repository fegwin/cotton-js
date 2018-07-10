import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";
import { Swipe } from "./swipe";
export declare const input: {
    CLICK: string;
    KEYDOWN: string;
    KEYUP: string;
    MOVE: string;
    PRESSED: number;
    RELEASED: number;
    SWIPEDOWN: string;
    SWIPEIDLE: string;
    SWIPELEFT: string;
    SWIPERIGHT: string;
    SWIPEUP: string;
    Keyboard: typeof Keyboard;
    Mouse: typeof Mouse;
    Swipe: typeof Swipe;
};
