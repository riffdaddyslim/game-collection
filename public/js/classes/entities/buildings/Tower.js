import Entity from "../Entity.js";
import Projectile from "../Projectile.js";

export default class Tower extends Entity {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        radius,
        renderCenter,
        game,
        projectile
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

        this.projectiles = []
        this.projectile = projectile
    }

    #draw(c, mouse) {
        const CENTER = this.getCenter()
        
        if (this.isCollisionSquare(mouse.target)) {
            c.fillStyle = "rgba(0,0,0,0.5)"
            c.beginPath()
            c.arc(CENTER.x, CENTER.y, this.radius, 0, Math.PI * 2)
            c.fill()
        }

        super.draw(c, mouse)
    }

    update(c, mouse) {
        const TARGET = this.game.spawnedEntities.find(entity => this.isCollisionCircle(entity))
        
        if (TARGET && this.frames.current === this.projectile.frame) this.projectiles.push(new Projectile({
            imgSrc: "/images/projectile.png",
            target: TARGET,
            position: {...this.projectile.position},
            damage: -1,
            radius: 15,
            speed: 3,
            game: this.game
        }))

        if (TARGET || !TARGET && this.frames.current != 0) super.update(c)

        this.#draw(c, mouse)
        this.projectiles.filter(projectile => projectile.spawned).forEach(projectile => {
            projectile.update(c)
        })
    }
}