export default abstract class SpriteSheet {
    private width;
    private height;
    private image;
    private tiles;
    constructor(width: number, height: number);
    abstract loadImage(): Promise<HTMLImageElement>;
}
