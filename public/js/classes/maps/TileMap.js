export default class TileMap {
    static LAYER_LOCATIONS = {
        background: ["background", "background_decoration_1", "background_decoration_2", "path"],
        decorations: ["decoration_1", "decoration_2", "decoration_3"]
    }

    #layers
    #tileset = new Image()
    #width
    #height
    #columns
    
    constructor(mapKey) {
        this.key = mapKey
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
                this.#tileset.src = data.src

                this.#tileset.onload = () => { resolve({
                    paths: data.paths,
                    buildingPlots: data.buildingPlots
                }) }
            })
        })
    }

    #getTileCoords(tileIndex) {
        let y = Math.floor(tileIndex / this.#columns)
        let x = 0

        if (tileIndex % this.#columns === 0) {
            x = this.#columns - 1
            y -= 1
        }
        else if (tileIndex > this.#columns) x = tileIndex % this.#columns - 1
        else x = tileIndex - 1
        
        return [x * this.#width, y * this.#height]
    }

    
    #draw(c, layerId) {
        this.#layers.filter(layer => {
            return TileMap.LAYER_LOCATIONS[layerId].includes(layer.name)
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