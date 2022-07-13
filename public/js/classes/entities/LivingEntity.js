import Entity from "./Entity.js";

export default class LivingEntity extends Entity {
    #lives = 0
    #damage

    constructor({
        speed = 1,
        target,
        position,
        size,
        imgSrc,
        frames,
        radius,
        damage,
        lives,
        renderCenter
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter,
            radius
        })

        this.spawned = true
        this.speed = speed
        this.target = target
        
        this.#damage = damage
        this.#lives = lives
    }

    getVelocity(pos1) {
        const ANGLE = Math.atan2(pos1.y - this.position.y, pos1.x - this.position.x)
        return {
            x: Math.cos(ANGLE),
            y: Math.sin(ANGLE)
        }
    }

    updateVelocity(velocity, speed, target) {
        const X_VEL = (velocity.x * speed) + this.position.x
        const Y_VEL = (velocity.y * speed) + this.position.y

        if (velocity.x > 0) this.position.x = Math.min(X_VEL, target.x)
        else this.position.x = Math.max(X_VEL, target.x)

        if (velocity.y > 0) this.position.y = Math.min(Y_VEL, target.y)
        else this.position.y = Math.max(Y_VEL, target.y)
    }

    update(c) {
        const VELOCITY = this.getVelocity(this.target)
        this.updateVelocity(VELOCITY, this.speed, this.target)

        super.update(c)
        return this.#damage
    }

    damage(amount) {
        this.#lives -= amount
        if (this.#lives <= 0) {
            console.log("kill entity")
        }
    }
}