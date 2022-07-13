import { delay } from "../../utils.js";
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
    }

    loadMap(mapIndex) {
        super.loadMap(this.#maps[mapIndex]).then(data => {
            this.#paths = data.paths
            for (let buildingPlot of data.buildingPlots) {
                this.entities.push(new BuildingPlot({...buildingPlot, game: this}))
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
        if (this.#currentWave === this.#waves[this.mapKey].length - 1) return
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
                this.entities.push(new BasicMob({
                    path: this.#getPath(GROUP),
                    speed: MOB_STATS.speed,
                    frames: MOB_STATS.frames,
                    radius: MOB_STATS.radius,
                    imgSrc: MOB_STATS.imgSrc,
                    damage: MOB_STATS.damage,
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

        this.context.fillStyle = "rgba(0,0,0,0.6)"
        this.context.fillRect(0, 0, this.context.measureText(TEXT).width + 25, 40)
        
        this.context.fillStyle = "white"
        this.context.font = "bold 20px Verdana"
        this.context.fillText(TEXT, 10, 25)

        super.renderUI()
    }

    animate() {
        this.map.drawBackground(this.context)
        
        this.entities
            .filter(entity => entity.spawned || entity instanceof BuildingPlot)
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