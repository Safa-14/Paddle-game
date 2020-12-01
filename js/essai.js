// SELECT CANVAS ELEMENT
window.onload = () => {
    const cvs = document.getElementById("canvas");
    const ctx = cvs.getContext("2d");
    
    
    
    let leftArrow = false;
    let rightArrow = false;
    
    // GAME VARIABLES AND CONSTANTS
    const PADDLE_WIDTH = 100;
    const PADDLE_MARGIN_BOTTOM = 50;
    const PADDLE_HEIGHT = 20;
    
    const BALL_RADIUS = 5
    // CREATE THE PADDLE
    let paddle = {
        x : cvs.width/2 - PADDLE_WIDTH/2,
        y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
        width : PADDLE_WIDTH,
        height : PADDLE_HEIGHT,
        dx :5
    }


    // CONTROL THE PADDLE
document.addEventListener("keydown", function(event){
    if(event.keyCode == 37){
        leftArrow = true;
    }else if(event.keyCode == 39){
        rightArrow = true;
    }
 });
 document.addEventListener("keyup", function(event){
    if(event.keyCode == 37){
        leftArrow = false;
    }else if(event.keyCode == 39){
        rightArrow = false;
    }
 });


 // CREATE THE BALL
let ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}
loop(ctx,paddle,ball,rightArrow,leftArrow);
}


// DRAW PADDLE
function drawPaddle(ctx,paddle){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    //ctx.strokeStyle = "#ffcd05";
    //ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}



// MOVE PADDLE
function movePaddle(paddle,rightArrow,leftArrow){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;

    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}


// DRAW THE BALL
function drawBall(ctx,ball){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}

// MOVE THE BALL
function moveBall(ball){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//BALL AND WALL COLLISION DETECTION
// function ballWallCollision(){
//     if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
//         ball.dx = - ball.dx;
//         WALL_HIT.play();
//     }
    
//     if(ball.y - ball.radius < 0){
//         ball.dy = -ball.dy;
//         WALL_HIT.play();
//     }
    
//     if(ball.y + ball.radius > cvs.height){
//         LIFE--; // LOSE LIFE
//         LIFE_LOST.play();
//         resetBall();
//     }
// }
// DRAW FUNCTION
function draw(ctx,paddle,ball){
    drawPaddle(ctx,paddle)
    ctx.clearRect(0,0,800,500)
    drawBall(ctx,ball);
}

// UPDATE GAME FUNCTION
function update(paddle,ball,rightArrow,leftArrow){
    
    movePaddle(paddle,rightArrow,leftArrow);
    moveBall(ball);
    ballWallCollision();
}


// GAME LOOP
function loop(ctx,paddle,ball,rightArrow,leftArrow){
    // CLEAR THE CANVAS
    
    draw(ctx,paddle,ball);
    
    //update(paddle,ball,rightArrow,leftArrow);
    
   
        requestAnimationFrame(loop);
    
}
