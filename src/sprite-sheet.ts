import { MemoryCanvas } from "./memory-canvas";
import { loadImage } from "./util/image";
import { loadJson } from "./util/json";

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

/**
 * Provides an easy SpriteSheet API
 * Supported sprite sheets follow the CottonJs sprite definition specification
 * This is a JSON file accompanied by an image file
 * The resulting SpriteSheet class contains named sprites and animations
 * Each sprite will have a pre-drawn buffer in memory
 */
export class SpriteSheet {
  /**
   * Static method will return a SpriteSheet class from the provided
   * CottonJs sprite definition and sprite image
   * @param spriteDef CottonJs sprite definition file (JSON)
   * @param spriteImage Image containing the sprites
   */
  public static createSpriteSheet(spriteDef: ISpriteDefinition, spriteImage: HTMLImageElement): SpriteSheet {
    const sprites: { [name: string]: MemoryCanvas[][] } = {};

    if (spriteDef.sprites) {
      spriteDef.sprites.forEach((sprite: ISprite) => {
        const spriteBuffers = [false, true].map((flipX) => {
          return [false, true].map((flipY) => {
              const buf = new MemoryCanvas(sprite.width, sprite.height);
              const context = buf.getContext();

              context.scale(flipX ? -1 : 1, flipY ? -1 : 1);
              context.translate(flipX ? -sprite.width : 0, flipY ? -sprite.height : 0);

              context.drawImage(
                spriteImage,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height,
                0,
                0,
                sprite.width,
                sprite.height,
              );

              return buf;
            });
          });

        sprites[sprite.name] = spriteBuffers;
      });
    }

    const animations: { [name: string]: (animationDelta: number) => string } = {};

    // Define animation frames
    if (spriteDef.animations) {
      spriteDef.animations.forEach((animation: IAnimation) => {
        animations[animation.name] = (animationDelta: number) => {
          const spriteIndex = Math.floor(animationDelta / animation.animationLength) % animation.sprites.length;
          return animation.sprites[spriteIndex];
        };
      });
    }

    return new SpriteSheet(sprites, animations);
  }

  /**
   * This async method will load a CottonJs sprite definition file, and it's
   * corresponding image file. A SpriteSheet class will be created and returned using
   * the createSpriteSheet method
   * @param assetPath Path to asset location
   * @param name Name of CottonJs sprite definition file (JSON file)
   */
  public static async loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet> {
    const spriteDef = await loadJson(`${assetPath}/${name}.json`);

    if (!spriteDef.imageUrl) {
      throw new Error("Invalid SpriteDef");
    }

    const spriteImage = await loadImage(`${spriteDef.imageUrl}`);
    return SpriteSheet.createSpriteSheet(spriteDef, spriteImage);
  }

  private sprites: { [name: string]: MemoryCanvas[][] };
  private animations: { [name: string]: (animationDelta: number) => string };

  private constructor(
    sprites: { [name: string]: MemoryCanvas[][] },
    animations: { [name: string]: (animationDelta: number) => string }) {
    this.sprites = sprites;
    this.animations = animations;
  }

  /**
   * Sprite buffer is returned by name. Optional flipXY params.
   * @param name Name of sprite to be retrieved
   * @param flipX Mirror sprite horizontally?
   * @param flipY Mirror sprite vertically?
   */
  public getSprite(name: string, flipX: boolean, flipY: boolean): MemoryCanvas {
    if (!this.sprites[name]) {
      throw new Error(`Sprite ${name} is not defined`);
    }

    return this.sprites[name][flipX ? 1 : 0][flipY ? 1 : 0];
  }

  /**
   * A sprite name is returned from a defined animation.
   * @param name Name of animation you are trying to retrieve a sprite for
   * @param animationDelta "Distance" through the animation. This is used to index the sprite in the animation
   */
  public getSpriteForAnimation(name: string, animationDelta: number) {
    if (!this.animations[name]) {
      throw new Error(`Animation ${name} is not defined`);
    }

    return this.animations[name](animationDelta);
  }
}
