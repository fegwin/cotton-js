import { Buffer } from "./buffer";
import { loadImage } from "./util/image";
import { loadJson } from "./util/json";

// TODO Various null checkingz
export class SpriteSheet {
  public static createSpriteSheet(spriteDef: any, spriteImage: HTMLImageElement): SpriteSheet {
    if (!spriteDef.width || !spriteDef.height) {
      throw new Error("Inalid sprite def");
    }

    const sprites: { [name: string]: Buffer[] } = {};

    if (spriteDef.sprites) {
      spriteDef.sprites.forEach((sprite: any) => {
        const spriteBuffers = [false, true].map((flip) => {
          const buf = new Buffer(sprite.width, sprite.height);
          const context = buf.getContext();

          if (flip) {
            context.scale(-1, -1);
            context.translate(-sprite.width, 0);
          }

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

        sprites[sprite.name] = spriteBuffers;
      });
    }

    const animations: { [name: string]: (animationDelta: number, flip: boolean) => string } = {};

    // Define animation frames
    if (spriteDef.animations) {
      spriteDef.animations.forEach((animation: any) => {
        animations[animation.name] = (animationDelta: number, flip: boolean) => {
          const spriteIndex = Math.floor(animationDelta / animation.animationLength) % animation.sprites.length;
          return animation.sprites[spriteIndex];
        };
      });
    }

    return new SpriteSheet(sprites, animations);
  }

  public static async loadSpriteSheet(assetPath: string, name: string): Promise<SpriteSheet> {
    const spriteDef = await loadJson(`${assetPath}/${name}.json`);

    if (!spriteDef.imageUrl) {
      throw new Error("Invalid SpriteDef");
    }

    const spriteImage = await loadImage(`${spriteDef.imageUrl}`);
    return SpriteSheet.createSpriteSheet(spriteDef, spriteImage);
  }

  private sprites: { [name: string]: Buffer[] };
  private animations: { [name: string]: (animationDelta: number, flip: boolean) => string };

  public constructor(
    sprites: { [name: string]: Buffer[] },
    animations: { [name: string]: (animationDelta: number, flip: boolean) => string }) {
    this.sprites = sprites;
    this.animations = animations;
  }

  public getSprite(name: string, flip: boolean): Buffer {
    return this.sprites[name][flip ? 1 : 0];
  }

  public getSpriteForAnimation(name: string, animationDelta: number, flip: boolean) {
    return this.animations[name](animationDelta, flip);
  }
}
