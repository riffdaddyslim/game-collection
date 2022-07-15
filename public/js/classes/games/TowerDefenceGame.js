import { delay, drawText } from "../../utils.js";
import BasicMob from "../entities/mobs/BasicMob.js";
import BuildingPlot from "../entities/poi/BuildingPlot.js";
import Game from "./Game.js";

export default class TowerDefenceGame extends Game {
    #waves = null
    #currentWave = 0
    #enemies = null
    #paths = null
    #maps = null
    
    constructor(canvas, { data }) {
        super(canvas, { user: data.user })
        this.#waves = data.waves
        this.#enemies = data.enemies
        this.#maps = data.maps

        this.lastWave = false
    }

    loadMap(mapIndex) {
        super.loadMap(this.#maps[mapIndex]).then(data => {
            this.#paths = data.paths
            for (let buildingPlot of data.buildingPlots) {
                this.poi.add(new BuildingPlot({...buildingPlot, game: this}))
            }
            this.createWave()
            this.animate()
        })
    }

    #getCurrentWave() {
        return this.#waves[this.mapKey][this.#currentWave]
    }

    #getPath(group) {
        const PATH_INDEX = group.path ?? Math.floor(Math.random() * this.#paths.length)
        return this.#paths[PATH_INDEX]
    }

    async nextWave() {
        if (this.#currentWave === this.#waves[this.mapKey].length - 1) return this.lastWave = true
        this.#currentWave++
        this.createWave()
    }

    async createWave() {
        const WAVE = this.#getCurrentWave()
        for (let groupIndex = 0; groupIndex < WAVE.groups.length; groupIndex++) {
            const GROUP = WAVE.groups[groupIndex]
            if (GROUP.delay) await delay(GROUP.delay)
            let currentSpacing = 0
            for (let qty = 1; qty <= GROUP.qty; qty++) {
                const MOB_STATS = this.#enemies[GROUP.type]
                this.entities.add(new BasicMob({
                    ...MOB_STATS,
                    path: this.#getPath(GROUP),
                    spacing: currentSpacing,
                    game: this
                }))
                
                if (GROUP.spacing) currentSpacing += GROUP.spacing
            }
        }

        if (WAVE.delay) await delay(WAVE.delay)
        this.nextWave()
    }

    renderUI() {
        const TEXT = `Round: ${this.#currentWave + 1} of ${this.#waves[this.mapKey].length}`
        this.context.font = "bold 20px Verdana"
        drawText(this.context, TEXT, 0, 0, { bgColor: "rgba(0,0,0,0.6)", color: "white" })
        super.renderUI()
    }

    animate() {
        //if (this.lastWave) console.log(this.entities)
        this.map.drawBackground(this.context)
        
        for (let poi of this.poi.values()) {
            poi.update(this.context, this.mouse)
        }
        
        Array.from(this.entities.values())
            .sort((a, b) => {
                return a.position.y - b.position.y
            })
            .forEach(entity => {
                entity.update(this.context, this.mouse)
            })


        this.map.drawDecorations(this.context)
        super.animate()
    }
}