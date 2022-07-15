import LivingEntity from "./LivingEntity.js";

export default class Projectile extends LivingEntity {
    #tower

    constructor({
        speed,
        target,
        position,
        imgSrc,
        frames,
        radius,
        damage,
        game,
        tower
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
            game
        })

        this.#tower = tower
    }

    update(c) {
        if (this.isCollisionCircle(this.target)) this.#tower.hitTarget(this)
        super.update(c)
    }
}