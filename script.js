//INTRO POP-UP
const introScreen = document.getElementById("intro-screen");

function closeIntroPopUp() {
  introScreen.classList.add("hide-screen");
}

document
  .getElementById("closeIntro")
  .addEventListener("click", closeIntroPopUp);

//HEADER ANIMATION
const animationBox = document.getElementById("animation-box");
let maxXstar = window.innerWidth - 100;

animationBox.innerHTML = `<canvas height="550" width = "${maxXstar}" class="head-animation" id="head-animation">
</canvas>`;

const headAnimationCanvas = document.getElementById("head-animation");
const ctxHeadAnimation = headAnimationCanvas.getContext("2d");
let requestIdHeadAnimation;
let starsArray = [];
let maxStars = 150;
let randomXstar;
let randomYstar;
let pause = 65;
let start = 0;
let randomYalien1 = Math.random() * 0.4 + 0.1;
let randomYalien2 = Math.random() * 0.9 + 0.1;
let randomYalien3 = Math.random() * 0.4 + 0.5;

let alien1 = {
  x: -10,
  y: headAnimationCanvas.height * randomYalien1,
  speed: 1.4,
  dx: 2.5,
  dy: 0,
};

let alien2 = {
  x: maxXstar + 10,
  y: headAnimationCanvas.height * randomYalien2,
  speed: 1.2,
  dx: -2.5,
  dy: 0,
};

let alien3 = {
  x: -10,
  y: headAnimationCanvas.height * randomYalien3,
  speed: 1.2,
  dx: 2.5,
  dy: 0,
};

function moveAlien(enemyObject, canvasName, marginX, direction, randomYalien) {
  enemyObject.x += enemyObject.dx * enemyObject.speed;
  enemyObject.y += enemyObject.dy;

  if (enemyObject.x > canvasName.width + 200 || enemyObject.x < -20) {
    randomYalien1 = Math.random() * 0.4 + 0.1;
    randomYalien2 = Math.random() * 0.9 + 0.1;
    randomYalien3 = Math.random() * 0.4 + 0.5;
    resetAlien(enemyObject, canvasName, marginX, direction, randomYalien);
  }
}

function resetAlien(enemyObject, canvasName, marginX, direction, randomYalien) {
  enemyObject.x = marginX;
  enemyObject.y = canvasName.height * randomYalien;
  enemyObject.dx = 2.5 * direction;
}

function multipleStars() {
  this.x = randomXstar;
  this.y = randomYstar;
  this.radius = 1;
  this.color = "#624900";

  this.draw = function (gameCanvas) {
    gameCanvas.beginPath();
    gameCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    gameCanvas.fillStyle = this.color;
    gameCanvas.fill();
    gameCanvas.closePath();
  };
}

function fillStarsArray(gameCanvas, maxStars, starsArray) {
  for (var i = 0; i < 100; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 250 + 0;
    starsArray[i] = new multipleStars();
    starsArray[i].draw(gameCanvas);
  }
  for (var i = 100; i < 140; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 250;
    starsArray[i] = new multipleStars();
    starsArray[i].draw(gameCanvas);
  }
  for (var i = 140; i < maxStars; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 400;
    starsArray[i] = new multipleStars();
    starsArray[i].draw(gameCanvas);
  }
}

function drawHeadAnimation() {
  emptyCanvas(ctxHeadAnimation, headAnimationCanvas);
  fillStarsArray(ctxHeadAnimation, maxStars, starsArray);
  drawAlienEnemy(ctxHeadAnimation, alien1);
  drawAlienEnemy(ctxHeadAnimation, alien2);
  drawAlienEnemy(ctxHeadAnimation, alien3);
}

function headAnimationAction(current) {
  if (start === 0) {
    start = current;
  }

  if (current - start >= pause) {
    drawHeadAnimation();
    start = current;
  }
  moveAlien(alien1, headAnimationCanvas, -10, 1, randomYalien1);
  moveAlien(
    alien2,
    headAnimationCanvas,
    headAnimationCanvas.width + 10,
    -1,
    randomYalien2
  );
  moveAlien(alien3, headAnimationCanvas, -10, 1, randomYalien3);
  requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);
}
requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);

function resetHeadAnimation() {
  emptyCanvas(ctxHeadAnimation, headAnimationCanvas);
  resetAlien(alien1, headAnimationCanvas, -10, 1, randomYalien1);
  resetAlien(
    alien2,
    headAnimationCanvas,
    headAnimationCanvas.width + 10,
    -1,
    randomYalien2
  );
  resetAlien(alien3, headAnimationCanvas, -10, 1, randomYalien3);
  cancelAnimationFrame(requestIdHeadAnimation);
}

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
let otherDrawing =
  (document.getElementById("nextDrawing"),
  document.getElementById("previousDrawing"));
let subjectDrawing;
let subjectDrawing2;

function hideDrawings() {
  const drawingsArr = drawingsBox.children;
  for (x = 0; x < drawingsArr.length; x++) {
    drawingsArr[x].classList.add("hideDrawings");
  }
  closeDrawings.classList.add("hideBtn");
  otherDrawing.classList.add("hideBtn");
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
  closeDrawings.classList.remove("hideBtn");
  otherDrawing.classList.remove("hideBtn");
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

//SHOW PASSWORD FUNCTIE SAMENVOEGEN
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

  if (registrationBox.classList.contains("hideReg")) {
    registrationBox.classList.add(`position-${position}`);
    registrationBox.classList.remove("hideReg");
    regContainer.classList.add("reg-container");
  } else if (
    position == "button" &&
    registrationBox.classList.contains("position-text")
  ) {
    registrationBox.classList.remove("position-text");
    registrationBox.classList.add("position-button");
  } else {
    closeRegistrationForm();
  }
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
// document
//   .getElementById("openReg2")
//   .addEventListener("click", openCloseRegistrationForm);
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

fetch("events.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((event) => {
      const eventEl = document.createElement("div");
      eventEl.classList.add("event");
      eventEl.classList.add("hide-event");
      eventEl.innerHTML = `
        <div class="date">${event.date}</div>
        <div class="event-body">
        <h2 class="event-title">${event.title}</h2>
        <p class="event-description">${event.description}</p>
        <div class="extra-info hide-info">
        <button class="open-info">&#128712;</button>
        <p class="event-info">${event.info}</p>
        </div>
        </div>
        `;
      eventsList.appendChild(eventEl);
    });
  });

function filterEvents(e) {
  const events = document.querySelectorAll(".event");
  const searchEvent = e.target.value.toUpperCase();

  events.forEach((event) => {
    const title = event.querySelector(".event-title").innerText.toUpperCase();
    const body = event.querySelector(".event-body").innerText.toUpperCase();
    const info = event.querySelector(".event-info").innerText.toUpperCase();

    if (
      title.indexOf(searchEvent) > -1 ||
      body.indexOf(searchEvent) > -1 ||
      info.indexOf(searchEvent) > -1
    ) {
      event.style.display = "flex";
    } else {
      event.style.display = "none";
    }
  });
}

eventsFilter.addEventListener("input", filterEvents);

// // SCROLL AND FETCH

async function showInitialEvents() {
  let res = await fetch("events.json");
  await res.json();
  let events = document.querySelectorAll(".event");
  for (x = 0; x < maxEvents; x++) {
    events.forEach(() => {
      events.item(x).classList.remove("hide-event");
    });
  }
}

showInitialEvents();

function showEvents() {
  let events = document.querySelectorAll(".event");
  for (x = 0; x < maxEvents; x++) {
    events.forEach(() => {
      events.item(x).classList.remove("hide-event");
    });
  }
}

function showLoading() {
  eventsLoader.classList.add("show");

  setTimeout(() => {
    eventsLoader.classList.remove("show");

    setTimeout(() => {
      if (maxEvents < eventsList.childElementCount - 8) {
        maxEvents += 8;
      } else {
        maxEvents = eventsList.childElementCount;
      }
      showEvents();
    }, 100);
  }, 1000);
}

eventsBox.addEventListener("scroll", () => {
  let scrollTop = eventsBox.scrollTop;
  let scrollHeight = eventsBox.scrollHeight;
  let clientHeight = eventsBox.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    if (maxEvents < eventsList.childElementCount) {
      showLoading();
    }
  }
});

let eventsInfoButtonsArr = [];
let eventsInfoArr = [];

async function clickEventInfoButton() {
  let res = await fetch("events.json");
  await res.json();
  let eventsInfoButtons = document.querySelectorAll(".open-info");
  for (x = 0; x < eventsList.childElementCount; x++) {
    eventsInfoButtons.forEach(() => {
      eventsInfoButtons.item(x).addEventListener("click", showEventsInfo);
      eventsInfoButtonsArr[x] = eventsInfoButtons.item(x);
    });
  }
}
clickEventInfoButton();

async function getEventsInfo() {
  let res = await fetch("events.json");
  await res.json();
  let eventsInfo = document.querySelectorAll(".event-info");
  for (x = 0; x < eventsList.childElementCount; x++) {
    eventsInfo.forEach(() => {
      eventsInfoArr[x] = eventsInfo.item(x);
    });
  }
}
getEventsInfo();

function showEventsInfo() {
  let eventInfo = event.target.parentElement;
  if (eventInfo.classList.contains("hide-info")) {
    eventInfo.classList.remove("hide-info");
  } else {
    eventInfo.classList.add("hide-info");
  }
}

//GAMES GENERAL
let gamePlayed;
let gamePlayed2;
let gameButtons = new Array(3);
let games = new Array(3);
let infoGames = new Array(3);
let gameBoxes = new Array(3);
let gameControls = new Array(3);
let showGameControls = new Array(3);
let gameover1 = document.getElementById("game-over1");
let gameover2 = document.getElementById("game-over2");
let gameover3 = document.getElementById("game-over3");
let gameOverArr = new Array(
  document.getElementById("game-over1"),
  document.getElementById("game-over2"),
  document.getElementById("game-over3")
);
let gameAgainYes = new Array(3);
let gameAgainNo = new Array(3);
let startGameScreens = new Array(3);
let startGameBtns = new Array(3);

function fillGameArrays() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x] = document.getElementById(`playGame${x + 1}`);
    games[x] = document.getElementById(`theGame${x + 1}`);
    infoGames[x] = document.getElementById(`game${x + 1}info`);
    gameBoxes[x] = document.getElementById(`game${x + 1}`);
    gameControls[x] = document.getElementById(`controls${x + 1}`);
    showGameControls[x] = document.getElementById(`show-controls${x + 1}`);
    startGameScreens[x] = document.getElementById(`start-game${x + 1}`);
    startGameBtns[x] = document.getElementById(`start-btn${x + 1}`);
  }
}
fillGameArrays();

function showStartGameScreen(x) {
  startGameScreens[x].classList.remove("hide-screen");
}

function hideStartGameScreen() {
  for (x = 0; x < startGameScreens.length; x++) {
    startGameScreens[x].classList.add("hide-screen");
  }
}

function addStartGameBtnEventListeners() {
  for (x = 0; x < startGameBtns.length; x++) {
    startGameBtns[x].addEventListener("click", clickStartGameBtn);
  }
}
addStartGameBtnEventListeners();

function clickStartGameBtn() {
  let startGameScreen = event.target.parentElement;
  let gameStartGameScreen = startGameScreen.parentElement.id;

  startGameScreen.classList.add("hide-screen");
  resetAllGames();

  switch (gameStartGameScreen) {
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

function addControlsBtnEventListeners() {
  for (x = 0; x < showGameControls.length; x++) {
    showGameControls[x].addEventListener("mouseenter", showTheGameControls);
    gameControls[x].addEventListener("mouseleave", showTheGameControls);
  }
}
addControlsBtnEventListeners();

function hideControlsBtn() {
  for (x = 0; x < gameControls.length; x++) {
    showGameControls[x].classList.add("hide-btn");
  }
}

function showControlsBtn(x) {
  showGameControls[x].classList.remove("hide-btn");
}

function showTheGameControls() {
  let x;
  switch (gamePlayed) {
    case "game1":
      x = 0;
      break;
    case "game2":
      x = 1;
      break;
    case "game3":
      x = 2;
      break;
  }
  gameControls[x].classList.contains("hide-controls")
    ? gameControls[x].classList.remove("hide-controls")
    : gameControls[x].classList.add("hide-controls");
}

function gameOverClose() {
  for (x = 0; x < gameOverArr.length; x++) {
    gameOverArr[x].classList.add("hide-screen");
  }
  hideStartGameScreen();
}

function gameOverAgain() {
  let gameOverScreen = event.target.parentElement;
  let gameOverGame = gameOverScreen.parentElement.id;

  gameOverScreen.classList.add("hide-screen");
  resetAllGames();

  switch (gameOverGame) {
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

function getGameAgainButtons() {
  let againYes = document.querySelectorAll(".play-yes");
  let againNo = document.querySelectorAll(".play-no");
  for (x = 0; x < gameAgainYes.length; x++) {
    againYes.forEach(() => {
      gameAgainYes[x] = againYes.item(x);
      againYes.item(x).addEventListener("click", gameOverAgain);
    });
  }
  for (x = 0; x < gameAgainNo.length; x++) {
    againNo.forEach(() => {
      gameAgainNo[x] = againNo.item(x);
      againNo.item(x).addEventListener("click", closeGames);
      againNo.item(x).addEventListener("click", gameOverClose);
      againNo.item(x).addEventListener("click", gameLightOff);
    });
  }
}
getGameAgainButtons();

function closeGames() {
  for (x = 0; x < games.length; x++) {
    games[x].classList.add("hide-game");
  }
  gameOverClose();
  startBtn();
  hideControlsBtn();
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
      showControlsBtn(0);
      showStartGameScreen(0);
      break;
    case "game2":
      game2Action();
      showControlsBtn(1);
      showStartGameScreen(1);
      break;
    case "game3":
      game3Action();
      showControlsBtn(2);
      showStartGameScreen(2);
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

function drawBackgroundStar(gameCanvas, objectX, objectY) {
  drawRoundObject(
    gameCanvas,
    "#DAA520",
    objectX,
    objectY,
    1,
    -100,
    Math.PI - 0.5,
    true
  );
}

function drawBackgroundStars(gameCanvas) {
  drawBackgroundStar(gameCanvas, 75, 62);
  drawBackgroundStar(gameCanvas, 35, 112);
  drawBackgroundStar(gameCanvas, 224, 59);
  drawBackgroundStar(gameCanvas, 285, 21);
  drawBackgroundStar(gameCanvas, 154, 39);
  drawBackgroundStar(gameCanvas, 80, 42);
  drawBackgroundStar(gameCanvas, 142, 14);
  drawBackgroundStar(gameCanvas, 250, 61);
  drawBackgroundStar(gameCanvas, 110, 90);
  drawBackgroundStar(gameCanvas, 28, 17);
  drawBackgroundStar(gameCanvas, 125, 46);
  drawBackgroundStar(gameCanvas, 180, 124);
  drawBackgroundStar(gameCanvas, 290, 76);
  drawBackgroundStar(gameCanvas, 155, 17);
  drawBackgroundStar(gameCanvas, 90, 75);
  drawBackgroundStar(gameCanvas, 142, 114);
  drawBackgroundStar(gameCanvas, 250, 99);
  drawBackgroundStar(gameCanvas, 180, 94);
  drawBackgroundStar(gameCanvas, 65, 94);
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

function drawBullets(gameCanvas, actionObject) {
  drawRoundObject(
    gameCanvas,
    "#808080",
    actionObject.x,
    actionObject.y - 10,
    actionObject.size,
    0,
    Math.PI * 2
  );
}

function drawComet(gameCanvas, drawingSubject) {
  drawRoundObject(
    gameCanvas,
    "#D2691E",
    drawingSubject.x,
    drawingSubject.y,
    drawingSubject.size,
    0,
    Math.PI * 2
  );
  drawRoundObject(
    gameCanvas,
    "#8B4513",
    drawingSubject.x - 4,
    drawingSubject.y - 4,
    drawingSubject.size * 0.2,
    0,
    Math.PI * 2
  );
  drawRoundObject(
    gameCanvas,
    "#8B4513",
    drawingSubject.x + 3,
    drawingSubject.y + 3,
    drawingSubject.size * 0.3,
    0,
    Math.PI * 2
  );
  drawRoundObject(
    gameCanvas,
    "#8B4513",
    drawingSubject.x - 2,
    drawingSubject.y - 2,
    drawingSubject.size * 0.2,
    0,
    Math.PI * 2
  );
}

function drawStar(gameCanvas, drawingSubject) {
  gameCanvas.save();
  gameCanvas.beginPath();
  gameCanvas.translate(drawingSubject.x, drawingSubject.y);
  gameCanvas.moveTo(0, 0 - drawingSubject.r);
  for (let x = 0; x < drawingSubject.n; x++) {
    gameCanvas.rotate(Math.PI / drawingSubject.n);
    gameCanvas.lineTo(0, 0 - drawingSubject.r * drawingSubject.inset);
    gameCanvas.rotate(Math.PI / drawingSubject.n);
    gameCanvas.lineTo(0, 0 - drawingSubject.r);
  }
  gameCanvas.fillStyle = "#FFD700";
  gameCanvas.fill();
  gameCanvas.closePath();
  gameCanvas.restore();
}

function drawHeart(gameCanvas, drawingSubject) {
  gameCanvas.save();
  gameCanvas.beginPath();
  gameCanvas.translate(drawingSubject.x, drawingSubject.y);
  gameCanvas.moveTo(7, 6);
  gameCanvas.bezierCurveTo(7, 3, 7, 2, 5, 2);
  gameCanvas.bezierCurveTo(2, 2, 2, 6, 2, 6);
  gameCanvas.bezierCurveTo(2, 8, 4, 10, 7, 12);
  gameCanvas.bezierCurveTo(11, 10, 13, 8, 13, 6);
  gameCanvas.bezierCurveTo(13, 6, 13, 2, 10, 2);
  gameCanvas.bezierCurveTo(8, 2, 7, 3, 7, 4);
  gameCanvas.fillStyle = "#FF0000";
  gameCanvas.fill();
  gameCanvas.closePath();
  gameCanvas.restore();
}

function drawScore(gameCanvas, canvasName, gameScore) {
  gameCanvas.fillStyle = "#FF0000";
  gameCanvas.fillText(`Score: ${gameScore}`, canvasName.width - 55, 10);
}

function emptyCanvas(gameCanvas, canvasName) {
  gameCanvas.clearRect(0, 0, canvasName.width, canvasName.height);
}

//GAME CONTROLS
let objectSpeedUp = 1;
let movement = "passive";

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
    if (gamePlayed == "game3") {
      objectSpeedUp = 1.2;
    }
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    controlledObject.dx = -controlledObject.speed;
    if (gamePlayed == "game3") {
      objectSpeedUp = 0.5;
    }
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    controlledObject.dy = -2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 1.4;
    }
  }
  if (e.key === "Down" || e.key === "ArrowDown") {
    controlledObject.dy = 2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 0.5;
    }
  }
  if (e.key === "f" && gamePlayed == "game2") {
    lukeShootBullet();
    // lukeMoveBulletsArray();
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
    objectSpeedUp = 1;
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    controlledObject.dy = 0;
    objectSpeedUp = 1;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//GAME OBJECT FUNCTIONS

function moveLuke(lukeNr, maxHeight, minHeight, maxWidth, minWidth) {
  lukeNr.x += lukeNr.dx * lukeNr.speed;
  lukeNr.y += lukeNr.dy * (lukeNr.speed / 2);

  if (lukeNr.x > maxWidth) {
    lukeNr.x = maxWidth;
  }

  if (lukeNr.x < minWidth) {
    lukeNr.x = minWidth;
  }
  if (lukeNr.y > maxHeight) {
    lukeNr.y = maxHeight;
  }

  if (lukeNr.y < minHeight) {
    lukeNr.y = minHeight;
  }
}

function resetLuke(lukeNr, canvasName, marginX, marginY) {
  (lukeNr.x = canvasName.width / 2 - marginX),
    (lukeNr.y = canvasName.height / 2 - marginY),
    (lukeNr.speed = 2);
}

function lukeMoveBullet(
  actionObject,
  actionSubject,
  canvasName,
  direction,
  marginX,
  marginY,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight
) {
  if (movement == "active") {
    actionObject.y += -actionObject.speed;
    actionObject.x += actionObject.dx;

    if (
      actionObject.y + actionObject.size > canvasName.height ||
      actionObject.y - actionObject.size < 0
    ) {
      returnBullet(actionObject, actionSubject, direction, marginX, marginY);
    }
  } else if (movement == "passive") {
    actionObject.y += actionSubject.dy * (actionSubject.speed / 2);
    actionObject.x += actionSubject.dx * actionSubject.speed;

    if (actionObject.x > maxWidth) {
      actionObject.x = maxWidth;
    }

    if (actionObject.x < minWidth) {
      actionObject.x = minWidth;
    }

    if (actionObject.y > maxHeight) {
      actionObject.y = maxHeight;
    }

    if (actionObject.y < minHeight) {
      actionObject.y = minHeight;
    }
  }
}

function lukeShootBullet() {
  movement = "active";
}

function returnBullet(
  actionObject,
  actionSubject,
  direction,
  marginX,
  marginY
) {
  (actionObject.x = actionSubject.x + marginX),
    (actionObject.y = actionSubject.y + marginY),
    actionObject.dx * direction;
  movement = "passive";
}

function resetBullet(
  actionObject,
  actionSubject,
  directionX,
  directionY,
  marginX,
  marginY
) {
  (actionObject.x = actionSubject.x + marginX),
    (actionObject.y = actionSubject.y + marginY),
    (actionObject.dx = directionX),
    (actionObject.dy = directionY);
  movement = "passive";
}

function moveBullet(
  actionObject,
  actionSubject,
  canvasName,
  gameNr,
  gameScore,
  accelerationX,
  accelerationY,
  direction,
  marginX,
  marginY
) {
  actionObject.x += actionObject.dx;
  actionObject.y += actionObject.dy;

  if (
    actionObject.x + actionObject.size > canvasName.width ||
    actionObject.x - actionObject.size < 0
  ) {
    actionObject.dx *= -1;
  }
  if (
    actionObject.y + actionObject.size > canvasName.height ||
    actionObject.y - actionObject.size < 0
  ) {
    returnBullet(actionObject, actionSubject, direction, marginX, marginY);
    scorePoints(gameNr);
    speedUp(gameScore, actionObject, accelerationX, accelerationY);
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

function resetCowboyEnemy(enemyObject, canvasName, objectX, direction) {
  (enemyObject.x = objectX),
    (enemyObject.y = canvasName.height - 5),
    (enemyObject.dx = 2 * direction);
}

function moveStar(
  actionObject,
  lukeNr,
  canvasName,
  gameNr,
  marginX,
  marginY,
  gameScore,
  speedingSubject,
  accelerationX,
  accelerationY
) {
  actionObject.x += actionObject.dx * (actionObject.speed * objectSpeedUp);
  actionObject.y += actionObject.dy * (actionObject.speed * objectSpeedUp);

  if (gamePlayed == "game2") {
    if (actionObject.y < -100 || actionObject.y > canvasName.height) {
      returnStar(actionObject, canvasName, gameNr, marginX, marginY);
    }
  } else if (gamePlayed == "game3") {
    if (actionObject.x > canvasName.width + 200 || actionObject.x < -20) {
      returnStar(actionObject, canvasName, gameNr, marginX, marginY);
    }
  }
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    if (
      actionObject.x - actionObject.size > lukeNr.x - 20 &&
      actionObject.x + actionObject.size < lukeNr.x + 20 &&
      actionObject.y > lukeNr.y - 16 &&
      actionObject.y < lukeNr.y + 10
    ) {
      returnStar(actionObject, canvasName, gameNr, marginX, marginY);
      scorePoints(gameNr);
      speedUp(gameScore, speedingSubject, accelerationX, accelerationY);
    }
  }
}

function resetStar(actionObject, canvasName, gameNr, marginX, marginY) {
  if (gameNr == 2) {
    (actionObject.x = canvasName.width * marginX), (actionObject.y = marginY);
    actionObject.dx = 0;
    actionObject.dy = 1;
    actionObject.speed = 1;
  } else if (gameNr == 3) {
    (actionObject.x = canvasName.width + marginX),
      (actionObject.y = canvasName.height * marginY);
    actionObject.dx = -2;
    actionObject.dy = 0;
    actionObject.speed = 1;
  }
}

function returnStar(actionObject, canvasName, gameNr, marginX, marginY) {
  if (gameNr == 2) {
    (actionObject.x = canvasName.width * marginX), (actionObject.y = -10);
    (actionObject.dx = 0), (actionObject.dy = 1);
  } else if (gameNr == 3) {
    (actionObject.x = canvasName.width + marginX),
      (actionObject.y = canvasName.height * marginY);
  }
}

function moveHeart(actionObject, lukeNr, canvasName, marginX, marginY) {
  actionObject.x += actionObject.dx * (actionObject.speed * objectSpeedUp);
  actionObject.y += actionObject.dy * (actionObject.speed * objectSpeedUp);

  if (actionObject.y < -100 || actionObject.y > canvasName.height) {
    returnHeart(actionObject, canvasName);
  }
  if (
    actionObject.x > lukeNr.x - 20 &&
    actionObject.x < lukeNr.x + 20 &&
    actionObject.y > lukeNr.y - 16 &&
    actionObject.y < lukeNr.y + 10
  ) {
    resetHeart(actionObject, marginX, marginY);
  }
}

function loseHeart(
  enemyObject,
  lukeNr,
  canvasName,
  gameNr,
  marginX,
  direction,
  randomY
) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    if (
      enemyObject.x - enemyObject.size > lukeNr.x - 20 &&
      enemyObject.x + enemyObject.size < lukeNr.x + 20 &&
      enemyObject.y > lukeNr.y - 16 &&
      enemyObject.y < lukeNr.y + 10
    ) {
      if (heartNr == undefined) {
        heartNr = heart1;
        randomX3 = Math.random() * 0.8 + 0.1;
        returnHeart(heartNr, canvasName);
        returnAlienEnemy(
          enemyObject,
          canvasName,
          gameNr,
          marginX,
          direction,
          randomY
        );
      } else if (heartNr == heart1) {
        heartNr = heart2;
        randomX3 = Math.random() * 0.8 + 0.1;
        returnHeart(heartNr, canvasName);
        returnAlienEnemy(
          enemyObject,
          canvasName,
          gameNr,
          marginX,
          direction,
          randomY
        );
      } else if (heartNr == heart2) {
        heartNr = heart3;
        returnHeart(heartNr, canvasName);
        gameOver(enemyObject, lukeNr, gameNr);
      }
    }
  }
}

function resetHeart(actionObject, marginX, marginY) {
  (actionObject.x = marginX), (actionObject.y = marginY);
  actionObject.dx = 0;
  actionObject.dy = 0;
  actionObject.speed = 1;

  if (heartNr == heart2) {
    heartNr = heart1;
  } else if (heartNr == heart1) {
    heartNr = undefined;
  }
}

function returnHeart(actionObject, canvasName) {
  (actionObject.x = canvasName.width * randomX3), (actionObject.y = -15);
  actionObject.dx = 0;
  actionObject.dy = 0;
  actionObject.speed = 1;
}

function moveAlienEnemy(
  enemyObject,
  canvasName,
  gameNr,
  gameScore,
  speedingSubject,
  accelerationX,
  accelerationY,
  marginX,
  randomY,
  direction
) {
  enemyObject.x += enemyObject.dx * (enemyObject.speed * objectSpeedUp);
  enemyObject.y += enemyObject.dy * (enemyObject.speed * objectSpeedUp);

  if (enemyObject.x + 10 > canvasName.width || enemyObject.x - 10 < 0) {
    enemyObject.dx *= -1;
  }
  if (enemyObject.y < -100 || enemyObject.y > canvasName.height) {
    randomX1 = Math.random() * 0.7 + 0.2;
    randomX2 = Math.random() * 0.7 + 0.2;
    returnAlienEnemy(
      enemyObject,
      canvasName,
      gameNr,
      marginX,
      direction,
      randomY
    );
    speedUp(gameScore, speedingSubject, accelerationX, accelerationY);
  }
}

function killEnemy(
  actionObject,
  enemyObject,
  gameNr,
  canvasName,
  marginX,
  randomY,
  direction,
  gameScore,
  speedingSubject,
  accelerationX,
  accelerationY
) {
  if (movement == "active") {
    if (
      actionObject.x > enemyObject.x - 20 &&
      actionObject.x < enemyObject.x + 20 &&
      actionObject.y > enemyObject.y - 3 &&
      actionObject.y < enemyObject.y + 6
    ) {
      returnAlienEnemy(
        enemyObject,
        canvasName,
        gameNr,
        marginX,
        direction,
        randomY
      );
      scorePoints(gameNr);
      speedUp(gameScore, speedingSubject, accelerationX, accelerationY);
    }
  }
}

function resetAlienEnemy(
  enemyObject,
  canvasName,
  gameNr,
  marginX,
  marginY,
  alienSpeed,
  direction,
  randomY
) {
  if (gameNr == 2) {
    (enemyObject.x = canvasName.width * marginX), (enemyObject.y = marginY);
    enemyObject.dx = 1 * direction;
    enemyObject.dy = 1;
    enemyObject.speed = 1;
  } else if (gameNr == 3) {
    (enemyObject.x = canvasName.width + marginX),
      (enemyObject.y = canvasName.height * randomY);
    enemyObject.dx = -4;
    enemyObject.dy = -1;
    enemyObject.speed = alienSpeed;
  }
}

function returnAlienEnemy(
  enemyObject,
  canvasName,
  gameNr,
  marginX,
  direction,
  randomY
) {
  if (gameNr == 2) {
    (enemyObject.x = canvasName.width * marginX), (enemyObject.y = -10);
    enemyObject.dx *= direction;
  } else if (gameNr == 3) {
    (enemyObject.x = canvasName.width + marginX),
      (enemyObject.y = canvasName.height * randomY);
  }
}

function moveAlienEnemy2(
  enemyObject,
  canvasName,
  gameNr,
  marginX,
  direction,
  randomY
) {
  enemyObject.x += enemyObject.dx * (enemyObject.speed * objectSpeedUp);
  enemyObject.y += enemyObject.dy * (enemyObject.speed * objectSpeedUp);

  if (enemyObject.x > canvasName.width + 200 || enemyObject.x < -20) {
    randomY1 = Math.random() * 0.2 + 0.2;
    randomY2 = Math.random() * 0.2 + 0.4;
    randomY3 = Math.random() * 0.2 + 0.6;
    returnAlienEnemy(
      enemyObject,
      canvasName,
      gameNr,
      marginX,
      direction,
      randomY
    );
  }
  if (
    enemyObject.y < canvasName.height * randomY - 20 ||
    enemyObject.y > canvasName.height * randomY + 20
  ) {
    enemyObject.dy *= -1;
  }
}

function moveComet(enemyObject, canvasName, marginX, marginY) {
  enemyObject.x += enemyObject.dx * (enemyObject.speed * objectSpeedUp);
  enemyObject.y += enemyObject.dy * (enemyObject.speed * objectSpeedUp);

  if (enemyObject.x > canvasName.width + 200 || enemyObject.x < -20) {
    returnComet(enemyObject, canvasName, marginX, marginY);
  }
}

function resetComet(enemyObject, canvasName, marginX, marginY) {
  (enemyObject.x = canvasName.width + marginX),
    (enemyObject.y = canvasName.height * marginY);
  enemyObject.dx = -2.5;
  enemyObject.dy = 0;
}

function returnComet(enemyObject, canvasName, marginX, marginY) {
  (enemyObject.x = canvasName.width + marginX),
    (enemyObject.y = canvasName.height * marginY);
}

//GAME FUNCTIONS

function scorePoints(gameNr) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
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
}

function speedUp(gameScore, speedingSubject, accelerationX, accelerationY) {
  var testScore = /^[1-9]{1}[5]{1,2}$/;
  let x;
  if (gameScore == 10) {
    x = "enemy";
  } else if (testScore.test(gameScore)) {
    x = "speed";
  } else {
    x = "none";
  }

  if (x == "speed") {
    speedingSubject.dx = speedingSubject.dx * accelerationX;
    speedingSubject.dy = speedingSubject.dy * accelerationY;

    if ((gamePlayed == "game2") & (heartNr != undefined)) {
      heartNr.dy = 1;
    }
  }

  if ((gamePlayed == "game1") & (x == "enemy")) {
    cowboy2.x = cowboy1.x;
    cowboy2.dx = cowboy1.dx * -1.2;
    bullet2.dx = bullet1.dx * -1;
    bullet2.dy = -2.5;
  }

  if (x == "none") {
    if ((gamePlayed == "game2") & (heartNr != undefined)) {
      heartNr.dy = 0;
    }
  }
}

function gameOver(enemyObject, lukeNr, gameNr) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    if (
      enemyObject.x - enemyObject.size > lukeNr.x - 20 &&
      enemyObject.x + enemyObject.size < lukeNr.x + 20 &&
      enemyObject.y > lukeNr.y - 16 &&
      enemyObject.y < lukeNr.y + 10
    ) {
      pauseGame(gamePlayed);

      if (gamePlayed == "game1") {
        gameover1.classList.remove("hide-screen");
      }

      if (gamePlayed == "game2") {
        randomX3 = Math.random() * 0.8 + 0.1;
        heartNr = undefined;
        gameover2.classList.remove("hide-screen");
      }

      if (gamePlayed == "game3") {
        randomY1 = Math.random() * 0.2 + 0.2;
        randomY2 = Math.random() * 0.2 + 0.4;
        randomY3 = Math.random() * 0.2 + 0.6;
        gameover3.classList.remove("hide-screen");
      }
    }
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

function pauseGame(gamePlayed) {
  if (gamePlayed == "game1") {
    bullet1.dx = 0;
    bullet1.dy = 0;
    bullet2.dx = 0;
    bullet2.dy = 0;
    cowboy1.dx = 0;
    cowboy2.dx = 0;
    luke1.speed = 0;
  }
  if (gamePlayed == "game2") {
    star1.dy = 0;
    heartNr.dy = 0;
    evilAlien1.dx = 0;
    evilAlien1.dy = 0;
    evilAlien2.dx = 0;
    evilAlien2.dy = 0;
    evilAlien3.dx = 0;
    evilAlien3.dy = 0;
    evilAlien4.dx = 0;
    evilAlien4.dy = 0;
    luke2.speed = 0;
  }
  if (gamePlayed == "game3") {
    comet1.dx = 0;
    comet2.dx = 0;
    star2.dx = 0;
    alienEnemy1.dx = 0;
    alienEnemy1.dy = 0;
    alienEnemy2.dx = 0;
    alienEnemy2.dy = 0;
    alienEnemy3.dx = 0;
    alienEnemy3.dy = 0;
    luke3.speed = 0;
  }
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
  speed: 2,
  dx: 0,
  dy: 0,
};

const bullet1 = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 2,
  speed: 2,
  dx: 1.5,
  dy: -2.5,
};

const bullet2 = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 2,
  speed: 2,
  dx: 1.5,
  dy: -2.5,
};

const cowboy1 = {
  x: canvas1.width / 2,
  y: canvas1.height,
  size: 6,
  dx: 2,
};

const cowboy2 = {
  x: canvas1.width,
  y: canvas1.height,
  size: 6,
  dx: -2,
};

function drawEarth() {
  drawRectObject(ctx1, "#003b00", earth.x, earth.y, earth.w, earth.h);
}

function drawGameElements1() {
  emptyCanvas(ctx1, canvas1);
  drawBackgroundStars(ctx1);
  drawEarth();
  drawCowboyEnemy(ctx1, cowboy1);
  drawCowboyEnemy(ctx1, cowboy2);
  drawLuke(ctx1, luke1);
  drawBullets(ctx1, bullet1);
  drawBullets(ctx1, bullet2);
  drawScore(ctx1, canvas1, score1);
}

function game1Action() {
  drawGameElements1();
  moveLuke(luke1, 100, 10, 280, 20);
  moveCowboyEnemy(cowboy1, canvas1);
  moveCowboyEnemy(cowboy2, canvas1);
  moveBullet(bullet1, cowboy1, canvas1, 1, score1, 1, 1, -1, 0, 0);
  moveBullet(bullet2, cowboy2, canvas1, 1, score1, 1, 1, 1, 0, 0);
  gameOver(bullet1, luke1, 1);
  gameOver(bullet2, luke1, 1);
  requestIdGame1 = requestAnimationFrame(game1Action);
}

function resetGame1() {
  emptyCanvas(ctx1, canvas1);
  resetCowboyEnemy(cowboy1, canvas1, 150, 1);
  resetCowboyEnemy(cowboy2, canvas1, -15, -1);
  resetBullet(bullet1, cowboy1, 1.5, -2.5, 0, 0);
  resetBullet(bullet2, cowboy2, 0, 0, 0, 0);
  resetLuke(luke1, canvas1, 0, 50);
  resetScore(1);
  cancelAnimationFrame(requestIdGame1);
}

//GAME 2
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;
let randomX1 = Math.random() * 0.7 + 0.2;
let randomX2 = Math.random() * 0.7 + 0.2;
let randomX3 = Math.random() * 0.8 + 0.1;
let heartNr;

const luke2 = {
  x: canvas2.width / 2,
  y: canvas2.height - 20,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 2,
  dx: 0,
  dy: 0,
};

const bulletLuke = {
  x: luke2.x,
  y: luke2.y,
  size: 2,
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
  speed: 1,
  dx: 1,
  dy: 1,
};

const evilAlien2 = {
  x: 100,
  y: -10,
  w: 60,
  h: 4,
  size: 3,
  speed: 1,
  dx: -1,
  dy: 1,
};

const evilAlien3 = {
  x: 200,
  y: -10,
  w: 60,
  h: 4,
  size: 3,
  speed: 1,
  dx: 2,
  dy: 1,
};

const evilAlien4 = {
  x: 100,
  y: -10,
  w: 60,
  h: 4,
  size: 3,
  speed: 1,
  dx: -2,
  dy: 1,
};

const star1 = {
  x: canvas2.width * (Math.random() * 0.8 + 0.1),
  y: -15,
  r: 6,
  n: 5,
  inset: -1,
  size: 3,
  speed: 1,
  dx: 0,
  dy: 2,
};

const heart1 = {
  x: canvas2.width - 60,
  y: 10,
  d: Math.min(9, 9),
  k: 8,
  dx: 0,
  dy: 0,
};

const heart2 = {
  x: canvas2.width - 45,
  y: 10,
  d: Math.min(9, 9),
  k: 8,
  dx: 0,
  dy: 0,
};

const heart3 = {
  x: canvas2.width - 30,
  y: 10,
  d: Math.min(9, 9),
  k: 8,
  dx: 0,
  dy: 0,
};

// function multipleBullets(actionSubject) {
//   this.x = actionSubject.x;
//   this.y = actionSubject.y;
//   this.dx = 0;
//   this.dy = 0;
//   this.radius = 2;
//   this.color = "#808080";
//   this.speed = 5;
//   this.size = 2;

//   this.draw = function (gameCanvas) {
//     gameCanvas.beginPath();
//     gameCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
//     gameCanvas.fillStyle = this.color;
//     gameCanvas.fill();
//     gameCanvas.closePath();
//   };
// }

// let bulletsArray = [];

// function fillBulletsArray(actionSubject, gameCanvas) {
//   for (var i = 0; i < 5; i++) {
//     bulletsArray[i] = new multipleBullets(actionSubject);
//     bulletsArray[i].draw(gameCanvas);
//   }
// }

// function shootBulletsArray() {
//   movement = "active";
// }

// function lukeMoveBulletsArray(
//   actionSubject,
//   canvasName,
//   direction,
//   marginX,
//   marginY,
//   maxWidth,
//   minWidth,
//   maxHeight,
//   minHeight
// ) {
//   for (var i = 0; i < 5; i++) {
//     if (movement == "active") {
//       bulletsArray[i].y += -bulletsArray[i].speed;
//       bulletsArray[i].x += bulletsArray[i].dx;

//       if (
//         bulletsArray[i].y + bulletsArray[i].size > canvasName.height ||
//         bulletsArray[i].y - bulletsArray[i].size < 0
//       ) {
//         returnBulletsArray(actionSubject, direction, marginX, marginY);
//       }
//     } else if (movement == "passive") {
//       bulletsArray[i].y += actionSubject.dy * (actionSubject.speed / 2);
//       bulletsArray[i].x += actionSubject.dx * actionSubject.speed;

//       if (bulletsArray[i].x > maxWidth) {
//         bulletsArray[i].x = maxWidth;
//       }

//       if (bulletsArray[i].x < minWidth) {
//         bulletsArray[i].x = minWidth;
//       }

//       if (bulletsArray[i].y > maxHeight) {
//         bulletsArray[i].y = maxHeight;
//       }

//       if (bulletsArray[i].y < minHeight) {
//         bulletsArray[i].y = minHeight;
//       }
//     }
//   }
// }

// function returnBulletsArray(actionSubject, direction, marginX, marginY) {
//   for (var i = 0; i < 5; i++) {
//     (bulletsArray[i].x = actionSubject.x + marginX),
//       (bulletsArray[i].y = actionSubject.y + marginY),
//       bulletsArray[i].dx * direction;
//     movement = "passive";
//   }
// }

// function resetBulletsArray(
//   actionSubject,
//   directionX,
//   directionY,
//   marginX,
//   marginY
// ) {
//   for (var i = 0; i < 5; i++) {
//     (bulletsArray[i].x = actionSubject.x + marginX),
//       (bulletsArray[i].y = actionSubject.y + marginY),
//       (bulletsArray[i].dx = directionX),
//       (bulletsArray[i].dy = directionY);
//     movement = "passive";
//   }
// }

function drawGame2Elements() {
  emptyCanvas(ctx2, canvas2);
  drawBackgroundStars(ctx2);
  drawBullets(ctx2, bulletLuke);
  drawLuke(ctx2, luke2);
  drawStar(ctx2, star1);
  drawHeart(ctx2, heart1);
  drawHeart(ctx2, heart2);
  drawHeart(ctx2, heart3);
  drawAlienEnemy(ctx2, evilAlien1);
  drawAlienEnemy(ctx2, evilAlien2);
  drawAlienEnemy(ctx2, evilAlien3);
  drawAlienEnemy(ctx2, evilAlien4);
  drawScore(ctx2, canvas2, score2);
  // fillBulletsArray(luke2, ctx2);
}

function game2Action() {
  drawGame2Elements();
  // lukeMoveBulletsArray(luke2, canvas2, 0, 0, 10, 280, 20, 150, 70);
  moveLuke(luke2, 140, 60, 280, 20);
  lukeMoveBullet(bulletLuke, luke2, canvas2, 0, 0, 10, 280, 20, 150, 70);
  moveHeart(heart1, luke2, canvas2, 240, 10);
  moveHeart(heart2, luke2, canvas2, 255, 10);
  moveStar(
    star1,
    luke2,
    canvas2,
    2,
    Math.random() * 0.8 + 0.1,
    -10,
    score2,
    star1,
    1,
    1.2
  );
  moveAlienEnemy(
    evilAlien1,
    canvas2,
    2,
    score2,
    evilAlien1,
    1,
    1,
    randomX1,
    0,
    -1
  );
  moveAlienEnemy(
    evilAlien2,
    canvas2,
    2,
    score2,
    evilAlien2,
    1,
    1,
    randomX2,
    0,
    -1
  );
  killEnemy(
    bulletLuke,
    evilAlien1,
    2,
    canvas2,
    Math.random() * 0.3 + 0.2,
    0,
    -1,
    score2,
    evilAlien1,
    1.2,
    1.2
  );
  killEnemy(
    bulletLuke,
    evilAlien2,
    2,
    canvas2,
    Math.random() * 0.3 + 0.5,
    0,
    1,
    score2,
    evilAlien2,
    1.2,
    1.2
  );
  loseHeart(evilAlien1, luke2, canvas2, 2, randomX1, -1, 0);
  loseHeart(evilAlien2, luke2, canvas2, 2, randomX2, -1, 0);
  moveAlienEnemy(
    evilAlien3,
    canvas2,
    2,
    score2,
    evilAlien3,
    1,
    1,
    randomX1,
    0,
    -1
  );
  moveAlienEnemy(
    evilAlien4,
    canvas2,
    2,
    score2,
    evilAlien4,
    1,
    1,
    randomX2,
    0,
    -1
  );
  killEnemy(
    bulletLuke,
    evilAlien3,
    2,
    canvas2,
    Math.random() * 0.3 + 0.2,
    0,
    -1,
    score2,
    evilAlien3,
    1.2,
    1.2
  );
  killEnemy(
    bulletLuke,
    evilAlien4,
    2,
    canvas2,
    Math.random() * 0.3 + 0.5,
    0,
    1,
    score2,
    evilAlien4,
    1.2,
    1.2
  );
  loseHeart(evilAlien3, luke2, canvas2, 2, randomX1, -1, 0);
  loseHeart(evilAlien4, luke2, canvas2, 2, randomX2, -1, 0);
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas(ctx2, canvas2);
  resetAlienEnemy(evilAlien1, canvas2, 2, randomX1, -10, 1, -1, 0);
  resetAlienEnemy(evilAlien2, canvas2, 2, randomX2, -75, 1, -1, 0);
  resetAlienEnemy(evilAlien3, canvas2, 2, randomX1, -10, 1, -2, 0);
  resetAlienEnemy(evilAlien4, canvas2, 2, randomX2, -75, 1, 2, 0);
  resetLuke(luke2, canvas2, 0, -35);
  // resetBulletsArray(luke2, 0, 0, 0, 10);
  resetBullet(bulletLuke, luke2, 0, 0, 0, 10);
  resetHeart(heart1, 240, 10);
  resetHeart(heart2, 255, 10);
  resetHeart(heart3, 270, 10);
  resetStar(star1, canvas2, 2, Math.random() * 0.8 + 0.1, -10);
  resetScore(2);
  cancelAnimationFrame(requestIdGame2);
  objectSpeedUp = 1;
  randomX1 = Math.random() * 0.3 + 0.2;
  randomX2 = Math.random() * 0.3 + 0.5;
}

//GAME 3
const canvas3 = document.getElementById("theGame3");
const ctx3 = canvas3.getContext("2d");
let score3 = 0;
let requestIdGame3;
let randomY1 = Math.random() * 0.2 + 0.2;
let randomY2 = Math.random() * 0.2 + 0.4;
let randomY3 = Math.random() * 0.2 + 0.6;

const luke3 = {
  x: 30,
  y: canvas3.height / 2,
  w: 60,
  h: 4,
  size: 4.5,
  speed: 2,
  dx: 0,
  dy: 0,
};

const star2 = {
  x: canvas3.width + 10,
  y: canvas3.height * (Math.random() * 0.8 + 0.1),
  r: 6,
  n: 5,
  inset: -1,
  size: 3,
  speed: 1,
  dx: -2,
  dy: 0,
};

let alienEnemy1 = {
  x: canvas3.width + 10,
  y: randomY1,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.2,
  dx: -2.5,
  dy: 1.5,
};

let alienEnemy2 = {
  x: canvas3.width + 10,
  y: randomY2,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.2,
  dx: -2.5,
  dy: 1.5,
};

let alienEnemy3 = {
  x: canvas3.width + 10,
  y: randomY3,
  w: 60,
  h: 4,
  size: 3,
  speed: 1.2,
  dx: -2.5,
  dy: 1.5,
};

let comet1 = {
  x: canvas3.width - 100,
  y: canvas3.height * 0.3,
  w: 20,
  h: 10,
  size: 9,
  speed: 1.2,
  dx: -2.5,
  dy: 0,
};

let comet2 = {
  x: canvas3.width + 60,
  y: canvas3.height * 0.7,
  w: 20,
  h: 10,
  size: 9,
  speed: 1.2,
  dx: -2.5,
  dy: 0,
};

function drawGame3Elements() {
  emptyCanvas(ctx3, canvas3);
  drawBackgroundStars(ctx3);
  drawLuke(ctx3, luke3);
  drawStar(ctx3, star2);
  drawComet(ctx3, comet1);
  drawComet(ctx3, comet2);
  drawAlienEnemy(ctx3, alienEnemy1);
  drawAlienEnemy(ctx3, alienEnemy2);
  drawAlienEnemy(ctx3, alienEnemy3);
  drawScore(ctx3, canvas3, score3);
}

function game3Action() {
  drawGame3Elements();
  moveLuke(luke3, 140, 10, 160, 20);
  moveStar(
    star2,
    luke3,
    canvas3,
    3,
    -10,
    Math.random() * 0.8 + 0.1,
    score3,
    star2,
    1.2,
    1
  );
  moveComet(comet1, canvas3, 15, Math.random() * 0.4 + 0.1);
  moveComet(comet2, canvas3, 15, Math.random() * 0.4 + 0.5);
  moveAlienEnemy2(alienEnemy1, canvas3, 3, 15, 1, randomY1);
  moveAlienEnemy2(alienEnemy2, canvas3, 3, 15, 1, randomY2);
  moveAlienEnemy2(alienEnemy3, canvas3, 3, 15, 1, randomY3);
  gameOver(alienEnemy1, luke3, 3);
  gameOver(alienEnemy2, luke3, 3);
  gameOver(alienEnemy3, luke3, 3);
  gameOver(comet1, luke3, 3);
  gameOver(comet2, luke3, 3);
  requestIdGame3 = requestAnimationFrame(game3Action);
}

function resetGame3() {
  emptyCanvas(ctx3, canvas3);
  resetLuke(luke3, canvas3, 50, 0);
  resetStar(star2, canvas3, 3, -35, Math.random() * 0.8 + 0.1);
  resetComet(comet1, canvas3, 15, 0.3);
  resetComet(comet2, canvas3, 185, 0.7);
  resetAlienEnemy(alienEnemy1, canvas3, 3, 65, 0.15, 0.6, 1, randomY1);
  resetAlienEnemy(alienEnemy2, canvas3, 3, 165, 0.5, 0.6, 1, randomY2);
  resetAlienEnemy(alienEnemy3, canvas3, 3, 15, 0.85, 0.6, 1, randomY3);
  resetScore(3);
  cancelAnimationFrame(requestIdGame3);
  objectSpeedUp = 1;
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

const hr2 = document.getElementById("hr2");

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    hr2.classList.remove("hide-ruler");
  } else {
    hr2.classList.add("hide-ruler");
  }
});
