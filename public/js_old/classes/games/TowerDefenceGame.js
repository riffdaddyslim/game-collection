import TileGameMap from "../maps/GameMap.js";

export default class TowerDefenceGame extends TiledGameMap {
    constructor() {
        
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

}