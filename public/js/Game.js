import GameMap from "./Map.js"

export default class TowerDefenceGame {
    static ENEMIES = {
        orcKing: {
            imgSrc: "/images/orc.png",
            radius: 50,
            frames: {
                max: 7,
                duration: 10
            },
            speed: 0.3
        },
        orc: {
            imgSrc: "/images/orc.png",
            radius: 25,
            frames: {
                max: 7,
                duration: 6
            },
            speed: 1
        }
    }

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