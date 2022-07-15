import { isCollisionCircle } from "../../utils.js";
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
        if (isCollisionCircle(this.target.getCircleHitbox(), this.getCircleHitbox())) this.hitTarget()
        super.update(c)
    }

    hitTarget() {
        this.#tower.projectiles.delete(this)
        this.target.updateLives(this.damage)
        if (this.target.lives.current <= 0) this.#tower.target = null
    }
}