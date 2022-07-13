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

export function delay(amount) { return new Promise(resolve => setTimeout(resolve, amount)) }