export class CanvasHelper {
    public static getCanvas(canvasId: string):HTMLCanvasElement {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }
}