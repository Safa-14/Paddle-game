
    //SELECT CANVAS elements
    let canvas = document.querySelector('#canvas')
    let context = canvas.getContext('2d')

    /////////////////////////
    //CREATE THE PADDLE
    //////////////////////////
    //First write the constant values like the width and height of the paddle
    const paddleWidth = 100
    const paddleHeight = 30
    const marginBottom = 30
    let rightMove = false
    let leftMove = false


    //Second set the properties of the paddle
    let paddle = {
        x: canvas.width / 2 - paddleWidth / 2,
        y: canvas.height - paddleHeight - marginBottom,
        width: paddleWidth,
        height: paddleHeight,
        step: 5
    }

    drawPaddle(context, paddle)
    //movePaddle(paddle)
    //CONTROL THE PADDLE
    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 37) {
            leftMove = true
        } else if (e.keyCode == 39) {
            rightMove = true
        } 
    })

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 37) {
            leftMove = false
        } else if (e.keyCode == 39) {
            rightMove = false
        } 
    })

    loop(context, paddle)





//DRAW PADDLE
function drawPaddle(context, paddle) {
    //create html image
    let img = document.createElement('img')
    //set src to the image
    img.src = './imgs/grass.png'

    //create onload events for img to add it inside convas after loading
    img.addEventListener('load', function () {
        context.drawImage(img,paddle.x, paddle.y, paddle.width, paddle.height)


    })
}

//DRAW FUNCTION
function draw(context, paddle) {
    drawPaddle(context, paddle)
}


//MOVE PADDLE
function movePaddle(paddle) {
    if (rightMove) {
        paddle.x += paddle.step
    } else if (leftMove) {
        paddle.x -= paddle.step
    } 
}

//update game function
function update(paddle) {
    movePaddle(paddle)
}

//game loop
function loop(context, paddle) {
    draw(context, paddle)
    update(paddle)
    requestAnimationFrame(loop)
}