/**
 * @typedef Circle Object containing an x, y, and radius. Where x, y are the center coords
 */

/**
 * @typedef Point Object containing an x and y coordinate
 */

/**
 * @typedef Rectangle Object containing an x and y coordinate
 */

/**
 * Writes 3D text to a canvas element
 * @param {CanvasContext} context Context that the text gets written
 * @param {String} text String to write
 * @param {Number} depth Depth of the 3D shadows
 * @param {Number} x x position
 * @param {Number} y y position
 * @param {String} [shadowColor=black] color of the depth layers
 * @param {String} [textColor=white] color of the text
 * @param {String} [borderColor=null] color of the border
 */
export function draw3dText(context, text, depth, x, y, {
    shadowColor = "black", textColor = "white", borderColor = null 
} = {}) {
    context.fillStyle = shadowColor
    for (let i = 0; i < depth; i++) {
        x -= 1
        y -= 1
        context.fillText(text, x, y)
    }

    x -= 1
    y -= 1
    context.fillStyle = textColor
    context.fillText("GAME OVER", x, y)
    if (borderColor) {
        context.fillStyle = borderColor
        context.strokeText("GAME OVER", x, y)
    }
}

/**
 * Writes text to a canvas element with additional options
 * @param {CanvasContext} context Canvas content where the text is to be written
 * @param {STring} text Text to write
 * @param {Number} x x position
 * @param {Number} y y position
 * @param {String} [color=black] color of the text
 * @param {String} [bgColor=null] background color for the text
 * @param {Number} [padding=10] padding to put around the text
 * @param {String} [position=left] position to render from - left or right
 * @returns 
 */
export function drawText(context, text, x, y, { color = "black", bgColor = null, padding = 10, position = "left" } = {}) {
    const { width, actualBoundingBoxAscent } = context.measureText(text)

    switch (position) {
        case "right": x -= width + padding * 2
        default: 
            x = x
            y = y
    }

    if (bgColor) {
        context.fillStyle = bgColor
        context.fillRect(x, y, width + padding * 2, actualBoundingBoxAscent + padding * 2)
    }

    context.fillStyle = color
    context.fillText(text, x + padding, y + padding + actualBoundingBoxAscent - 1)

    return { x, y }
}

/**
 * Function that adds a delay into for loops
 * @param {Number} amount Amount of time to wait in milliseconds
 * @returns Returns when the given amount of time has passed
 */
export function delay(amount) { return new Promise(resolve => setTimeout(resolve, amount)) }

/**
 * Function used to determine if two circles are touching
 * @param {Circle} cir1 
 * @param {Circle} cir2 
 * @returns {Boolean} If the two circles are touching 
 */
export function isCollisionCircle(cir1, cir2) {
    const X_DIS = cir1.x - cir2.x
    const Y_DIS = cir1.y - cir2.y
    const DISTANCE = Math.hypot(X_DIS, Y_DIS)
    return DISTANCE < cir1.radius + cir2.radius
}

/**
 * Function used to determine if a point is in a given circle
 * @param {Point} point 
 * @param {Circle} cir2 
 * @returns {Boolean} If the point is within the given circle
 */
export function isCollisionPointCircle(point, cir2) {
    const X_DIS = point.x - cir2.x
    const Y_DIS = point.y - cir2.y
    const DISTANCE = Math.hypot(X_DIS, Y_DIS)
    return DISTANCE < 1 + cir2.radius
}

/**
 * Function used to determine if a point is within a given rectangle
 * @param {Point} point 
 * @param {Rectangle} rect 
 * @returns {Boolean} If the point is within the given rectangle
 */
export function isCollisionPointRect(point, rect) {
    return (point.x > rect.x &&
        point.x < rect.x + rect.width &&
        point.y > rect.y &&
        point.y < rect.y + rect.height)
}