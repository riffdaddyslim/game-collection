export default class Sprite {
    #renderCenter

    constructor({
        position = { x: 0, y: 0 },
        size = {
            width: null,
            height: null
        },
        imgSrc = "",
        frames = { max: 1, duration: 1 },
        renderCenter = 1
    } = {}) {
        this.position = position
        this.size = size
        this.#renderCenter = renderCenter

        this.image = new Image()
        
        if (size.width === null) size.width = this.frames.width
        if (size.height === null) size.height = this.image.height

        this.setSprite(imgSrc, frames)
    }

    setSprite(imgSrc, frames = {max: 1, duration: 1}) {
        this.image.src = imgSrc
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            duration: frames.duration
        }

        this.image.onload = () => { this.frames.width = this.image.width / this.frames.max }
    }

    draw(c) {
        c.drawImage(
            this.image,
            this.frames.width * this.frames.current,
            0,
            this.frames.width,
            this.image.height,
            this.position.x - this.size.width / 2 * this.#renderCenter,
            this.position.y - this.size.height / 2 * this.#renderCenter,
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
        this.draw(c)
    }
}