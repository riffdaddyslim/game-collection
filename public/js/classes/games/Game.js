import { draw3dText, drawText } from "../../utils.js"
import TileMap from "../maps/TileMap.js"

export default class Game {
    #animation = null
    #canvas = null
    #running = true
    #user = null
    #score = 0

    constructor(canvas, {
        user = null
    } = {}) {
        this.#canvas = canvas
        this.context = canvas.getContext("2d")

        canvas.addEventListener("mousemove", e => {
            this.mouse.x = e.offsetX
            this.mouse.y = e.offsetY
        })

        canvas.addEventListener("mousedown", e => {
            this.mouse.clicking = true
            this.mouse.target = {
                x: e.offsetX,
                y: e.offsetY
            }
        })
        canvas.addEventListener("mouseup", e => {
            this.mouse.clicking = false
        })

        this.#user = user
        this.entities = []
        this.currentFrame = 0
        this.mouse = {
            x: null,
            y: null,
            clicking: false,
            target: {
                x: null,
                y: null
            }
        }
    }

    async loadMap(mapId) {
        this.mapKey = mapId
        this.map = new TileMap(mapId)
        return await this.map.load()
    }

    renderUI() {
        this.context.font = "bold 20px Verdana"
        drawText(this.context, `$${this.#user.cash}  |  ${this.#user.lives} Lives`, this.#canvas.width, 0, { bgColor: "rgba(0,0,0,0.6)", color: "white", position: "right" })
    }

    animate() {
        if (this.#user.lives <= 0) return this.end()
        this.currentFrame++

        this.renderUI()
        if (!this.#running) cancelAnimationFrame(this.#animation)
        else this.#animation = requestAnimationFrame(() => { this.animate() })
    }

    #gameOver() {
        this.context.fillStyle = "rgba(0,0,0,0.4)"
        this.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)

        this.context.font = "bold 48px Verdana"
        this.context.textAlign = "center"

        draw3dText(this.context, "GAME OVER", 4, {
            x: this.#canvas.width / 2,
            y: this.#canvas.height / 2 - 25,
            borderColor: "black"
        })

        this.context.fillStyle = "white"
        this.context.font = "bold 20px Verdana"
        this.context.fillText(`Score: ${this.#score}`, this.#canvas.width / 2, this.#canvas.height / 2 + 25)
    }

    nextRound() { this.round++ }

    end() {
        this.#running = false
        this.#gameOver()
    }

    updateLife(amount) {
        this.#user.lives -= amount
        if (this.#user.lives <= 0) this.end()
    }

    updateCash(cost) {
        if (this.#user.cash < cost) return false
        this.#user.cash -= cost
        return true
    }
}