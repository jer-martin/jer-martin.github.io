const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}];

let dx = 10;
let dy = 0;
let powerUp = {x: Math.floor(Math.random()*29)*10, y: Math.floor(Math.random()*29)*10};
let playing = false;

let powerUpCounter = 0;

function draw() {
  if (playing) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#DDDDDD ';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = (i == 0) ? "green" : '#A5E7A2' ;
      ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
      ctx.strokeStyle = '#75DB71';
      ctx.strokeRect(snake[i].x, snake[i].y, 10, 10);
    }

   

    ctx.fillStyle = "red";
    ctx.fillRect(powerUp.x, powerUp.y, 10, 10);

    let newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(newHead);

    if (newHead.x === powerUp.x && newHead.y === powerUp.y) {
      powerUp = {x: Math.floor(Math.random()*29)*10, y: Math.floor(Math.random()*29)*10};
      powerUpCounter++;
    } else {
      snake.pop();
    }

    if (newHead.x < 0 || newHead.x > canvas.width - 10 || newHead.y < 0 || newHead.y > canvas.height - 10) {
      playing = false;
      snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}];
         dx = 10;
         dy = 0;
    }

    for (let i = 1; i < snake.length; i++) {
      if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
        playing = false;
        snake = [{x: 150, y: 150}, {x: 140, y: 150}, {x: 130, y: 150}, {x: 120, y: 150}, {x: 110, y: 150}];
        dx = 10;
        dy = 0;
      }
    }
  } else {
    showMenu();
  }
}






function showMenu() {
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
}

document.addEventListener("keydown", direction);

function direction(event) {
  let key = event.keyCode;
  if (key === 87 && dy === 0) {
    dx = 0;
    dy = -10;
  } else if (key === 65 && dx === 0) {
    dx = -10;
    dy = 0;
  } else if (key === 83 && dy === 0) {
    dx = 0;
    dy = 10;
  } else if (key === 68 && dx === 0) {
    dx = 10;
    dy = 0;
  } else if (key === 13) {
    playing = true;
  } else if (key === 27) {
    playing = false;
  }
}

setInterval(draw, 100);
showMenu();
