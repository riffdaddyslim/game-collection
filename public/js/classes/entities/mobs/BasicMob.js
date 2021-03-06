import LivingEntity from "../LivingEntity.js";

export default class BasicMob extends LivingEntity {
    #path
    #waypointIndex = 1

    constructor({ path, speed, frames, radius, imgSrc, damage, spacing = 0, game, lives } = {}) {
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
            lives,
            game
        })
        this.#path = path
    }

    #draw(c) {
        // Render Hitbox
        // c.fillStyle = "rgba(0,0,0,0.5)"
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // c.fill()

        // Draw Health bar
        const X = this.position.x - this.size.width / 2
        const Y = this.position.y - this.size.height / 2 - 10

        c.fillStyle = "red"
        c.fillRect(X, Y, this.size.width, 5)
        c.fillStyle = "green"
        c.fillRect(X, Y, this.size.width * this.lives.current / this.lives.total, 5)
    }

    update(c) {
        if (this.lives.current <= 0) return this.kill()

        this.target = this.#path[this.#waypointIndex]

        if (this.#path.length === this.#waypointIndex) {
            this.game.updateLife(this.damage)
            this.game.entities.delete(this)
        } else {
            if (this.atTarget()) this.#waypointIndex++
            this.#draw(c)
            super.update(c)
        }
    }

    kill() {
        this.game.entities.delete(this)
        this.game.updateCash(this.lives.total * 2)
    }
}