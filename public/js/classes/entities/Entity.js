import Sprite from "../Sprite.js"

export default class Entity extends Sprite {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        renderCenter,
        radius
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter
        })

        this.radius = radius
    }

    getCenter() {
        return {
            x: this.position.x + this.size.width / 2,
            y: this.position.y + this.size.height / 2
        }
    }

    isCollisionSquare(item) {
        return (item.x > this.position.x &&
            item.x < this.position.x + this.size.width &&
            item.y > this.position.y &&
            item.y < this.position.y + this.size.height)
    }

    isCollisionCircle(item) {
        console.log(item)
    }
}