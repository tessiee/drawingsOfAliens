//SIDEBAR
const sidebar = document.getElementById("sidebar");
const openSidebar = document.getElementById("openSidebar");

function highlightSidebar() {
  sidebar.classList.add("highlighted");
}

function unHighLightSidebar() {
  sidebar.classList.remove("highlighted");
}

function openCloseSidebar() {
  sidebar.classList.contains("hideSidebar")
    ? (sidebar.classList.remove("hideSidebar"),
      openSidebar.classList.remove("hideSidebarButton"))
    : (sidebar.classList.add("hideSidebar"),
      openSidebar.classList.add("hideSidebarButton"));
}

openSidebar.addEventListener("mouseenter", highlightSidebar);
openSidebar.addEventListener("mouseleave", unHighLightSidebar);
openSidebar.addEventListener("click", openCloseSidebar);

//SIDEBAR LINKS
const menuLinks = document
  .getElementById("menuLinks")
  .getElementsByTagName("a");
const drawingsBox = document.getElementById("drawingsBox");
const closeDrawings = document.getElementById("closeDrawings");
const drawingsContainer = document.getElementById("drawingsContainer");
let subjectDrawing;
let subjectDrawing2;

function hideDrawings() {
  const drawingsArr = drawingsBox.children;
  for (x = 0; x < drawingsArr.length; x++) {
    drawingsArr[x].classList.add("hideDrawings");
  }
  closeDrawings.classList.add("hideCloseBtn");
  drawingsContainer.classList.remove("drawingsContainer");
  drawingsBox.classList.add("hide-box");
}

function showDrawings() {
  hideDrawings();
  drawingsContainer.classList.add("drawingsContainer");
  drawingsBox.classList.remove("hide-box");
  subjectDrawing = event.target.parentElement.id;
  const drawingsShown = document.getElementById(`${subjectDrawing}Drawings`);
  drawingsShown.classList.remove("hideDrawings");
  closeDrawings.classList.remove("hideCloseBtn");
}

function closeDrawingsSidebar() {
  if (subjectDrawing == subjectDrawing2) {
    hideDrawings();
    subjectDrawing2 = undefined;
  } else {
    subjectDrawing2 = event.target.parentElement.id;
  }
}

function closeDrawingsBtn() {
  hideDrawings();
  subjectDrawing2 = undefined;
}

function menulinksEventListeners() {
  for (x = 0; x < menuLinks.length; x++) {
    menuLinks[x].addEventListener("click", showDrawings);
    menuLinks[x].addEventListener("click", closeDrawingsSidebar);
  }
}
menulinksEventListeners();

closeDrawings.addEventListener("click", closeDrawingsBtn);

//LOGIN FORM
const loginBox = document.getElementById("loginBox");
const loginForm = document.getElementById("loginForm");
const showLoginPass = document.getElementById("showLoginPass");
const loginContainer = document.getElementById("loginContainer");

function openCloseLoginForm() {
  closeRegistrationForm();
  loginBox.classList.contains("hideLogin")
    ? (loginBox.classList.remove("hideLogin"),
      loginContainer.classList.add("login-container"))
    : closeLoginForm();
}

function closeLoginForm() {
  loginBox.classList.add("hideLogin");
  loginForm.reset();
  loginContainer.classList.remove("login-container");
}

document
  .getElementById("openLogin")
  .addEventListener("click", openCloseLoginForm);
document
  .getElementById("closeLogin")
  .addEventListener("click", openCloseLoginForm);

//SHOW PASSWORD
function showPassword() {
  const type =
    loginPassword.getAttribute("type") === "password" ? "text" : "password";
  loginPassword.setAttribute("type", type);
}

showLoginPass.addEventListener("mouseenter", showPassword);
showLoginPass.addEventListener("mouseleave", showPassword);

//CHECK VALID LOGIN
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginUser = document.getElementById("loginUser");

//HELP USER LOGIN
const helpUser = document.getElementById("helpUser");

//REGISTRATION FORM
const registrationBox = document.getElementById("registrationBox");
const registerForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPass = document.getElementById("showPass");
const showConfirm = document.getElementById("showConfirm");
const regContainer = document.getElementById("reg-container");

function openCloseRegistrationForm() {
  closeLoginForm();
  const position = event.target.id == "openReg" ? "button" : "text";
  registrationBox.classList.contains("hideReg")
    ? (registrationBox.classList.add(`position-${position}`),
      registrationBox.classList.remove("hideReg"),
      regContainer.classList.add("reg-container"))
    : closeRegistrationForm();
}

function closeRegistrationForm() {
  const inputFields = [];
  for (x = 0; x < 4; x++) {
    inputFields[x] = document.getElementById(`field${x}`);
    inputFields[x].classList.remove("error");
  }
  registerForm.reset();
  registrationBox.classList.remove("position-button", "position-text");
  registrationBox.classList.add("hideReg");
  regContainer.classList.remove("reg-container");
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "registerFormField error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function hideError(input) {
  const formControl = input.parentElement;
  formControl.className = "registerFormField";
}

function isValidEmail(input) {
  if (input.value.length > 0) {
    const email =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.test(input.value.trim())) {
      hideError(input);
    } else {
      showError(input, "Please enter a valid email");
    }
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      if (input === confirmPassword) {
        showError(input, "Please confirm your password");
      } else {
        showError(input, `${getFieldName(input)} is required`);
      }
    } else {
      hideError(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min && input.value.length != 0) {
    showError(input, `Minimum length is: ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `Maximum length is: ${max} characters`);
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input2.value.length > 0) {
    if (input1.value !== input2.value) {
      showError(input2, "Passwords do not match");
    } else if (input1.value.length < 6) {
      showError(input2, "Please enter a valid password");
    } else {
      hideError(input2);
    }
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showPassw() {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
}

function showConfirmPassw() {
  const type =
    confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);
}

registerForm.addEventListener("submit", function (registration) {
  registration.preventDefault();

  if (!checkRequired([username, email, password, confirmPassword])) {
    checkLength(username, 5, 15);
    checkLength(password, 6, 25);
    isValidEmail(email);
    checkPasswordsMatch(password, confirmPassword);
  }
});

showPass.addEventListener("mouseover", showPassw);
showPass.addEventListener("mouseleave", showPassw);
showConfirm.addEventListener("mouseover", showConfirmPassw);
showConfirm.addEventListener("mouseleave", showConfirmPassw);

document
  .getElementById("openReg")
  .addEventListener("click", openCloseRegistrationForm);
document
  .getElementById("openReg2")
  .addEventListener("click", openCloseRegistrationForm);
document
  .getElementById("closeReg")
  .addEventListener("click", openCloseRegistrationForm);

//EVENT CALENDAR

const eventsContainer = document.getElementById("events-container");
const eventsBox = document.getElementById("events-box");
const eventsFilter = document.getElementById("events-filter");
const filterContainer = document.getElementById("filter-container");
const eventsList = document.getElementById("events-list");
const eventsLoader = document.getElementById("events-loader");
let maxEvents = 8;

function getEvents() {
  fetch("events.json")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((event) => {
        const eventEl = document.createElement("div");
        eventEl.classList.add("event");
        // eventEl.classList.add("hide-event");
        eventEl.innerHTML = `
        <div class="date">${event.date}</div>
        <div class="event-body">
        <h2 class="event-title">${event.title}</h2>
        <p class="event-description">${event.description}</p>
        </div>
        <button class="open-info">&#128712;</button>
        <div class="extra-info">
        <p class="event-info hide-info">${event.info}</p>
        </div>
        `;
        eventsList.appendChild(eventEl);
      })
    );
}
getEvents();

function filterEvents(e) {
  const events = document.querySelectorAll(".event");
  const searchEvent = e.target.value.toUpperCase();

  events.forEach((event) => {
    const title = event.querySelector(".event-title").innerText.toUpperCase();
    const body = event.querySelector(".event-body").innerText.toUpperCase();

    if (title.indexOf(searchEvent) > -1 || body.indexOf(searchEvent) > -1) {
      event.style.display = "flex";
    } else {
      event.style.display = "none";
    }
  });
}

eventsFilter.addEventListener("input", filterEvents);

// // SCROLL AND FETCH

function showEvents() {
  let events = document.querySelectorAll(".event");
  for (x = 0; x < maxEvents; x++) {
    events.forEach(() => {
      events.item(x).classList.remove("hide-event");
    });
  }
  console.log(events);
}

showEvents();

function showLoading() {
  eventsLoader.classList.add("show");

  setTimeout(() => {
    eventsLoader.classList.remove("show");

    setTimeout(() => {
      maxEvents += 4;
      console.log(maxEvents);
      showEvents();
    }, 100);
  }, 1000);
}

eventsBox.addEventListener("scroll", () => {
  let scrollTop = eventsBox.scrollTop;
  let scrollHeight = eventsBox.scrollHeight;
  let clientHeight = eventsBox.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    showLoading();
  }
});

//GAMES GENERAL
let gamePlayed;
let gamePlayed2;
let gameButtons = new Array(3);
let games = new Array(3);
let infoGames = new Array(3);
let gameBoxes = new Array(3);

function fillGameArrays() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x] = document.getElementById(`playGame${x + 1}`);
    games[x] = document.getElementById(`theGame${x + 1}`);
    infoGames[x] = document.getElementById(`game${x + 1}info`);
    gameBoxes[x] = document.getElementById(`game${x + 1}`);
  }
}
fillGameArrays();

function closeGames() {
  for (x = 0; x < games.length; x++) {
    games[x].classList.add("hide-game");
  }
  startBtn();
  resetAllGames();
  enableScrolling();
}

function resetAllGames() {
  resetGame1();
  resetGame2();
}

function startGame() {
  closeGames();
  gamePlayed = event.target.parentElement.id;
  const pick =
    "the" + (gamePlayed.charAt(0).toUpperCase() + gamePlayed.slice(1));
  const game = document.getElementById(pick);
  game.classList.remove("hide-game");
  gameLightOff();
  disableScrolling();

  switch (gamePlayed) {
    case "game1":
      game1Action();
      break;
    case "game2":
      game2Action();
      break;
    case "game3":
      //game3Action();
      break;
  }
}

function getOffset(element) {
  const position = element.getBoundingClientRect();
  return {
    left: position.left + window.scrollX,
    top: position.top + window.scrollY,
  };
}

const topGame1 = getOffset(game1).top;
const topGame2 = getOffset(game2).top;
const topGame3 = getOffset(game3).top;

function disableScrolling() {
  let x = window.scrollX;
  let y;
  let margin;
  gamePlayed = event.target.parentElement.id;

  if (window.innerHeight < 700) {
    margin = 0.98;
  } else {
    margin = 0.84;
  }

  switch (gamePlayed) {
    case "game1":
      y = topGame1 * margin;
      break;
    case "game2":
      y = topGame2 * margin;
      break;
    case "game3":
      y = topGame3 * margin;
      break;
  }

  window.scrollTo(x, y);
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}

function closePlayedGame() {
  if (gamePlayed == gamePlayed2) {
    closeGames();
    gamePlayed2 = undefined;
  } else {
    gamePlayed2 = event.target.parentElement.id;
  }
}

function startBtn() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x].innerText = "Play game";
    gameButtons[x].classList.remove("inGame");
  }
}

function endBtn() {
  const button = document.getElementById(`${event.target.id}`);
  if (button.innerText == "Play game") {
    button.innerText = "End game";
    button.classList.add("inGame");
  }
}

function gameLightOff() {
  for (x = 0; x < games.length; x++) {
    if (games[x].classList.contains("hide-game")) {
      infoGames[x].classList.remove("highlightGame");
      gameBoxes[x].classList.remove("highlightGame");
    }
  }
}

function highLightGame() {
  let pick = event.target.parentElement.id;
  const gameBox = document.getElementById(pick);
  const gameInfo = document.getElementById(`${pick + "info"}`);
  const game = document.getElementById(
    `${"the" + (pick.charAt(0).toUpperCase() + pick.slice(1))}`
  );

  if (game.classList.contains("hide-game")) {
    gameInfo.classList.contains("highlightGame")
      ? (gameInfo.classList.remove("highlightGame"),
        gameBox.classList.remove("highlightGame"))
      : (gameInfo.classList.add("highlightGame"),
        gameBox.classList.add("highlightGame"));
  }
}

function gamesEventListeners() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x].addEventListener("click", startGame);
    gameButtons[x].addEventListener("click", endBtn);
    gameButtons[x].addEventListener("click", closePlayedGame);
    gameButtons[x].addEventListener("mouseenter", highLightGame);
    gameButtons[x].addEventListener("mouseleave", highLightGame);
  }
}
gamesEventListeners();

//GAME 1
const canvas1 = document.getElementById("theGame1");
const ctx1 = canvas1.getContext("2d");
let score1 = 0;
let requestIdGame1;

const earth = {
  x: 0,
  y: canvas1.height - 5,
  w: canvas1.width,
  h: 5,
};

const ufo = {
  x: canvas1.width / 2,
  y: canvas1.height / 2 - 60,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 5,
  dx: 0,
  dy: 0,
};

const bullet = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 2,
  speed: 2,
  dx: 3,
  dy: -2,
};

const enemy = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 6,
  dx: 2,
};

function drawEarth() {
  ctx1.beginPath();
  ctx1.rect(earth.x, earth.y, earth.w, earth.h);
  ctx1.fillStyle = "#003b00";
  ctx1.fill();
  ctx1.closePath();
}

function drawStars() {
  ctx1.beginPath();
  ctx1.arc(75, 63 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(35, 113 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(224, 60 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(285, 22 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(154, 40 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(80, 43 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(142, 15 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(250, 62 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(110, 91 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(28, 18 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(125, 47 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(67, 25 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(290, 77 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(290, 18 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(155, 99 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(90, 76 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(142, 115 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(250, 100 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(180, 95 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
  ctx1.beginPath();
  ctx1.arc(65, 95 - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
}

function drawUFO() {
  ctx1.beginPath();
  ctx1.arc(ufo.x, ufo.y, ufo.size, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#05db05";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.arc(ufo.x - 2, ufo.y - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.arc(ufo.x + 2, ufo.y - 1, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#000000";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.ellipse(ufo.x, ufo.y + 5, 20, 2, 0, 0, Math.PI * 2, true);
  ctx1.fillStyle = "#808080";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.arc(ufo.x - 4, ufo.y + 5.2, 1, -100, Math.PI - 0.5, true);
  ctx1.arc(ufo.x + 4, ufo.y + 5.2, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#05db05";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.arc(ufo.x - 11, ufo.y + 5, 1, -100, Math.PI - 0.5, true);
  ctx1.arc(ufo.x + 11, ufo.y + 5, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#05db05";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.arc(ufo.x - 18, ufo.y + 4.8, 1, -100, Math.PI - 0.5, true);
  ctx1.arc(ufo.x + 18, ufo.y + 4.8, 1, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#05db05";
  ctx1.fill();
  ctx1.closePath();
}

function drawBullets() {
  ctx1.beginPath();
  ctx1.arc(bullet.x, bullet.y - 10, bullet.size, 0, Math.PI * 2);
  ctx1.fillStyle = "#808080";
  ctx1.fill();
  ctx1.closePath();
}

function drawEnemy() {
  ctx1.beginPath();
  ctx1.arc(enemy.x, enemy.y - 10, 5, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.arc(enemy.x, enemy.y - 4, enemy.size, -100, Math.PI - 0.5, true);
  ctx1.fillStyle = "#DEB887";
  ctx1.fill();
  ctx1.closePath();

  ctx1.beginPath();
  ctx1.ellipse(enemy.x, enemy.y - 10, 15, 1, 0, 0, Math.PI * 2, true);
  ctx1.fillStyle = "#DAA520";
  ctx1.fill();
  ctx1.closePath();
}

function drawScore() {
  ctx1.fillStyle = "#FF0000";
  ctx1.fillText(`Score: ${score1}`, canvas1.width - 55, 10);
}

function emptyCanvas() {
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
}

function drawGameElements() {
  emptyCanvas();
  drawEarth();
  drawStars();
  drawUFO();
  drawBullets();
  drawEnemy();
  drawScore();
}

function moveUFO() {
  ufo.x += ufo.dx;
  ufo.y += ufo.dy;

  if (ufo.x + ufo.w / 2 > canvas1.width) {
    ufo.x = canvas1.width - ufo.w / 2;
  }

  if (ufo.x - ufo.w / 2 < 0) {
    ufo.x = 0 + ufo.w / 2;
  }
  if (ufo.y > 100) {
    ufo.y = 100;
  }

  if (ufo.y < 10) {
    ufo.y = 10;
  }
}

function moveEnemy() {
  enemy.x += enemy.dx;

  if (enemy.x + enemy.size > canvas1.width || enemy.x - enemy.size < 0) {
    enemy.dx *= -1;
  }
}

function moveBullet() {
  bullet.x += bullet.dx;
  bullet.y += bullet.dy;

  if (bullet.x + bullet.size > canvas1.width || bullet.x - bullet.size < 0) {
    bullet.dx *= -1;
  }
  if (bullet.y + bullet.size > canvas1.height || bullet.y - bullet.size < 0) {
    returnBullet();
    scorePoints();
    speedUp();
  }
}

function scorePoints() {
  score1++;
}

function speedUp() {
  let x = 0;

  switch (score1) {
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
    bullet.dy = bullet.dy * 1.5;
    bullet.dx = bullet.dx * 1.4;
  }
}

function gameOver() {
  if (
    bullet.x - bullet.size > ufo.x - 10 &&
    bullet.x + bullet.size < ufo.x + 18 &&
    bullet.y + bullet.size > ufo.y - 3 &&
    bullet.y - bullet.size < ufo.y + 3 + ufo.h * 2
  ) {
    resetGame1();
  }
}

function returnBullet() {
  (bullet.x = enemy.x), (bullet.y = enemy.y), bullet.dx * -1;
}

function resetBullet() {
  (bullet.x = enemy.x), (bullet.y = enemy.y), (bullet.dx = 3), (bullet.dy = -2);
}

function resetEnemy() {
  (enemy.x = canvas1.width / 2), (enemy.y = canvas1.height - 5), (enemy.dx = 2);
}

function resetUFO() {
  (ufo.x = canvas1.width / 2), (ufo.y = canvas1.height / 2 - 60), (ufo.dx = 0);
}

function resetScore() {
  score1 = 0;
}

function game1Action() {
  drawGameElements();
  moveUFO();
  moveEnemy();
  moveBullet();
  gameOver();
  requestIdGame1 = requestAnimationFrame(game1Action);
}

function resetGame1() {
  emptyCanvas();
  resetBullet();
  resetEnemy();
  resetUFO();
  resetScore();
  cancelAnimationFrame(requestIdGame1);
}

function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    ufo.dx = ufo.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    ufo.dx = -ufo.speed;
  }
  if (e.key === "Up" || e.key === "ArrowUp") {
    ufo.dy = -ufo.speed / 4;
  } else if (e.key === "Down" || e.key === "ArrowDown") {
    ufo.dy = ufo.speed / 4;
  }
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    ufo.dx = 0;
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    ufo.dy = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//GAME 2
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;

const spaceship = {
  x: canvas2.width / 2,
  y: canvas2.height - 20,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 5,
  dx: 0,
  dy: 0,
};

const evilAlien = {
  x: 200,
  y: -10,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.2,
  dx: 2.5,
  dy: 1.5,
};

const evilAlien2 = {
  x: 100,
  y: -10,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.5,
  dx: -2,
  dy: 1.5,
};

function drawSpaceship() {
  ctx2.beginPath();
  ctx2.arc(spaceship.x, spaceship.y, spaceship.size, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 2, spaceship.y - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 2, spaceship.y - 1, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#000000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.ellipse(spaceship.x, spaceship.y + 5, 20, 2, 0, 0, Math.PI * 2, true);
  ctx2.fillStyle = "#808080";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 4, spaceship.y + 5.2, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 4, spaceship.y + 5.2, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 11, spaceship.y + 5, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 11, spaceship.y + 5, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(spaceship.x - 18, spaceship.y + 4.8, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(spaceship.x + 18, spaceship.y + 4.8, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();
}

function drawEvilAlien() {
  ctx2.beginPath();
  ctx2.arc(evilAlien.x, evilAlien.y, evilAlien.size, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "##05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien.x - 1.5, evilAlien.y, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien.x + 1.5, evilAlien.y, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.ellipse(evilAlien.x, evilAlien.y + 4, 10, 2, 0, 0, Math.PI * 2, true);
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien.x - 3, evilAlien.y + 4.2, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien.x + 3, evilAlien.y + 4.2, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien.x - 7, evilAlien.y + 4, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien.x + 7, evilAlien.y + 4, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien.x - 11, evilAlien.y + 3.8, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien.x + 11, evilAlien.y + 3.8, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();
}

function drawEvilAlien2() {
  ctx2.beginPath();
  ctx2.arc(
    evilAlien2.x,
    evilAlien2.y,
    evilAlien2.size,
    -100,
    Math.PI - 0.5,
    true
  );
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien2.x - 1.5, evilAlien2.y, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien2.x + 1.5, evilAlien2.y, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.ellipse(evilAlien2.x, evilAlien2.y + 4, 10, 2, 0, 0, Math.PI * 2, true);
  ctx2.fillStyle = "#05db05";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien2.x - 3, evilAlien2.y + 4.2, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien2.x + 3, evilAlien2.y + 4.2, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien2.x - 7, evilAlien2.y + 4, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien2.x + 7, evilAlien2.y + 4, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();

  ctx2.beginPath();
  ctx2.arc(evilAlien2.x - 11, evilAlien2.y + 3.8, 1, -100, Math.PI - 0.5, true);
  ctx2.arc(evilAlien2.x + 11, evilAlien2.y + 3.8, 1, -100, Math.PI - 0.5, true);
  ctx2.fillStyle = "#FF0000";
  ctx2.fill();
  ctx2.closePath();
}

function drawScore2() {
  ctx2.fillStyle = "#FF0000";
  ctx2.fillText(`Score: ${score2}`, canvas2.width - 55, 10);
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
  if (spaceship.y > 140) {
    spaceship.y = 140;
  }

  if (spaceship.y < 10) {
    spaceship.y = 10;
  }
}

function resetSpaceship() {
  (spaceship.x = canvas2.width / 2),
    (spaceship.y = canvas2.height - 20),
    (spaceship.dx = 0);
}

function moveEvilAlien() {
  evilAlien.x += evilAlien.dx * evilAlien.speed;
  evilAlien.y += evilAlien.dy * evilAlien.speed;

  if (evilAlien.dx > 5 || evilAlien.dx < -5) {
    evilAlien.dx *= 0.8;
  }
  if (evilAlien.x + 10 > canvas2.width || evilAlien.x - 10 < 0) {
    evilAlien.dx *= -1.1;
  }
  if (evilAlien.y < -10 || evilAlien.y > canvas2.height) {
    returnEvilAlien();
    scorePoints2();
    speedUp2();
  }
}

function returnEvilAlien() {
  (evilAlien.x = canvas2.width / 2), (evilAlien.y = -10), evilAlien.dx * -1.1;
  evilAlien.dy = 1.5;
}

function resetEvilAlien() {
  (evilAlien.x = canvas2.width / 2), (evilAlien.y = -10), (evilAlien.dx = 2.5);
  evilAlien.dy = 1.5;
  evilAlien.speed = 1.2;
}

function moveEvilAlien2() {
  evilAlien2.x += evilAlien2.dx * evilAlien2.speed;
  evilAlien2.y += evilAlien2.dy * evilAlien2.speed;

  if (evilAlien2.dx > 4.5 || evilAlien2.dx < -4.5) {
    evilAlien2.dx *= 0.8;
  }
  if (evilAlien2.x + 10 > canvas2.width || evilAlien2.x - 10 < 0) {
    evilAlien2.dx *= -1.15;
  }
  if (evilAlien2.y < -10 || evilAlien2.y > canvas2.height) {
    returnEvilAlien2();
    scorePoints2();
    speedUp2();
  }
}

function returnEvilAlien2() {
  (evilAlien2.x = canvas2.width / 2),
    (evilAlien2.y = -10),
    evilAlien2.dx * -1.05;
  evilAlien2.dy = 1.5;
}

function resetEvilAlien2() {
  (evilAlien2.x = canvas2.width / 2),
    (evilAlien2.y = -10),
    (evilAlien2.dx = -2);
  evilAlien2.dy = 1.5;
  evilAlien2.speed = 1.5;
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
    evilAlien.speed *= 1.1;
    evilAlien2.speed *= 1.1;
  }
}

function gameOver2() {
  if (
    evilAlien.x - evilAlien.size > spaceship.x - 10 &&
    evilAlien.x + evilAlien.size < spaceship.x + 18 &&
    evilAlien.y + evilAlien.size > spaceship.y - 3 &&
    evilAlien.y - evilAlien.size < spaceship.y + 3 + spaceship.h * 2
  ) {
    resetGame2();
  } else if (
    evilAlien2.x - evilAlien2.size > spaceship.x - 10 &&
    evilAlien2.x + evilAlien2.size < spaceship.x + 18 &&
    evilAlien2.y + evilAlien2.size > spaceship.y - 3 &&
    evilAlien2.y - evilAlien2.size < spaceship.y + 3 + spaceship.h * 2
  ) {
    resetGame2();
  }
}

function scorePoints2() {
  score2++;
}

function resetScore2() {
  score2 = 0;
}

function emptyCanvas2() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function drawGame2Elements() {
  emptyCanvas2();
  drawSpaceship();
  drawEvilAlien();
  drawEvilAlien2();
  drawScore2();
}

function game2Action() {
  drawGame2Elements();
  moveSpaceship();
  moveEvilAlien();
  moveEvilAlien2();
  gameOver2();
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas2();
  resetEvilAlien();
  resetEvilAlien2();
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

//FOOTER
const textsArr = document.getElementsByClassName("foot-text");
const footLinks = document
  .getElementById("foot-texts")
  .getElementsByTagName("a");
let subjectFooter;
let subjectFooter2;

function openCloseFootText() {
  closeFootText();
  event.target.classList.add("highlight");
  subjectFooter = event.target.id;
  const textShown = document.getElementById(`${subjectFooter}-text`);
  textShown.classList.remove("hide-text");
}

function closeFootText() {
  for (x = 0; x < textsArr.length; x++) {
    textsArr[x].classList.add("hide-text");
    footLinks[x].classList.remove("highlight");
  }
}

function getLinks() {
  for (x = 0; x < footLinks.length; x++) {
    footLinks[x].addEventListener("click", openCloseFootText);
  }
}
getLinks();

function closeTextFooter() {
  if (subjectFooter == subjectFooter2) {
    closeFootText();
    subjectFooter2 = undefined;
  } else {
    subjectFooter2 = event.target.id;
  }
}

function closeViaFooter() {
  for (x = 0; x < footLinks.length; x++) {
    footLinks[x].addEventListener("click", closeTextFooter);
  }
}
closeViaFooter();

document
  .getElementById("openReg3")
  .addEventListener("click", openCloseRegistrationForm);
