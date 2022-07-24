const grid = document.querySelector('.grid')
const score = document.querySelector('#score')
const height = 20
const width = 100
let timerId

const userStart = [230,10]
let currPos = userStart

const ballStart = [270,40]
let ballPos = ballStart

// create Block
class Block {
    constructor(x,y) {
        this.bottomLeft = [x,y]
        this.bottomRight = [x+width,y]
        this.topLeft = [x,y+height]
        this.topRight = [x+width,y+height]
    }
}

// array of Blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

// function to draw all blocks
function addBlocks() {
    for (let i=0;i<blocks.length;i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
    }
}
addBlocks()

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// reassign the user
function drawUser() {
    user.style.left = currPos[0]+'px'
    user.style.bottom = currPos[1]+'px'
}

//function to move user left and right only
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currPos[0]>0) {
                currPos[0] -= 15
                 drawUser()
            }
            break;
        case 'ArrowRight':
            if (currPos[0]<460) {
                currPos[0] += 15
                drawUser()
            }
            break;    
    }
}
document.addEventListener('keydown', moveUser)

// add ball
const ball =  document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// reassign the ball
function drawBall() {
    ball.style.left = ballPos[0] + 'px'
    ball.style.bottom = ballPos[1] + 'px'
}

let xdir = -2
let ydir = 2

// move the ball
function moveBall() {
    ballPos[0] += xdir
    ballPos[1] += ydir
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 18)

let points = 0
// check for ball collision with wall
function checkForCollisions() {

    // check for blocks collisions
    for(let i=0;i<blocks.length;i++) {
        if((ballPos[0] > blocks[i].bottomLeft[0] && ballPos[0] < blocks[i].bottomRight[0]) &&
           ((ballPos[1]+20) > blocks[i].bottomLeft[1] && ballPos[1] < blocks[i].topLeft[1]))
           {
            const allBlocks = document.querySelectorAll('.block')
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            points ++
            if(points == 15) {
                score.innerHTML = 'You Win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            } else {
                score.innerHTML = points
            }
           }
    }

    // check for user collisions
    if((ballPos[0] > currPos[0] && ballPos[0] < currPos[0] + 100) && 
       (ballPos[1] > currPos[1] && ballPos[1] < currPos[1] + 20)) 
    {
        changeDirection()
    }

    // check for wall collisions
    if(ballPos[0] >= 540 || // if ball hits the right wall
       ballPos[1] >= 280 || // if ball hits the top wall
       ballPos[0] <= 0) { 
        changeDirection()
    }
    if(ballPos[1] <=0) {
        clearInterval(timerId)
        score.innerHTML = 'You Lose!'
        document.removeEventListener('keydown', moveUser)
    }
}   

function changeDirection() {
    if(xdir==2 && ydir==2) {
        ydir = -2
        return
    }
    if(xdir==2 && ydir==-2) {
        xdir = -2
        return
    }
    if(xdir==-2 && ydir==-2) {
        ydir = 2
        return
    }
    if(xdir==-2 && ydir==2) {
        xdir = 2
        return
    }
}