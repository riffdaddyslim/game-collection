import Entity from "./Entity.js";

export default class LivingEntity extends Entity {
    constructor({
        speed = 1,
        target,
        position,
        size,
        imgSrc,
        frames,
        radius,
        damage,
        lives = null,
        renderCenter,
        game
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter,
            radius,
            game
        })

        this.spawned = true
        this.speed = speed
        this.target = target
        
        this.damage = damage
        this.lives = {
            current: lives,
            total: lives
        }
    }

    getTarget() {
        return {
            x: this.target.x ?? this.target.position.x,
            y: this.target.y ?? this.target.position.y
        }
    }

    getVelocity(pos1) {
        const ANGLE = Math.atan2(pos1.y - this.position.y, pos1.x - this.position.x)
        return {
            x: Math.cos(ANGLE),
            y: Math.sin(ANGLE)
        }
    }

    updateVelocity(velocity, speed) {
        const X_VEL = (velocity.x * speed) + this.position.x
        const Y_VEL = (velocity.y * speed) + this.position.y

        if (velocity.x > 0) this.position.x = Math.min(X_VEL, this.getTarget().x)
        else this.position.x = Math.max(X_VEL, this.getTarget().x)

        if (velocity.y > 0) this.position.y = Math.min(Y_VEL, this.getTarget().y)
        else this.position.y = Math.max(Y_VEL, this.getTarget().y)
    }

    update(c) {
        const VELOCITY = this.getVelocity(this.getTarget())
        this.updateVelocity(VELOCITY, this.speed)
        super.update(c)
    }

    atTarget() {
        return Math.round(this.position.x) === Math.round(this.getTarget().x) && Math.round(this.position.y) === Math.round(this.getTarget().y)
    }

    updateLives(amount) {
        this.lives.current += amount
        if (this.lives.current <= 0) {
            this.spawned = false
            this.kill()
        }
        if (this.lives.current > this.lives.total) this.lives.current = this.lives.total
    }
}