document.addEventListener("DOMContentLoaded", () => {
  const followButton = document.getElementById("followBtn");
  const followText = document.getElementById("followText");
  const followersNumber = document.getElementById("followersNumber");

  let isFollowing = localStorage.getItem("isFollowing") === "true";
  let followers = parseInt(localStorage.getItem("followers")) || 0;

  updateFollowState();

  followButton.addEventListener("click", () => {
    isFollowing = !isFollowing;
    followers = isFollowing ? followers + 1 : followers - 1;

    localStorage.setItem("isFollowing", isFollowing);
    localStorage.setItem("followers", followers);

    updateFollowState();
  });

  setInterval(() => {
    if (isFollowing) {
      followers += 1;
      localStorage.setItem("followers", followers);
      updateFollowState();
    }
  }, 5000);

  function updateFollowState() {
    followText.textContent = isFollowing ? "Seguindo" : "Seguir";
    followersNumber.textContent = followers;
    followButton.classList.toggle("following", isFollowing);
  }

  // Código do jogo da cobra
  const canvas = document.getElementById("snakeGame");
  const ctx = canvas.getContext("2d");

  const box = 20;
  let snake;
  let food;
  let score;
  let d;
  let game;
  const colors = [
    "#00FF00",
    "#FF0000",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
  ];

  function initGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };

    score = 0;
    d = null;

    if (game) clearInterval(game);
    game = setInterval(draw, 100);
  }

  document.addEventListener("keydown", direction);

  function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
      d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
      d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
      d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
      d = "DOWN";
    }
  }

  function collision(newHead, array) {
    for (let i = 0; i < array.length; i++) {
      if (newHead.x == array[i].x && newHead.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(snake[i].x, snake[i].y, box, box);

      ctx.strokeStyle = "#000000";
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenhar a comida
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box,
      };
    } else {
      snake.pop();
    }

    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    if (
      snakeX < 0 ||
      snakeY < 0 ||
      snakeX >= canvas.width ||
      snakeY >= canvas.height ||
      collision(newHead, snake)
    ) {
      initGame();
      return;
    }

    snake.unshift(newHead);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
  }

  initGame();
});
