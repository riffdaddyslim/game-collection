import GameMap from "../maps/GameMap.js"

export default class TowerDefenceGame {
    #c = null
    #map = null
    #running = true
    #mouse = {
        position: {
            x: null,
            y: null
        },
        clicking: false
    }

    constructor(canvas) {
        this.#c = canvas.getContext("2d")
        canvas.width = 1280
        canvas.height = 768

        canvas.addEventListener("mousemove", e => {
            this.#mouse.position.x = e.offsetX
            this.#mouse.position.y = e.offsetY
        })

        canvas.addEventListener("mousedown", e => {
            this.#mouse.clicking = true
        })
        canvas.addEventListener("mouseup", e => {
            this.#mouse.clicking = false
        })
    }

    loadMap(key) {
        this.#map = new GameMap(key)
        this.#map.load().then(() => {
            this.#animate()
        })
    }

    #animate() {
        this.#map.animate(this.#c, this.#mouse)
        
        requestAnimationFrame(() => {
            if (this.#running) this.#animate()
        })
    }
}