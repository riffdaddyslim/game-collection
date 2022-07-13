import Entity from "../Entity.js";

export default class Tower extends Entity {
    constructor({
        position,
        size,
        imgSrc = "/images/tower.png",
        frames = {
            max: 19,
            duration: 6
        },
        radius = 250,
        renderCenter = 0
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter,
            radius
        })
    }

    #draw(c, mouse) {
        const CENTER = this.getCenter()
        
        if (this.isCollisionSquare(mouse.target)) {
            c.fillStyle = "rgba(0,0,0,0.5)"
            c.beginPath()
            c.arc(CENTER.x, CENTER.y, this.radius, 0, Math.PI * 2)
            c.fill()
        }
    }

    update(c, mouse) {
        this.#draw(c, mouse)
        super.update(c)
    }
}