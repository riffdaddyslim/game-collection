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

    update(c, mouse) {
        if (this.tower) this.tower.update(c, mouse)
        else if (this.isCollisionSquare(mouse)) {
            if (mouse.clicking) {
                let canAfford = this.game.updateCash(-25)
                if (canAfford) this.tower = new Tower({
                    position: {
                        x: this.position.x,
                        y: this.position.y - 144 + this.size.height
                    },
                    size: {
                        width: this.size.width,
                        height: 144
                    },
                    imgSrc: "/images/tower.png",
                    frames: {
                        max: 19,
                        duration: 3
                    },
                    radius: 250,
                    renderCenter: 0,
                    projectile: {
                        position: {
                            x: this.position.x + this.size.width / 2,
                            y: this.position.y - 144 / 2
                        },
                        frame: 6
                    },
                    game: this.game
                })
            }
            else this.hovered = true
        }
        else this.hovered = false
        
        this.#draw(c)
    }
}