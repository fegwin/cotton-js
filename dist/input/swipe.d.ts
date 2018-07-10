export declare const SWIPEUP = "swipeup";
export declare const SWIPEDOWN = "swipedown";
export declare const SWIPELEFT = "swipeleft";
export declare const SWIPERIGHT = "swiperight";
export declare const SWIPEIDLE = "swipeidle";
export declare class Swipe {
    private xDown;
    private yDown;
    private xDiff;
    private yDiff;
    private swipeMap;
    constructor(htmlElement: HTMLElement);
    addMapping(swipeDirection: string, callback: () => void): void;
    private handleEventStart(event);
    private handleEventStop(event);
    private handleEvent(event);
    private runMappedEvents(swipeDirection);
}
