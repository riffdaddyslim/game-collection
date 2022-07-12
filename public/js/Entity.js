import Sprite from "./Sprite.js"

export default class Entity extends Sprite {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        renderPosition,
        offset
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderPosition,
            offset
        })
    }

    isCollisionSquare(item) {
        return (item.x > this.position.x &&
            item.x < this.position.x + this.size.width &&
            item.y > this.position.y &&
            item.y < this.position.y + this.size.height)
    }
}