export function draw3dText(context, text, depth, {
    x = 0, y = 0, shadowColor = "black", textColor = "white", borderColor = null 
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

export function drawText(context, text, x, y, { color = "black", bgColor = null, padding = 10, position = "left" } = {}) {
    const { width, actualBoundingBoxAscent } = context.measureText(text)

    switch (position) {
        case "right": x -= width + padding * 2
        default: x = x
    }

    if (bgColor) {
        context.fillStyle = bgColor
        context.fillRect(x, y, width + padding * 2, actualBoundingBoxAscent + padding * 2)
    }

    context.fillStyle = color
    context.fillText(text, x + padding, y + padding + actualBoundingBoxAscent - 1)

    return { x, y }
}

export function delay(amount) { return new Promise(resolve => setTimeout(resolve, amount)) }

export function isCollisionCircle(cir1, cir2) {
    const X_DIS = cir1.x - cir2.x
    const Y_DIS = cir1.y - cir2.y
    const DISTANCE = Math.hypot(X_DIS, Y_DIS)
    return DISTANCE < cir1.radius + cir2.radius
}

export function isCollisionPointCircle(point, cir2) {
    const X_DIS = point.x - cir2.x
    const Y_DIS = point.y - cir2.y
    const DISTANCE = Math.hypot(X_DIS, Y_DIS)
    return DISTANCE < 1 + cir2.radius
}

export function isCollisionPointRect(point, rect) {
    return (point.x > rect.x &&
        point.x < rect.x + rect.width &&
        point.y > rect.y &&
        point.y < rect.y + rect.height)
}