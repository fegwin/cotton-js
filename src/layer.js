export default class Layer {
    constructor(width, height, entities = []) {
        this.entities = entities;
        this.width = width;
        this.height = height;
        this.buffer = document.createElement("canvas");
        this.buffer.width = width;
        this.buffer.height = height;
        this.bufferContext = this.buffer.getContext("2d");
    }
    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
    draw(context) {
        this.bufferContext.clearRect(0, 0, this.width, this.height);
        this.entities.forEach(entity => entity.draw());
        context.drawImage(this.buffer, 0, 0);
    }
}
//# sourceMappingURL=layer.js.map