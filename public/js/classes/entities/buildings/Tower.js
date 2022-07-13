import Entity from "../Entity.js";
import Sprite from "../../Sprite.js";

export default class Tower extends Entity {
    #radius = 0
    #size

    constructor({
        position,
        size,
        imgSrc,
        frames,
        radius = 250
    } = {}) {
        super({
            position,
            size,
            imgSrc: "/images/tower.png",
            frames: {
                max: 19,
                duration: 6
            },
            renderCenter: 0
        })

        this.#radius = radius
    }

    #draw(c, mouse) {
        const CENTER = this.getCenter()
        
        if (this.isCollisionSquare(mouse.target)) {
            c.fillStyle = "rgba(0,0,0,0.5)"
            c.beginPath()
            c.arc(CENTER.x, CENTER.y, this.#radius, 0, Math.PI * 2)
            c.fill()
        }
    }

    update(c, mouse) {
        this.#draw(c, mouse)
        super.update(c)
    }
}