import Enemy from "./Enemy.js"
import TowerPlot from "./TowerPlot.js"

export default class GameMap {
    static LAYER_LOCATIONS = {
        background: ["background", "path"],
        decorations: ["decoration_1", "decoration_2", "decoration_3"]
    }

    #layers
    #tileset = new Image()
    #width
    #height
    #columns
    #paths
    #waves = {
        current: 0
    }

    #entities = []

    constructor(key) {
        this.key = key
    }

    load() {
        return new Promise((resolve, reject) => {
            fetch(`/map?q=${this.key}`)
            .then(res => {
                if (!res.ok) console.error(res.statusText)
                return res.json()
            }).then(data => {
                this.#layers = data.layers
                this.#columns = data.columns
                this.#height = data.height
                this.#width = data.width
                this.#paths = data.paths

                for (let i = 0; i < data.towerPlots.length; i++) {
                    this.#entities.push(new TowerPlot(data.towerPlots[i]))
                }
                this.#waves.enemies = data.enemies
                this.createWave()

                this.#tileset.src = data.src
                this.#tileset.onload = () => { resolve() }
            })
        })
    }

    #getTileCoords(tileIndex) {
        let y = Math.floor(tileIndex / this.#columns)
        let x = tileIndex > this.#columns ? tileIndex % this.#columns - 1 : tileIndex - 1
        return [x * this.#width, y * this.#height]
    }

    #delay(amount) { return new Promise(resolve => setTimeout(resolve, amount)) }

    nextWave() {
        this.#waves.current++
        const WAVE = this.#waves.enemies[this.#waves.current]
        if (WAVE) setTimeout(() => { this.createWave() }, WAVE.delay ?? 0);
    }

    async createWave() {
        const WAVE = this.#waves.enemies[this.#waves.current]
        for (let groupIndex = 0; groupIndex < WAVE.groups.length; groupIndex++) {
            const GROUP = WAVE.groups[groupIndex]
            if (GROUP.delay) await this.#delay(GROUP.delay)
            let currentSpacing = 0
            for (let count = 1; count <= GROUP.qty; count++) {
                const PATH_INDEX = GROUP.path ?? Math.floor(Math.random() * this.#paths.length)
                const ENEMY = new Enemy({
                    path: this.#paths[PATH_INDEX],
                    speed: GROUP.type.speed,
                    imgSrc: GROUP.type.imgSrc,
                    radius: GROUP.type.radius,
                    frames: GROUP.type.frames,
                    spacing: currentSpacing
                })
                this.#entities.push(ENEMY)
                
                if (GROUP.spacing) currentSpacing += GROUP.spacing
            }
        }

        this.nextWave()
    }

    #draw(c, layerId) {
        this.#layers.filter(layer => {
            return GameMap.LAYER_LOCATIONS[layerId].includes(layer.name)
        }).forEach(layer => {
            layer.tiles.forEach((row, rowIndex) => {
                row.forEach((tileIndex, columnIndex) => {
                    if (tileIndex === 0) return
                    const [ sx, sy ] = this.#getTileCoords(tileIndex)
                    c.drawImage(this.#tileset, sx, sy, this.#width, this.#height, columnIndex * this.#width, rowIndex * this.#height, this.#width, this.#height)
                })
            })            
        })
    }

    animate(c, mouse) {
        this.#draw(c, "background")
        
        this.#entities
            .filter(entity => entity.spawned || entity instanceof TowerPlot)
            .sort((a, b) => {
                return a.position.y - b.position.y
            })
            .forEach(entity => {
                entity.update(c, mouse)
            })

        this.#draw(c, "decorations")
    }
}