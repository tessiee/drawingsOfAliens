//GAME 2
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;

const spaceship = {
  x: canvas2.width,
  y: canvas2.height,
  w: 40,
  h: 4,
  size: 4.5,
  speed: 5,
  dx: 0,
  dy: 0,
};

const evilAlien = {
  x: canvas2.width,
  y: canvas2.height,
  w: 20,
  size: 3.5,
  speed: 1,
  dx: 2,
  dy: 2,
};

function drawStars2() {
  ctx2.beginPath();
  ctx2.arc(5, 63 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(35, 108 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(228, 60 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(285, 27 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(164, 40 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(80, 48 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(135, 15 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(250, 55 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(117, 91 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(28, 15 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(129, 47 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(67, 27 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(291, 77 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(290, 14 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(153, 99 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(90, 74 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(138, 115 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(250, 108 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(183, 95 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
  ctx2.beginPath();
  ctx2.arc(65, 98 - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#DAA520";
  ctx2.fill();
  ctx2.closePath();
}

function drawSpaceship() {
  ctx2.beginPath();
  ctx2.arc(
    spaceship.x,
    spaceship.y + 115,
    spaceship.size,
    1,
    Math.PI - 0.5,
    true
  );
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 2, spaceship.y + 114, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 2, spaceship.y + 114, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#000000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.ellipse(spaceship.x, spaceship.y + 120, 15, 2, 0, 0, Math.PI * 2, true);
  ctx2.fillStyle = "#808080";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 4, spaceship.y + 120.2, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 4, spaceship.y + 120.2, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 10, spaceship.y + 120, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 10, spaceship.y + 120, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 15, spaceship.y + 119.8, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 15, spaceship.y + 119.8, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();
}

function drawEvilAlien() {
  ctx2.beginPath();
  ctx2.arc(
    evilAlien.x / 2 + evilAlien.w,
    evilAlien.y * 0.1 - evilAlien.w,
    evilAlien.size,
    1,
    Math.PI - 0.5,
    true
  );
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(
    evilAlien.x / 2 + evilAlien.w + 1.5,
    evilAlien.y * 0.1 - evilAlien.w - 1,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  ctx2.arc(
    evilAlien.x / 2 + evilAlien.w - 1.5,
    evilAlien.y * 0.1 - evilAlien.w - 1,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.ellipse(
    evilAlien.x / 2 + evilAlien.w,
    evilAlien.y * 0.1 - evilAlien.w + 4,
    10,
    2,
    0,
    0,
    Math.PI * 2,
    true
  );
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();
}

function drawScore2() {
  ctx2.fillStyle = "#FF0000";
  ctx2.fillText(`Score: ${score2}`, canvas2.width - 55, 10);
}

function emptyCanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function drawGame2Elements() {
  emptyCanvas2();
  drawStars2();
  drawSpaceship();
  drawEvilAlien();
  drawScore2();
}

function moveSpaceship() {
  spaceship.x += spaceship.dx;
  spaceship.y -= spaceship.dy;

  if (spaceship.x + 20 > canvas2.width) {
    spaceship.x = canvas2.width - 20;
  }

  if (spaceship.x - 20 < 0) {
    spaceship.x = 0 + 20;
  }
  if (spaceship.y > 25) {
    spaceship.y = 25;
  }

  if (spaceship.y < -100) {
    spaceship.y = -100;
  }
}

function moveEvilAlien() {
  evilAlien.x += evilAlien.dx * evilAlien.speed;
  evilAlien.y += evilAlien.dy * evilAlien.speed;

  if (evilAlien.x > 540 || evilAlien.x < -15) {
    evilAlien.dx *= -1;
    console.log(evilAlien.x, evilAlien.y);
  }
  if (evilAlien.y < canvas2.height || evilAlien.y > canvas2.height * 12) {
    returnEvilAlien();
    scorePoints2();
    speedUp2();
    console.log(evilAlien.x, evilAlien.y);
  }
}

function scorePoints2() {
  score2++;
}

function speedUp2() {
  let x = 0;

  switch (score2) {
    case 5:
      x = 5;
      break;
    case 15:
      x = 15;
      break;
    case 25:
      x = 25;
      break;
    case 35:
      x = 35;
      break;
    case 45:
      x = 45;
      break;
    case 55:
      x = 55;
      break;
  }

  if (x == 5 || x == 15 || x == 25 || x == 35 || x == 45 || x == 55) {
    evilAlien.speed++;
  }
}

function gameOver2() {
  // werkt niet
  if (
    evilAlien.x > spaceship.x &&
    evilAlien.x < spaceship.x &&
    evilAlien.y > spaceship.y &&
    evilAlien.y < spaceship.y
  ) {
    resetGame2();
  }
}

function returnEvilAlien() {
  (evilAlien.x = canvas2.width - 20),
    (evilAlien.y = canvas2.height + 100),
    evilAlien.dx * -1;
  evilAlien.dy = 2;
}

function resetEvilAlien() {
  (evilAlien.x = canvas2.width),
    (evilAlien.y = canvas2.height),
    (evilAlien.dx = 2);
  evilAlien.dy = 2;
  evilAlien.speed = 4;
}

function resetSpaceship() {
  (spaceship.x = canvas2.width / 2),
    (spaceship.y = canvas2.height / 2 - 60),
    (spaceship.dx = 0);
}

function resetScore2() {
  score2 = 0;
}

function game2Action() {
  drawGame2Elements();
  moveSpaceship();
  moveEvilAlien();
  gameOver2();
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas2();
  resetEvilAlien();
  resetSpaceship();
  resetScore2();
  cancelAnimationFrame(requestIdGame2);
}

function keyDown2(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    spaceship.dx = spaceship.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    spaceship.dx = -spaceship.speed;
  }
  if (e.key === "Up" || e.key === "ArrowUp") {
    spaceship.dy = spaceship.speed / 4;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    spaceship.dy = -spaceship.speed / 4;
  }
}

function keyUp2(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    spaceship.dx = 0;
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    spaceship.dy = 0;
  }
}

document.addEventListener("keydown", keyDown2);
document.addEventListener("keyup", keyUp2);
