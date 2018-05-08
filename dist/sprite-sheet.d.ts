import { Buffer } from "./buffer";
export declare class SpriteSheet {
    static createSpriteSheet(spriteDef: any, spriteImage: HTMLImageElement): SpriteSheet;
    static loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet>;
    private sprites;
    private animations;
    constructor(sprites: {
        [name: string]: Buffer[];
    }, animations: {
        [name: string]: (animationDelta: number, flip: boolean) => string;
    });
    getSprite(name: string, flip: boolean): Buffer;
    getSpriteForAnimation(name: string, animationDelta: number, flip: boolean): string;
}
