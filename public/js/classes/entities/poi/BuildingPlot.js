import Tower from "../buildings/Tower.js"
import Entity from "../Entity.js"

export default class BuildingPlot extends Entity {
    constructor({ x, y, width, height, game } = {}) {
        super({
            position: { x, y },
            size: { 
                width, height
            },
            game
        })
        this.hovered = false
        this.tower = false


        this.tower_stats = {
            height: 144,
            imgSrc: "/images/tower.png",
            frames: {
                max: 19,
                duration: 3
            },
            radius: 250,
            projectile: {
                offset: {
                    x: 64,
                    y: 0,
                },
                frame: 5
            } 
        }
    }

    #draw(c) {
        if (this.tower) {
            super.update(c)
        } else {
            c.fillStyle = "rgba(255,255,255,0.3)"
            if (this.hovered) c.fillStyle = "rgba(255,255,255,0.6)"
            c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
        }
    }

    #addTower() {
        this.game.entities.add(
            new Tower({
                position: {
                    x: this.position.x,
                    y: this.position.y - this.tower_stats.height + this.size.height
                },
                size: {
                    width: this.size.width,
                    height: this.tower_stats.height
                },
                imgSrc: this.tower_stats.imgSrc,
                frames: this.tower_stats.frames,
                radius: this.tower_stats.radius,
                projectile: this.tower_stats.projectile,
                game: this.game
            })
        )
    }

    update(c, mouse) {
        if (this.tower) return
        else if (this.isCollisionSquare(mouse)) {
            if (mouse.clicking) {
                let canAfford = this.game.updateCash(-25)
                if (canAfford) {
                    this.tower = true
                    this.#addTower()
                }
            }
            else this.hovered = true
        }
        else this.hovered = false
        
        this.#draw(c)
    }
}