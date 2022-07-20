const express = require("express")
const fs = require("fs")
const APP = express()

APP.use("/", express.static("./public"))

/**
 * @typedef TileLayer Array of tile numbers for the tileset
 */

/**
 * 
 * @param {TileLayer} layer 
 * @returns {Array[]} 2d array of the layer to make calculating the tile location easier
 */
function make2dArray(layer) {
    let arr_2d = []
    for (let i = 0; i < layer.data.length; i += layer.width) {
        arr_2d.push(layer.data.slice(i, i + layer.width))
    }
    return arr_2d
}

APP.get("/map", async (req, res) => {
    const MAP_DATA = JSON.parse(fs.readFileSync(`./maps/${req.query.q}.json`).toString())
    
    const data = {
        src: MAP_DATA.tilesets[0].image.replace("../public", ""),
        width: MAP_DATA.tilesets[0].tilewidth,
        height: MAP_DATA.tilesets[0].tileheight,
        columns: MAP_DATA.tilesets[0].columns,
        layers: [],
        paths: [],
        buildingPlots: []
    }

    MAP_DATA.layers.forEach(layer => {
        if (layer.type === "tilelayer") return data.layers.push({ tiles: make2dArray(layer), name: layer.name })
        if (layer.type === "objectgroup" && layer.name === "path") {
            layer.objects.forEach(path => {
                data.paths.push(path.polyline.map(point => {
                    return {
                        x: point.x + path.x,
                        y: point.y + path.y
                    }
                }))
            })
        }
        if (layer.type === "objectgroup" && layer.name === "building_plots") {
            layer.objects.forEach(tower => {
                data.buildingPlots.push({ x: tower.x, y: tower.y, width: tower.width, height: tower.height })
            })
        }
    })

    res.json(data)
})

APP.listen("8000")
console.log(`App launched at http://localhost:8000`)