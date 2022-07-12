import LivingEntity from "./LivingEntity.js";
import Sprite from "./Sprite.js";

export default class Enemy extends LivingEntity {
    #path
    #waypointIndex = 1

    constructor({ path, speed, frames, radius, imgSrc, spacing = 0 } = {}) {
        super({
            position: {
                x: path[0].x - spacing,
                y: path[0].y
            },
            size: {
                width: radius * 2,
                height: radius * 2
            },
            speed,
            frames,
            imgSrc,
            radius,
            renderPosition: Sprite.RENDER_POSTIONS.top
        })
        this.#path = path

    }

    #draw(c) {
        // c.fillStyle = "red"
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // c.fill()
    }

    #atWaypoint(wp) {
        return Math.round(this.position.x) === Math.round(wp.x) && Math.round(this.position.y) === Math.round(wp.y)
    }

    update(c) {
        this.target = this.#path[this.#waypointIndex]
        if (this.#atWaypoint(this.#path[this.#waypointIndex])) this.#waypointIndex++
        if (this.#waypointIndex === this.#path.length) return this.spawned = false

        super.update(c)
        //this.#draw(c)
    }
}