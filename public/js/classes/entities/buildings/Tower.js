import { isCollisionCircle, isCollisionPointCircle, isCollisionPointRect } from "../../../utils.js";
import Entity from "../Entity.js";
import BasicMob from "../mobs/BasicMob.js";
import Projectile from "../Projectile.js";

export default class Tower extends Entity {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        radius,
        game,
        projectile
    } = {}) {
        super({
            position,
            size,
            imgSrc,
            frames,
            renderCenter: 0,
            radius,
            game
        })

        this.projectiles = new Set()
        this.projectile = projectile
        this.target = null
        this.lastFrame = 0
    }

    #draw(c, mouse) {
        const CENTER = this.getCenter()
        
        if (isCollisionPointRect(mouse.target, this.getRectHitbox())) {
            c.fillStyle = "rgba(0,0,0,0.3)"
            c.beginPath()
            c.arc(CENTER.x, CENTER.y, this.radius, 0, Math.PI * 2)
            c.fill()
        }

        super.draw(c, mouse)
    }

    #getFirstMob() {
        for (let entity of this.game.entities.values()) {
            if (!(entity instanceof BasicMob)) continue
            if (isCollisionCircle(entity.getCircleHitbox(), this.getCircleHitbox())) return entity
        }

        return null

    }

    update(c, mouse) {
        if (this.target && !isCollisionCircle(this.target.getCircleHitbox(), this.getCircleHitbox())) this.target = null
        if (!this.target) this.target = this.#getFirstMob()
        
        if (this.lastFrame != this.frames.current) {
            this.lastFrame = this.frames.current
            if (this.target && this.frames.current === this.projectile.frame) this.#fireProjectile()
        }
        if (this.target || !this.target && this.frames.current != 0) super.update(c)

        this.#draw(c, mouse)

        for (let projectile of this.projectiles.values()) {
            projectile.update(c)
        }
    }

    #fireProjectile() {
        this.projectiles.add(new Projectile({
            imgSrc: "/images/projectile.png",
            target: this.target,
            position: {
                x: this.position.x + this.projectile.offset.x,
                y: this.position.y + this.projectile.offset.y
            },
            damage: -1,
            radius: 15,
            speed: 3,
            game: this.game,
            tower: this
        }))
    }
}