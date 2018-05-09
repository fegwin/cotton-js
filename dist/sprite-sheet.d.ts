import { Buffer } from "./buffer";
export declare class SpriteSheet {
    static createSpriteSheet(spriteDef: any, spriteImage: HTMLImageElement): SpriteSheet;
    static loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet>;
    private sprites;
    private animations;
    private constructor();
    getSprite(name: string, flipX: boolean, flipY: boolean): Buffer;
    getSpriteForAnimation(name: string, animationDelta: number): string;
}
