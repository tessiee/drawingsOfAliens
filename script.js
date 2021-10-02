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
        eventEl.classList.add("hide-event");
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

async function showInitialEvents() {
  await getEvents();
  let events = document.querySelectorAll(".event");
  for (x = 0; x < maxEvents; x++) {
    events.forEach(() => {
      events.item(x).classList.remove("hide-event");
    });
  }
  console.log(events);
}

showInitialEvents();

function showEvents() {
  let events = document.querySelectorAll(".event");
  for (x = 0; x < maxEvents; x++) {
    events.forEach(() => {
      events.item(x).classList.remove("hide-event");
    });
  }
  console.log(events);
}

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
  resetGame3();
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
      game3Action();
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

//Drawing functions

let gameCanvas;
let canvasName;
let objectColour;
let objectX;
let objectY;
let objectW;
let objectH;
let radius;
let radiusX;
let radiusY;
let rotation;
let startAngle;
let endAngle;
let counterClockwise;
let drawingSubject;

function drawRoundObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  radius,
  startAngle,
  endAngle,
  counterClockwise
) {
  gameCanvas.beginPath();
  gameCanvas.arc(
    objectX,
    objectY,
    radius,
    startAngle,
    endAngle,
    counterClockwise
  );
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawEllipseObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  radiusX,
  radiusY,
  rotation,
  startAngle,
  endAngle,
  counterClockwise
) {
  gameCanvas.beginPath();
  gameCanvas.ellipse(
    objectX,
    objectY,
    radiusX,
    radiusY,
    rotation,
    startAngle,
    endAngle,
    counterClockwise
  );
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawRectObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  objectW,
  objectH
) {
  gameCanvas.beginPath();
  gameCanvas.rect(objectX, objectY, objectW, objectH);
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawLuke(gameCanvas, drawingSubject) {
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x,
    drawingSubject.y,
    drawingSubject.size,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#000000",
    drawingSubject.x - 2,
    drawingSubject.y - 1,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#000000",
    drawingSubject.x + 2,
    drawingSubject.y - 1,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawEllipseObject(
    gameCanvas,
    "#808080",
    drawingSubject.x,
    drawingSubject.y + 5,
    20,
    2,
    0,
    0,
    Math.PI * 2,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 4,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 4,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 11,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 11,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 18,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 18,
    drawingSubject.y + 5.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
}

function drawAlienEnemy(gameCanvas, drawingSubject) {
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x,
    drawingSubject.y,
    drawingSubject.size,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#FF0000",
    drawingSubject.x - 1.5,
    drawingSubject.y,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#FF0000",
    drawingSubject.x + 1.5,
    drawingSubject.y,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawEllipseObject(
    gameCanvas,
    "#FF0000",
    drawingSubject.x,
    drawingSubject.y + 4,
    10,
    2,
    0,
    0,
    Math.PI * 2,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 3,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 3,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 7,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 7,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x - 11,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#05db05",
    drawingSubject.x + 11,
    drawingSubject.y + 4.2,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
}

function drawCowboyEnemy(gameCanvas, drawingSubject) {
  drawRoundObject(
    gameCanvas,
    "#DAA520",
    drawingSubject.x,
    drawingSubject.y - 10,
    5,
    -100,
    Math.PI - 0.5,
    true
  );
  drawRoundObject(
    gameCanvas,
    "#DEB887",
    drawingSubject.x,
    drawingSubject.y - 4,
    drawingSubject.size,
    -100,
    Math.PI - 0.5,
    true
  );
  drawEllipseObject(
    gameCanvas,
    "#DAA520",
    drawingSubject.x,
    drawingSubject.y - 10,
    15,
    1,
    0,
    0,
    Math.PI * 2,
    true
  );
}

function drawScore(gameCanvas, canvasName, gameScore) {
  gameCanvas.fillStyle = "#FF0000";
  gameCanvas.fillText(`Score: ${gameScore}`, canvasName.width - 55, 10);
}

function emptyCanvas(gameCanvas, canvasName) {
  gameCanvas.clearRect(0, 0, canvasName.width, canvasName.height);
}

//GAME CONTROLS
let controlledObject;

function setControlledObject() {
  switch (gamePlayed) {
    case "game1":
      controlledObject = luke1;
      break;
    case "game2":
      controlledObject = luke2;
      break;
    case "game3":
      controlledObject = luke3;
      break;
  }
}

function keyDown(e) {
  setControlledObject();

  if (e.key === "Right" || e.key === "ArrowRight") {
    controlledObject.dx = controlledObject.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    controlledObject.dx = -controlledObject.speed;
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    controlledObject.dy = -2;
  }
  if (e.key === "Down" || e.key === "ArrowDown") {
    controlledObject.dy = 2;
  }
}

function keyUp(e) {
  setControlledObject();

  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    controlledObject.dx = 0;
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    controlledObject.dy = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//GAME OBJECT FUNCTIONS
let enemyObject;
let lukeNr;

function moveLuke(lukeNr, canvasName) {
  lukeNr.x += lukeNr.dx;
  lukeNr.y += lukeNr.dy;

  if (lukeNr.x + lukeNr.w / 4 > canvasName.width) {
    lukeNr.x = canvasName.width - lukeNr.w / 4;
  }

  if (lukeNr.x - lukeNr.w / 4 < 0) {
    lukeNr.x = 0 + lukeNr.w / 4;
  }
  if (lukeNr.y > 100) {
    lukeNr.y = 100;
  }

  if (lukeNr.y < 10) {
    lukeNr.y = 10;
  }
}

function moveCowboyEnemy(enemyObject, canvasName) {
  enemyObject.x += enemyObject.dx;

  if (
    enemyObject.x + enemyObject.size > canvasName.width ||
    enemyObject.x - enemyObject.size < 0
  ) {
    enemyObject.dx *= -1;
  }
}

function moveAlienEnemy(
  enemyObject,
  canvasName,
  gameNr,
  gameScore,
  speedingSubject,
  accelerationX,
  accelerationY
) {
  enemyObject.x += enemyObject.dx * enemyObject.speed;
  enemyObject.y += enemyObject.dy * enemyObject.speed;

  if (enemyObject.dx > 5 || enemyObject.dx < -5) {
    enemyObject.dx *= 0.8;
  }
  if (enemyObject.x + 10 > canvasName.width || enemyObject.x - 10 < 0) {
    enemyObject.dx *= -1.1;
  }
  if (enemyObject.y < -10 || enemyObject.y > canvasName.height) {
    returnAlienEnemy(enemyObject, canvasName);
    scorePoints(gameNr);
    speedUp(gameScore, speedingSubject, accelerationX, accelerationY);
  }
}

//GAME FUNCTIONS
let gameNr;
let gameScore;
let speedingSubject;
let accelerationX;
let accelerationY;

function scorePoints(gameNr) {
  switch (gameNr) {
    case 1:
      score1++;
      break;
    case 2:
      score2++;
      break;
    case 3:
      score3++;
      break;
  }
}

function speedUp(gameScore, speedingSubject, accelerationX, accelerationY) {
  let x = 0;

  switch (gameScore) {
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
    speedingSubject.dx = speedingSubject.dx * accelerationX;
    speedingSubject.dy = speedingSubject.dy * accelerationY;
  }
}

function gameOver(enemyObject, lukeNr, gameNr) {
  if (
    enemyObject.x - enemyObject.size > lukeNr.x - 10 &&
    enemyObject.x + enemyObject.size < lukeNr.x + 18 &&
    enemyObject.y + enemyObject.size > lukeNr.y - 3 &&
    enemyObject.y - enemyObject.size < lukeNr.y + 3 + lukeNr.h * 2
  ) {
    resetGame(gameNr);
  }
}

function resetScore(gameNr) {
  switch (gameNr) {
    case 1:
      score1 = 0;
      break;
    case 2:
      score2 = 0;
      break;
    case 3:
      score3 = 0;
      break;
  }
}

function resetGame(gameNr) {
  switch (gameNr) {
    case 1:
      resetGame1();
      break;
    case 2:
      resetGame2();
      break;
    case 3:
      resetGame3();
      break;
  }
}

function resetCowboyEnemy(enemyObject, canvasName) {
  (enemyObject.x = canvasName.width / 2),
    (enemyObject.y = canvasName.height - 5),
    (enemyObject.dx = 2);
}

function resetLuke(lukeNr, canvasName) {
  (lukeNr.x = canvasName.width / 2),
    (lukeNr.y = canvasName.height / 2 - 60),
    (lukeNr.dx = 0);
}

function resetAlienEnemy(enemyObject, canvasName) {
  (enemyObject.x = canvasName.width / 2),
    (enemyObject.y = -10),
    (enemyObject.dx = 2.5);
  enemyObject.dy = 1.5;
  enemyObject.speed = 1.2;
}

function returnAlienEnemy(enemyObject, canvasName) {
  (enemyObject.x = canvasName.width / 2),
    (enemyObject.y = -10),
    (enemyObject.dx = Math.random() * 4 + 1),
    (enemyObject.dy = 1.5);
}

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

const luke1 = {
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

const cowboy1 = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 6,
  dx: 2,
};

function drawStars() {
  drawRoundObject(ctx1, "#DAA520", 75, 62, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 35, 112, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 224, 59, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 285, 21, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 154, 39, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 80, 42, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 142, 14, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 250, 61, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 110, 90, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 28, 17, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 125, 46, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 290, 24, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 290, 76, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 155, 17, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 90, 75, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 142, 114, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 250, 99, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 180, 94, 1, -100, Math.PI - 0.5, true);
  drawRoundObject(ctx1, "#DAA520", 65, 94, 1, -100, Math.PI - 0.5, true);
}

function drawEarth() {
  drawRectObject(ctx1, "#003b00", earth.x, earth.y, earth.w, earth.h);
}

function drawBullets() {
  drawRoundObject(
    ctx1,
    "#808080",
    bullet.x,
    bullet.y - 10,
    bullet.size,
    0,
    Math.PI * 2
  );
}

function drawGameElements1() {
  emptyCanvas(ctx1, canvas1);
  drawEarth();
  drawStars();
  drawCowboyEnemy(ctx1, cowboy1);
  drawLuke(ctx1, luke1);
  drawBullets();
  drawScore(ctx1, canvas1, score1);
}

function moveBullet() {
  bullet.x += bullet.dx;
  bullet.y += bullet.dy;

  if (bullet.x + bullet.size > canvas1.width || bullet.x - bullet.size < 0) {
    bullet.dx *= -1;
  }
  if (bullet.y + bullet.size > canvas1.height || bullet.y - bullet.size < 0) {
    returnBullet();
    scorePoints(1);
    speedUp(score1, bullet, 1.5, 1.5);
  }
}

function returnBullet() {
  (bullet.x = cowboy1.x), (bullet.y = cowboy1.y), bullet.dx * -1;
}

function resetBullet() {
  (bullet.x = cowboy1.x),
    (bullet.y = cowboy1.y),
    (bullet.dx = 3),
    (bullet.dy = -2);
}

function game1Action() {
  drawGameElements1();
  moveLuke(luke1, canvas1);
  moveCowboyEnemy(cowboy1, canvas1);
  moveBullet();
  gameOver(bullet, luke1, 1);
  requestIdGame1 = requestAnimationFrame(game1Action);
}

function resetGame1() {
  emptyCanvas(ctx1, canvas1);
  resetBullet();
  resetCowboyEnemy(cowboy1, canvas1);
  resetLuke(luke1, canvas1);
  resetScore(1);
  cancelAnimationFrame(requestIdGame1);
}

//GAME 2
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;

const luke2 = {
  x: canvas2.width / 2,
  y: canvas2.height - 20,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 5,
  dx: 0,
  dy: 0,
};

const evilAlien1 = {
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

function drawGame2Elements() {
  emptyCanvas(ctx2, canvas2);
  drawLuke(ctx2, luke2);
  drawAlienEnemy(ctx2, evilAlien1);
  drawAlienEnemy(ctx2, evilAlien2);
  drawScore(ctx2, canvas2, score2);
}

function game2Action() {
  drawGame2Elements();
  moveLuke(luke2, canvas2);
  moveAlienEnemy(evilAlien1, canvas2, 2, score2, evilAlien1, 1.1, 1.1);
  moveAlienEnemy(evilAlien2, canvas2, 2, score2, evilAlien2, 1.1, 1.1);
  gameOver(evilAlien1, luke2, 2);
  gameOver(evilAlien2, luke2, 2);
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas(ctx2, canvas2);
  resetAlienEnemy(evilAlien1, canvas2);
  resetAlienEnemy(evilAlien2, canvas2);
  resetLuke(luke2, canvas2);
  resetScore(2);
  cancelAnimationFrame(requestIdGame2);
}

//GAME 3
const canvas3 = document.getElementById("theGame3");
const ctx3 = canvas3.getContext("2d");
let score3 = 0;
let requestIdGame3;

const luke3 = {
  x: 30,
  y: canvas3.height / 2,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 5,
  dx: 0,
  dy: 0,
};

const alienEnemy1 = {
  x: canvas3.width + 10,
  y: canvas3.height * 0.3,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.2,
  dx: -2.5,
  dy: 1.5,
};

const alienEnemy2 = {
  x: canvas3.width + 10,
  y: canvas3.height * 0.6,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.5,
  dx: -2,
  dy: 1.5,
};

const alienEnemy3 = {
  x: canvas3.width + 10,
  y: canvas3.height * 0.5,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.5,
  dx: -2,
  dy: 1.5,
};

function drawGame3Elements() {
  emptyCanvas(ctx3, canvas3);
  drawLuke(ctx3, luke3);
  drawAlienEnemy(ctx3, alienEnemy1);
  drawAlienEnemy(ctx3, alienEnemy2);
  drawAlienEnemy(ctx3, alienEnemy3);
  drawScore(ctx3, canvas3, score3);
}

function game3Action() {
  drawGame3Elements();
  moveLuke(luke3, canvas3);
  moveAlienEnemy(alienEnemy1, canvas3, 3, score3, alienEnemy1, 1.1, 1.1);
  moveAlienEnemy(alienEnemy2, canvas3, 3, score3, alienEnemy2, 1.1, 1.1);
  moveAlienEnemy(alienEnemy3, canvas3, 3, score3, alienEnemy3, 1.1, 1.1);
  gameOver(alienEnemy1, luke3, 3);
  gameOver(alienEnemy2, luke3, 3);
  gameOver(alienEnemy3, luke3, 3);
  requestIdGame3 = requestAnimationFrame(game3Action);
}

function resetGame3() {
  emptyCanvas(ctx3, canvas3);
  resetAlienEnemy(alienEnemy1, canvas3);
  resetAlienEnemy(alienEnemy2, canvas3);
  resetAlienEnemy(alienEnemy3, canvas3);
  resetLuke(luke3, canvas3);
  resetScore(3);
  cancelAnimationFrame(requestIdGame3);
}

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
