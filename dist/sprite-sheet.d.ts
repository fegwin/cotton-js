import { MemoryCanvas } from "./memory-canvas";
export interface IAnimation {
    name: string;
    animationLength: number;
    sprites: string[];
}
export interface ISprite {
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ISpriteDefinition {
    name: string;
    imageUrl: string;
    animations: IAnimation[];
    sprites: ISprite[];
}
export declare class SpriteSheet {
    static createSpriteSheet(spriteDef: ISpriteDefinition, spriteImage: HTMLImageElement): SpriteSheet;
    static loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet>;
    private sprites;
    private animations;
    private constructor();
    getSprite(name: string, flipX: boolean, flipY: boolean): MemoryCanvas;
    getSpriteForAnimation(name: string, animationDelta: number): string;
}
