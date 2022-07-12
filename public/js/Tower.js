import Entity from "./Entity.js";
import Sprite from "./Sprite.js";

export default class Tower extends Entity {
    constructor({
        position,
        size,
        imgSrc,
        frames,
        renderPosition = Sprite.RENDER_POSTIONS.topLeft
    } = {}) {
        super({
            position,
            size,
            imgSrc: "/images/tower.png",
            frames: {
                max: 19,
                duration: 6
            },
            renderPosition,
            offset: 64
        })
    }
}