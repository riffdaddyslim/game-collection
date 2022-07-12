const express = require("express")
const fs = require("fs")
const APP = express()

APP.use("/", express.static("./public"))

function make2dArray(layer) {
    let arr_2d = []
    for (let i = 0; i < layer.data.length; i += layer.width) {
        arr_2d.push(layer.data.slice(i, i + layer.width))
    }
    return arr_2d
}

const ENEMIES = {
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

APP.get("/map", async (req, res) => {
    const MAP_DATA = JSON.parse(fs.readFileSync(`./maps/${req.query.q}.json`).toString())
    
    const data = {
        src: MAP_DATA.tilesets[0].image.replace("../public", ""),
        width: MAP_DATA.tilesets[0].tilewidth,
        height: MAP_DATA.tilesets[0].tileheight,
        columns: MAP_DATA.tilesets[0].columns,
        layers: [],
        paths: [],
        towerPlots: [],
        enemies: [
            {
                groups: [
                    { qty: 5, type: ENEMIES.orc, spacing: 64 }
                ]
            },
            {
                groups: [
                    { qty: 15, type: ENEMIES.orc, spacing: 64 }
                ],
                delay: 10000
            },
            {
                groups: [
                    { qty: 1, type: ENEMIES.orcKing, path: 0 }
                ],
                delay: 15000
            },
            {
                groups: [
                    { qty: 1, type: ENEMIES.orcKing, path: 0 },
                    { delay: 2500, qty: 15, type: ENEMIES.orc, spacing: 64 }
                ],
                delay: 30000
            },
            {
                groups: [
                    { qty: 15, type: ENEMIES.orc, spacing: 64 },
                    { qty: 1, type: ENEMIES.orcKing, path: 0 },
                    { delay: 15000, qty: 15, type: ENEMIES.orc, spacing: 64 },
                    { qty: 3, type: ENEMIES.orcKing, path: 0, spacing: 100 }
                ],
                delay: 60000
            },
        ]
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
        if (layer.type === "objectgroup" && layer.name === "tower_plots") {
            layer.objects.forEach(tower => {
                data.towerPlots.push({ x: tower.x, y: tower.y, width: tower.width, height: tower.height })
            })
        }
    })

    res.json(data)
})

APP.listen("8000")
console.log(`App launched at http://localhost:8000`)