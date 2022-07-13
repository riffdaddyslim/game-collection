export default class Sprite {
    static RENDER_POSTIONS = {
        center(sprite) {
            return {
                x: sprite.position.x - sprite.size.width / 2,
                y: sprite.position.y - sprite.size.height / 2
            }
        },
        top(sprite, offset) {
            return {
                x: sprite.position.x - sprite.size.width / 2,
                y: sprite.position.y - sprite.size.height + offset
            }
        },
        topLeft(sprite, offset) {
            return {
                x: sprite.position.x,
                y: sprite.position.y - sprite.size.height + offset
            }
        },
        bottom(sprite, offset) {
            return {
                x: sprite.position.x - sprite.size.width / 2,
                y: sprite.position.y + sprite.size.height - offset
            }
        } 
    }

    constructor({
        position = { x: 0, y: 0 },
        size = {
            width: null,
            height: null
        },
        imgSrc = "",
        frames = { max: 1, duration: 1 },
        renderPosition = Sprite.RENDER_POSTIONS.center,
        offset = 0
    } = {}) {
        this.position = position

        this.size = size

        this.image = new Image()
        this.image.src = imgSrc
        
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            duration: frames.duration
        }

        if (size.width === null) size.width = this.frames.width
        if (size.height === null) size.height = this.image.height

        this.renderPosition = renderPosition
        this.offset = offset

        this.image.onload = () => { this.frames.width = this.image.width / this.frames.max }
    }

    #draw(c) {
        const RENDER_POS = this.renderPosition(this, this.offset)

        c.drawImage(
            this.image,
            this.frames.width * this.frames.current,
            0,
            this.frames.width,
            this.image.height,
            RENDER_POS.x,
            RENDER_POS.y,
            this.size.width,
            this.size.height
        )
    }

    update(c) {
        this.frames.elapsed++
        if (this.frames.elapsed % this.frames.duration === 0) {
            this.frames.current++
            if (this.frames.current >= this.frames.max) this.frames.current = 0
        }
        this.#draw(c)
    }
}