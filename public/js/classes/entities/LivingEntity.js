import Entity from "./Entity.js";

export default class LivingEntity extends Entity {
    constructor({
        speed = 1,
        target,
        position,
        size,
        imgSrc,
        frames,
        renderPosition,
        radius,
        damage
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderPosition
        })

        this.living = true
        this.spawned = true
        this.speed = speed
        this.target = target
        this.radius = radius
        this.damage = damage
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
    }
}