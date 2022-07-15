import Sprite from "../Sprite.js"

export default class Entity extends Sprite {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        renderCenter,
        radius,
        game
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter
        })

        this.radius = radius
        this.game = game
    }

    getCenter() {
        return {
            x: this.position.x + this.size.width / 2,
            y: this.position.y + this.size.height / 2
        }
    }

    getRectHitbox() {
        return {
            ...this.position,
            ...this.size
        }
    }

    getCircleHitbox() {
        return {
            ...this.getCenter(),
            radius: this.radius
        }
    }
}