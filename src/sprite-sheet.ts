import { Buffer } from "./buffer";
import { loadImage } from "./util/image";
import { loadJson } from "./util/json";

export class SpriteSheet {
  public static createSpriteSheet(spriteDef: any, spriteImage: HTMLImageElement): SpriteSheet {
    if (!spriteDef.width || !spriteDef.height) {
      throw new Error("Inalid sprite def");
    }

    const spriteWidth = spriteDef.width;
    const spriteHeight = spriteDef.height;

    const sprites: { [name: string]: Buffer[] } = {};

    if (spriteDef.sprites) {
      spriteDef.sprites.forEach((sprite: any) => {
        const spriteBuffers = [false, true].map((flip) => {
          const buf = new Buffer(spriteWidth, spriteHeight);
          const context = buf.getContext();

          if (flip) {
            context.scale(-1, -1);
            context.translate(-spriteWidth, 0);
          }

          context.drawImage(
            spriteImage,
            sprite.x * spriteWidth,
            sprite.y * spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth,
            spriteHeight,
          );

          return buf;
        });

        sprites[sprite.name] = spriteBuffers;
      });
    }

    // Define animation frames

    return new SpriteSheet(sprites);
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

  public constructor(sprites: { [name: string]: Buffer[] }) {
    this.sprites = sprites;
  }
}
