import LivingEntity from "./LivingEntity.js";

export default class Projectile extends LivingEntity {
    constructor({
        speed,
        target,
        position,
        imgSrc,
        frames,
        radius,
        damage,
        lives,
        renderCenter,
        game
    }) {
        super({
            speed,
            target,
            position,
            size: {
                width: radius * 2,
                height: radius * 2
            },
            imgSrc,
            frames,
            radius,
            damage,
            lives,
            renderCenter,
            game
        })
    }

    update(c) {
        if (this.isCollisionCircle(this.target)) {
            this.spawned = false
            this.target.updateLives(this.damage)
        }
        super.update(c)
    }
}