import { Buffer } from "./buffer";
export declare class SpriteSheet {
    static createSpriteSheet(spriteDef: any, spriteImage: HTMLImageElement): SpriteSheet;
    static loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet>;
    private sprites;
    constructor(sprites: {
        [name: string]: Buffer[];
    });
}
