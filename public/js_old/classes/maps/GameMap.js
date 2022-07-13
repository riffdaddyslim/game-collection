import Enemy from "../entities/mobs/Enemy.js"
import TowerPlot from "../../TowerPlot.js.js"

export default class TileGameMap {
    static LAYER_LOCATIONS = {
        background: ["background", "background_decoration", "path"],
        decorations: ["decoration_1", "decoration_2", "decoration_3"]
    }

    #layers
    #tileset = new Image()
    #width
    #height
    #columns
    #paths

    #entities = []

    constructor(mapKey) {
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

    drawBackground(c) { this.#draw(c, "background") }
    drawDecorations(c) { this.#draw(c, "decorations") }
}