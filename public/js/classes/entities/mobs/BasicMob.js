import Sprite from "../../Sprite.js";
import LivingEntity from "../LivingEntity.js";

export default class BasicMob extends LivingEntity {
    #path
    #waypointIndex = 1

    constructor({ path, speed, frames, radius, imgSrc, damage, spacing = 0 } = {}) {
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
            damage,
            renderPosition: Sprite.RENDER_POSTIONS.topLeft
        })
        this.#path = path
    }

    #atWaypoint(wp) {
        return Math.round(this.position.x) === Math.round(wp.x) && Math.round(this.position.y) === Math.round(wp.y)
    }

    update(c) {
        this.target = this.#path[this.#waypointIndex]
        if (this.#atWaypoint(this.#path[this.#waypointIndex])) this.#waypointIndex++
        if (this.#waypointIndex === this.#path.length) this.spawned = false

        super.update(c)

        let updates = {}
        if (this.#path.length === this.#waypointIndex) updates.damage = this.damage

        return updates
    }
}