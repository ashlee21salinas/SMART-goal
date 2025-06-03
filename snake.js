const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls svg")

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

//this gets the highscore from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText= `High Score: ${highScore}`;


const changeFoodPostion = () => {
    //this makes the foods postion random
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    //clears the time and reloads the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();

}

const changeDirection = (e) => {
    // this changes the direction/velocity when a key is pressed
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

controls.forEach(key => {
    // calls change firection on each key that is pressed
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})

const initGame = () => {
    if(gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //changes the postion of food when snake has same position as it 
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPostion();
        snakeBody.push([foodX, foodY]); // makes food go into bodies array
        score++; // +1 when interacted with food

        //high score number
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText= `Score: ${score}`;
        highScoreElement.innerText= `High Score: ${highScore}`;

    }

    // check if snakes head it outside the boundaries
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        // this shift forward the the values of the elements by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // sets first element of snakes body to current snake position

    // updates head position based on the velocity
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0; i < snakeBody.length; i++) {
        //adds divs for each part of snakes body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; 
        // checks if snakes head hits itself then game is over 
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPostion();
setIntervalId = setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);