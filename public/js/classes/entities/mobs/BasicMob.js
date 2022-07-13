import LivingEntity from "../LivingEntity.js";

export default class BasicMob extends LivingEntity {
    #path
    #waypointIndex = 1

    constructor({ path, speed, frames, radius, imgSrc, damage, spacing = 0, game } = {}) {
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
            damage
        })
        this.#path = path
        this.game = game
    }

    #atWaypoint(wp) {
        return Math.round(this.position.x) === Math.round(wp.x) && Math.round(this.position.y) === Math.round(wp.y)
    }

    #draw(c) {
        // Render Hitbox
        // c.fillStyle = "rgba(0,0,0,0.5)"
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // c.fill()
    }

    update(c) {
        this.#draw(c)
        this.target = this.#path[this.#waypointIndex]
        if (this.#atWaypoint(this.#path[this.#waypointIndex])) this.#waypointIndex++
        if (this.#waypointIndex === this.#path.length) this.spawned = false

        const DAMAGE = super.update(c)
        
        if (this.#path.length === this.#waypointIndex) this.game.updateLife(DAMAGE)
    }
}