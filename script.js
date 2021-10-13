// INTRO POP-UP
const introScreen = document.getElementById("intro-screen");
const introButton = document.getElementById("closeIntro");

function closeIntroPopUp() {
  introScreen.classList.add("hide-screen");
  enableScrollingIntro();
}

function disableScrollingIntro() {
  document.body.style.overflow = "hidden";
}

function enableScrollingIntro() {
  document.body.style.overflow = "";
}

introButton.addEventListener("click", closeIntroPopUp);

// HEADER ANIMATION
const animationBox = document.getElementById("animation-box");
let maxXstar = window.innerWidth - 100;

animationBox.innerHTML = `<canvas height="550" width = "${maxXstar}" class="head-animation" id="head-animation">
</canvas>
<canvas height="550" width = "${maxXstar}" class="alien-animation" id="alien-animation">
</canvas>`;

const headAnimationCanvas = document.getElementById("head-animation");
const alienAnimationCanvas = document.getElementById("alien-animation");
const ctxHeadAnimation = headAnimationCanvas.getContext("2d");
const ctxAlienAnimation = alienAnimationCanvas.getContext("2d");
let requestIdHeadAnimation;
let requestIdAlienAnimation;
let animationStarsArray = [];
let aliensArray3 = [];
let particles = [];
let maxStars = 150;
let pause = 90;
let start = 0;
let randomXstar;
let randomYstar;
let side = 0;
let marginX = -10;
let directionA = 1;
let AC;

class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  draw() {
    ctxAlienAnimation.save();
    ctxAlienAnimation.globalAlpha = this.alpha;
    ctxAlienAnimation.fillStyle = "red";
    ctxAlienAnimation.beginPath();
    ctxAlienAnimation.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxAlienAnimation.fill();
    ctxAlienAnimation.restore();
  }
  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
}

function setAnimationWidth() {
  maxXstar = window.innerWidth - 100;
  headAnimationCanvas.width = maxXstar;
  alienAnimationCanvas.width = maxXstar;
}

function multipleAliens3(canvasName) {
  this.x = maxXstar * side + marginX;
  this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
  this.dx = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
  this.dy = 0;
  this.size = 3;

  this.draw = function (gameCanvas) {
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x,
      this.y,
      this.size,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#FF0000",
      this.x - 1.5,
      this.y,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#FF0000",
      this.x + 1.5,
      this.y,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawEllipseObject(
      gameCanvas,
      "#FF0000",
      this.x,
      this.y + 4,
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
      this.x - 3,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x + 3,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x - 7,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x + 7,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x - 11,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
    drawRoundObject(
      gameCanvas,
      "#05db05",
      this.x + 11,
      this.y + 4.2,
      1,
      -100,
      Math.PI - 0.5,
      true
    );
  };

  this.reset = function (canvasName) {
    this.x = maxXstar * side + marginX;
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
  };
}

function fillAliensArray3(canvasName) {
  for (var i = 0; i < 3; i++) {
    aliensArray3[i] = new multipleAliens3(canvasName);
    if (side == 0) {
      side = 1;
      marginX = 10;
      directionA = -1;
    } else {
      side = 0;
      marginX = -10;
      directionA = 1;
    }
  }
}
fillAliensArray3(alienAnimationCanvas);

function drawAliensArray3(gameCanvas) {
  for (var i = 0; i < aliensArray3.length; i++) {
    aliensArray3[i].draw(gameCanvas);
  }
}

function moveAliensArray3(canvasName) {
  for (var i = 0; i < aliensArray3.length; i++) {
    aliensArray3[i].y += aliensArray3[i].dy;
    aliensArray3[i].x += aliensArray3[i].dx;

    if (aliensArray3[i].x > canvasName.width + 20 || aliensArray3[i].x < -20) {
      if (side == 0) {
        side = 1;
        marginX = 10;
        directionA = -1;
      } else {
        side = 0;
        marginX = -10;
        directionA = 1;
      }
      aliensArray3[i].reset(canvasName);
    }
  }
}

function resetAliensArray3(canvasName) {
  for (var i = 0; i < aliensArray3.length; i++) {
    if (side == 0) {
      side = 1;
      marginX = 10;
      directionA = -1;
    } else {
      side = 0;
      marginX = -10;
      directionA = 1;
    }
    aliensArray3[i].reset(canvasName);
  }
}

function alienCollision(AC, canvasName) {
  for (let AI = 0; AI < aliensArray3.length; AI++) {
    if (AC !== AI) {
      if (
        aliensArray3[AC].x > aliensArray3[AI].x - 10 &&
        aliensArray3[AC].x < aliensArray3[AI].x + 10 &&
        aliensArray3[AC].y > aliensArray3[AI].y - 10 &&
        aliensArray3[AC].y < aliensArray3[AI].y + 10
      ) {
        for (i = 0; i <= 150; i++) {
          let dx = (Math.random() - 0.5) * Math.random();
          let dy = (Math.random() - 0.5) * Math.random();
          let radius = Math.random() * 2;
          let particle = new Particle(
            aliensArray3[AC].x,
            aliensArray3[AC].y,
            radius,
            dx,
            dy
          );

          particles.push(particle);
        }
        aliensArray3[AI].dx = 0;
        aliensArray3[AC].dx = 0;
        explode();
        setTimeout(() => {
          aliensArray3[AC].reset(canvasName);
          aliensArray3[AI].reset(canvasName);
        }, 500);
      }
    }
  }
}

function explode() {
  particles.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else particle.update();
  });

  requestAnimationFrame(explode);
}

function animationStars() {
  this.x = randomXstar;
  this.y = randomYstar;
  this.radius = 1;
  this.color = "#3b2c00";

  this.draw = function (gameCanvas) {
    gameCanvas.beginPath();
    gameCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    gameCanvas.fillStyle = this.color;
    gameCanvas.fill();
    gameCanvas.closePath();
  };
}

function fillAnimationStarsArray(gameCanvas, maxStars) {
  for (var i = 0; i < 100; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 250 + 0;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
  for (var i = 100; i < 140; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 250;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
  for (var i = 140; i < maxStars; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 400;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
}

function drawHeadAnimation() {
  emptyCanvas(ctxHeadAnimation, headAnimationCanvas);
  fillAnimationStarsArray(ctxHeadAnimation, maxStars, animationStarsArray);
}

function headAnimationAction(current) {
  if (start === 0) {
    start = current;
  }

  if (current - start >= pause) {
    drawHeadAnimation();
    start = current;
  }
  requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);
}
requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);

function drawAlienAnimation() {
  emptyCanvas(ctxAlienAnimation, alienAnimationCanvas);
  drawAliensArray3(ctxAlienAnimation, alienAnimationCanvas);
}

function headAlienAction() {
  drawAlienAnimation();
  moveAliensArray3(alienAnimationCanvas);
  alienCollision(0, alienAnimationCanvas);
  alienCollision(1, alienAnimationCanvas);
  alienCollision(2, alienAnimationCanvas);
  requestIdAlienAnimation = requestAnimationFrame(headAlienAction);
}
headAlienAction();

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
const nextDrawing = document.getElementById("nextDrawing");
const previousDrawing = document.getElementById("previousDrawing");
let subjectDrawing;
let subjectDrawing2;
let animalDrawings = new Array(
  document.getElementById("animalsDrawings").childElementCount - 1
);
let plantDrawings = new Array(
  document.getElementById("plantsDrawings").childElementCount - 1
);
let instrumentDrawings = new Array(
  document.getElementById("instrumentsDrawings").childElementCount - 1
);
let foodDrawings = new Array(
  document.getElementById("foodsDrawings").childElementCount - 1
);
let toyDrawings = new Array(
  document.getElementById("toysDrawings").childElementCount - 1
);
let exclusiveDrawings = new Array(
  document.getElementById("exclusivesDrawings").childElementCount - 1
);
let DX;
let DS;

function fillDrawingsArrays() {
  for (x = 0; x < animalDrawings.length; x++) {
    animalDrawings[x] = document.getElementById(`animalDrawing${x + 1}`);
  }
  for (x = 0; x < plantDrawings.length; x++) {
    plantDrawings[x] = document.getElementById(`plantDrawing${x + 1}`);
  }
  for (x = 0; x < instrumentDrawings.length; x++) {
    instrumentDrawings[x] = document.getElementById(
      `instrumentDrawing${x + 1}`
    );
  }
  for (x = 0; x < foodDrawings.length; x++) {
    foodDrawings[x] = document.getElementById(`foodDrawing${x + 1}`);
  }
  for (x = 0; x < toyDrawings.length; x++) {
    toyDrawings[x] = document.getElementById(`toyDrawing${x + 1}`);
  }
  for (x = 0; x < exclusiveDrawings.length; x++) {
    exclusiveDrawings[x] = document.getElementById(`exclusiveDrawing${x + 1}`);
  }
}
fillDrawingsArrays();

function showFirstDrawing() {
  let drawingsSubject = event.target.parentElement.id.slice(0, -1);
  switch (drawingsSubject) {
    case "animal":
      DS = animalDrawings;
      break;
    case "plant":
      DS = plantDrawings;
      break;
    case "instrument":
      DS = instrumentDrawings;
      break;
    case "food":
      DS = foodDrawings;
      break;
    case "toy":
      DS = toyDrawings;
      break;
    case "exclusive":
      DS = exclusiveDrawings;
      break;
  }
  for (x = 0; x < DS.length; x++) DS[x].classList.add("hide-drawing");
  DX = 0;
  DS[DX].classList.remove("hide-drawing");
}

function showNextDrawing() {
  DS[DX].classList.add("hide-drawing");
  if (DX == DS.length - 1) {
    DX = 0;
  } else {
    DX++;
  }
  DS[DX].classList.remove("hide-drawing");
}

function showPreviousDrawing() {
  DS[DX].classList.add("hide-drawing");
  if (DX == 0) {
    DX = DS.length - 1;
  } else {
    DX--;
  }
  DS[DX].classList.remove("hide-drawing");
}

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
  showFirstDrawing();
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

nextDrawing.addEventListener("click", showNextDrawing);
previousDrawing.addEventListener("click", showPreviousDrawing);
closeDrawings.addEventListener("click", closeDrawingsBtn);

//HEAD LOGIN FORM/REGISTER FORM
const loginBox = document.getElementById("loginBox");
const loginForm = document.getElementById("loginForm");
const showLoginPass = document.getElementById("showLoginPass");
const loginContainer = document.getElementById("loginContainer");
const registrationBox = document.getElementById("registrationBox");
const registerForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPass = document.getElementById("showPass");
const showConfirm = document.getElementById("showConfirm");
const regContainer = document.getElementById("reg-container");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginUser = document.getElementById("loginUser");
const helpUser = document.getElementById("helpUser");

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

function showPassword(passwordType) {
  const type =
    passwordType.getAttribute("type") === "password" ? "text" : "password";
  passwordType.setAttribute("type", type);
}

showLoginPass.addEventListener("mouseenter", showPassword(loginPassword));
showLoginPass.addEventListener("mouseleave", showPassword(loginPassword));

//REGISTRATION FORM
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

registerForm.addEventListener("submit", function (registration) {
  registration.preventDefault();

  if (!checkRequired([username, email, password, confirmPassword])) {
    checkLength(username, 5, 15);
    checkLength(password, 6, 25);
    isValidEmail(email);
    checkPasswordsMatch(password, confirmPassword);
  }
});

showPass.addEventListener("mouseover", showPassword(password));
showPass.addEventListener("mouseleave", showPassword(password));
showConfirm.addEventListener("mouseover", showPassword(confirmPassword));
showConfirm.addEventListener("mouseleave", showPassword(confirmPassword));

document
  .getElementById("openReg")
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
let eventsInfoButtonsArr = [];
let eventsInfoArr = [];

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
      againNo.item(x).addEventListener("click", gameLightOff);
      againNo.item(x).addEventListener("click", gameOverClose);
      againNo.item(x).addEventListener("click", closePlayedGame);
    });
  }
}
getGameAgainButtons();

function closeGames() {
  for (x = 0; x < games.length; x++) {
    games[x].classList.add("hide-game");
  }
  hideStartGameScreen();
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
  disableScrollingInGame();

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

function disableScrollingInGame() {
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

function drawEarth(canvasName, gameCanvas) {
  const earth = {
    x: 0,
    y: canvasName.height - 5,
    w: canvasName.width,
    h: 5,
  };
  drawRectObject(gameCanvas, "#003b00", earth.x, earth.y, earth.w, earth.h);
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
let controlledBackground;

function setControlledObject() {
  switch (gamePlayed) {
    case "game1":
      controlledObject = lukesArray1[0];
      controlledBackground = backgroundStarsArray1;
      break;
    case "game2":
      controlledObject = lukesArray2[0];
      controlledBackground = backgroundStarsArray2;
      break;
    case "game3":
      controlledObject = lukesArray3[0];
      controlledBackground = backgroundStarsArray3;
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
    if (gamePlayed == "game3" || gamePlayed == "game1") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].right();
      }
    }
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    controlledObject.dx = -controlledObject.speed;
    if (gamePlayed == "game3") {
      objectSpeedUp = 0.5;
    }
    if (gamePlayed == "game3" || gamePlayed == "game1") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].left();
      }
    }
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    controlledObject.dy = -2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 1.4;
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].up();
      }
    }
  }
  if (e.key === "Down" || e.key === "ArrowDown") {
    controlledObject.dy = 2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 0.5;
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].down();
      }
    }
  }
  if (e.key === "f" && gamePlayed == "game2") {
    shootBulletsArray(lukesArray2[0]);
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
    if (gamePlayed == "game3" || gamePlayed == "game1") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].steady();
      }
    }
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    controlledObject.dy = 0;
    objectSpeedUp = 1;
    if (gamePlayed == "game2") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].steady();
      }
    }
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//GAME FUNCTIONS
let gameOverScreens = document.querySelectorAll(".game-over");

function scorePoints(gameNr, gameScore) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (
    startGameScreens[waitForStart].classList.contains("hide-screen") &&
    gameOverScreens[waitForStart].classList.contains("hide-screen")
  ) {
    switch (gameNr) {
      case 1:
        score1++;
        speedUp(gameScore);
        break;
      case 2:
        score2++;
        speedUp(gameScore);
        break;
      case 3:
        score3++;
        speedUp(gameScore);
        break;
    }
  }
}

function speedUp(gameScore) {
  var testScore = /^[1-9]{1}[5]{1,2}$/;
  let x;
  if (gameScore == 10 || gameScore == 30 || gameScore == 60) {
    x = "enemy";
  } else if (testScore.test(gameScore)) {
    x = "speed";
  } else {
    x = "none";
  }

  if ((gamePlayed == "game1") & (x == "enemy")) {
    positionXcowboy = cowboysArray[CI].x;
    directionC = (cowboysArray[CI].dx / 2.5) * -1;
    CI++;
    cowboysArray[CI].update();
    cowboyX = cowboysArray[CI].x;
    cowboyY = cowboysArray[CI].y;
    enemyBulletsArray[CI].reset();
  }

  if (x == "speed") {
    if ((gamePlayed == "game2") & (heartNr != undefined)) {
      heartsArray[heartNr].fall();
    }
    if (gamePlayed == "game3") {
      if (SI < starsArray.length - 1) {
        SI++;
      }
      starsArray[SI].fall();
    }
  }
}

function gameOver(lukesArray, enemyObject) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    if (gamePlayed == "game1" || gamePlayed == "game3") {
      for (var i = 0; i < enemyObject.length; i++) {
        if (
          enemyObject[i].x > lukesArray[0].x - 20 &&
          enemyObject[i].x < lukesArray[0].x + 20 &&
          enemyObject[i].y > lukesArray[0].y - 6 &&
          enemyObject[i].y < lukesArray[0].y + 10
        ) {
          pauseGame(gamePlayed);
          if (gamePlayed == "game1") {
            gameover1.classList.remove("hide-screen");
            CI = 0;
          }
          if (gamePlayed == "game3") {
            gameover3.classList.remove("hide-screen");
          }
        }
      }
    }

    if (gamePlayed == "game2") {
      pauseGame(gamePlayed);
      heartNr = undefined;
      gameover2.classList.remove("hide-screen");
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
    for (var i = 0; i < lukesArray1.length; i++) {
      lukesArray1[i].dy = 0;
      lukesArray1[i].dx = 0;
      lukesArray1[i].speed = 0;
    }
  }
  if (gamePlayed == "game2") {
    for (var i = 0; i < lukesArray2.length; i++) {
      lukesArray2[i].dy = 0;
      lukesArray2[i].dx = 0;
      lukesArray2[i].speed = 0;
    }
  }
  if (gamePlayed == "game3") {
    for (var i = 0; i < lukesArray3.length; i++) {
      lukesArray3[i].dy = 0;
      lukesArray3[i].dx = 0;
      lukesArray3[i].speed = 0;
    }
    fuelBar.pause();
  }
}

//GAME 1
const canvas1 = document.getElementById("theGame1");
const ctx1 = canvas1.getContext("2d");
let score1 = 0;
let requestIdGame1;
let cowboysArray = [];
let enemyBulletsArray = [];
let lukesArray1 = [];
let backgroundStarsArray1 = [];
let positionXcowboy;
let directionC;
let cowboyX;
let cowboyY;
let EBI = 0;
let CI = 0;

class backgroundStars {
  constructor(canvasName, backgroundDX, backgroundDY) {
    this.x = Math.random() * (canvasName.width - 1) + 1;
    this.y = Math.random() * (canvasName.height - 1) + 1;
    this.dx = backgroundDX;
    this.dy = backgroundDY;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = "#3b2c00";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.left = function () {
      this.dx = backgroundDX + 0.5;
    };

    this.right = function () {
      this.dx = backgroundDX - 1;
    };

    this.up = function () {
      this.dy = backgroundDY + 1;
    };

    this.down = function () {
      this.dy = backgroundDY - 0.5;
    };

    this.returnX = function (canvasName) {
      if (this.x > canvasName.width) {
        this.x = 1;
      } else if (this.x < 0) {
        this.x = canvasName.width - 1;
      }
      this.y = Math.random() * (canvasName.height - 1) + 1;
    };

    this.returnY = function (canvasName) {
      if (this.y > canvasName.height) {
        this.y = 1;
      } else if (this.y < 0) {
        this.y = canvasName.height - 1;
      }
      this.x = Math.random() * (canvasName.width - 1) + 1;
    };

    this.steady = function () {
      this.dx = backgroundDX;
      this.dy = backgroundDY;
    };
  }
}

class enemyBullets {
  constructor() {
    this.x = cowboyX;
    this.y = cowboyY - 10;
    this.speed = 2;
    this.dx = 0.5;
    this.dy = -2;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = "#808080";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.return = function () {
      this.x = cowboyX;
      this.y = cowboyY;
    };

    this.reset = function () {
      this.x = cowboyX;
      this.y = cowboyY - 10;
      this.speed = 2;
      this.dx = 0.5;
      this.dy = -2;
    };
  }
}

class multipleCowboys {
  constructor(canvasName) {
    this.x = canvasName.width + 20;
    this.y = canvasName.height - 5;
    this.dx = 0;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#DAA520",
        this.x,
        this.y - 10,
        5,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#DEB887",
        this.x,
        this.y - 4,
        6,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#DAA520",
        this.x,
        this.y - 10,
        15,
        1,
        0,
        0,
        Math.PI * 2,
        true
      );
    };

    this.update = function () {
      this.x = positionXcowboy;
      this.dx = 2 * directionC;
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + 20;
      this.y = canvasName.height - 5;
      this.dx = 0;
    };
  }
}

class multipleLukes {
  constructor(canvasName, marginXluke, marginYluke) {
    this.x = canvasName.width / marginXluke;
    this.y = canvasName.height / 2 + marginYluke;
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.w = 60;
    this.h = 4;
    this.size = 4.5;

    this.draw = function drawLuke(gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x,
        this.y,
        this.size,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#000000",
        this.x - 2,
        this.y - 1,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#000000",
        this.x + 2,
        this.y - 1,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#808080",
        this.x,
        this.y + 5,
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
        this.x - 4,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 4,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 11,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 11,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 18,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 18,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
    };

    this.reset = function (canvasName, marginXluke, marginYluke) {
      this.x = canvasName.width / marginXluke;
      this.y = canvasName.height / 2 - marginYluke;
      this.speed = 2;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

function fillBackgroundStarsArray(
  canvasName,
  backgroundStarsArray,
  backgroundDX,
  backgroundDY
) {
  for (i = 0; i < 150; i++) {
    backgroundStarsArray[i] = new backgroundStars(
      canvasName,
      backgroundDX,
      backgroundDY
    );
  }
}

function drawBackgroundStarsArray(gameCanvas, backgroundStarsArray) {
  for (i = 0; i < backgroundStarsArray.length; i++) {
    backgroundStarsArray[i].draw(gameCanvas);
  }
}

function moveBackgroundStars(canvasName, backgroundStarsArray) {
  for (i = 0; i < backgroundStarsArray.length; i++) {
    backgroundStarsArray[i].x += backgroundStarsArray[i].dx;
    backgroundStarsArray[i].y += backgroundStarsArray[i].dy;

    if (
      backgroundStarsArray[i].x > canvasName.width ||
      backgroundStarsArray[i].x < 0
    ) {
      backgroundStarsArray[i].returnX(canvasName);
    }

    if (
      backgroundStarsArray[i].y > canvasName.height ||
      backgroundStarsArray[i].y < 0
    ) {
      backgroundStarsArray[i].returnY(canvasName);
    }
  }
}

function fillLukesArray(canvasName, lukesArray, marginXluke, marginYluke) {
  for (var i = 0; i < 1; i++) {
    lukesArray[i] = new multipleLukes(canvasName, marginXluke, marginYluke);
  }
}

function drawLukesArray(gameCanvas, lukesArray) {
  for (var i = 0; i < lukesArray.length; i++) {
    lukesArray[i].draw(gameCanvas);
  }
}

function moveLukesArray(lukesArray, maxHeight, minHeight, maxWidth, minWidth) {
  for (var i = 0; i < lukesArray.length; i++) {
    lukesArray[i].x += lukesArray[i].dx * lukesArray[i].speed;
    lukesArray[i].y += lukesArray[i].dy * (lukesArray[i].speed / 2);

    if (lukesArray[i].x > maxWidth) {
      lukesArray[i].x = maxWidth;
    }

    if (lukesArray[i].x < minWidth) {
      lukesArray[i].x = minWidth;
    }
    if (lukesArray[i].y > maxHeight) {
      lukesArray[i].y = maxHeight;
    }

    if (lukesArray[i].y < minHeight) {
      lukesArray[i].y = minHeight;
    }
  }
}

function resetLukesArray(lukesArray, canvasName, marginXluke, marginYluke) {
  for (i = 0; i < lukesArray.length; i++) {
    lukesArray[i].reset(canvasName, marginXluke, marginYluke);
  }
}

function fillCowboysArray(canvasName) {
  for (var i = 0; i < 4; i++) {
    cowboysArray[i] = new multipleCowboys(canvasName);
  }
}

function drawCowboysArray(gameCanvas) {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboysArray[i].draw(gameCanvas);
  }
}

function moveCowboysArray(canvasName) {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboysArray[i].x += cowboysArray[i].dx;
    if (
      cowboysArray[i].x + 10 > canvasName.width ||
      cowboysArray[i].x - 10 < 0
    ) {
      cowboysArray[i].dx *= -1;
    }
  }
}

function resetCowboysArray(canvasName) {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboysArray[i].reset(canvasName);
  }
  positionXcowboy = canvasName.width / 2;
  directionC = -1;
  cowboysArray[0].update();
}

function fillEnemyBulletsArray() {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboyX = cowboysArray[i].x;
    cowboyY = cowboysArray[i].y;
    enemyBulletsArray[i] = new enemyBullets();
  }
}

function drawEnemyBulletsArray(gameCanvas) {
  for (var i = 0; i < enemyBulletsArray.length; i++) {
    enemyBulletsArray[i].draw(gameCanvas);
  }
}

function moveEnemyBulletsArray(canvasName, gameNr, gameScore) {
  for (var i = 0; i < enemyBulletsArray.length; i++) {
    enemyBulletsArray[i].x += enemyBulletsArray[i].dx;
    enemyBulletsArray[i].y += enemyBulletsArray[i].dy;
    if (
      enemyBulletsArray[i].x + 10 > canvasName.width ||
      enemyBulletsArray[i].x - 10 < 0
    ) {
      enemyBulletsArray[i].dx *= -1;
    }
    if (
      enemyBulletsArray[i].y > canvasName.height ||
      enemyBulletsArray[i].y < 0
    ) {
      cowboyX = cowboysArray[i].x;
      cowboyY = cowboysArray[i].y;
      enemyBulletsArray[i].return();
      if (
        enemyBulletsArray[i].x < canvasName.width &&
        enemyBulletsArray[i].x > 0
      ) {
        scorePoints(gameNr, gameScore);
      }
    }
  }
}

function resetEnemyBulletsArray(canvasName) {
  for (var i = 0; i < enemyBulletsArray.length; i++) {
    cowboyX = cowboysArray[i].x;
    cowboyY = cowboysArray[i].y;
    enemyBulletsArray[i].reset(canvasName);
  }
  EBI = 0;
}

fillBackgroundStarsArray(canvas1, backgroundStarsArray1, 0, 0);
fillLukesArray(canvas1, lukesArray1, 2, -60);
fillCowboysArray(canvas1);
fillEnemyBulletsArray(canvas1);

function drawGameElements1() {
  emptyCanvas(ctx1, canvas1);
  drawBackgroundStarsArray(ctx1, backgroundStarsArray1);
  drawEarth(canvas1, ctx1);
  drawLukesArray(ctx1, lukesArray1);
  drawCowboysArray(ctx1);
  drawEnemyBulletsArray(ctx1);
  drawScore(ctx1, canvas1, score1);
}

function game1Action() {
  drawGameElements1();
  moveBackgroundStars(canvas1, backgroundStarsArray1);
  moveLukesArray(lukesArray1, 100, 10, 280, 20);
  moveCowboysArray(canvas1);
  moveEnemyBulletsArray(canvas1, 1, score1);
  gameOver(lukesArray1, enemyBulletsArray);
  requestIdGame1 = requestAnimationFrame(game1Action);
}

function resetGame1() {
  emptyCanvas(ctx1, canvas1);
  resetLukesArray(lukesArray1, canvas1, 2, 40);
  resetCowboysArray(canvas1);
  resetEnemyBulletsArray(canvas1);
  resetScore(1);
  cancelAnimationFrame(requestIdGame1);
}

//GAME 2
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;
let debris = [];
let bulletsArray = [];
let aliensArray = [];
let heartsArray = [];
let lukesArray2 = [];
let backgroundStarsArray2 = [];
let heartNr;
let BI = 0;
let AI = 0;
let direction = 1;
let marginXheart;

class Piece {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  draw() {
    ctx2.save();
    ctx2.globalAlpha = this.alpha;
    ctx2.fillStyle = "red";
    ctx2.beginPath();
    ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx2.fill();
    ctx2.restore();
  }
  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
}

class multipleBullets {
  constructor() {
    this.x = 310;
    this.y = -5;
    this.dx = 0;
    this.dy = 0;
    this.radius = 2;
    this.color = "#808080";
    this.speed = 1;
    this.size = 2;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = this.color;
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.update = function (actionSubject) {
      this.x = actionSubject.x;
      this.y = actionSubject.y - 1;
    };
    this.shoot = function () {
      this.dy = -2;
    };
    this.reset = function () {
      this.x = 310;
      this.y = -5;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class multipleHearts {
  constructor(canvasName) {
    this.x = canvasName.width - (Math.random() * 0.7 + 0.2);
    this.y = 10;
    this.d = Math.min(9, 9);
    this.k = 8;
    this.dx = 0;
    this.dy = 0;

    this.draw = function (gameCanvas) {
      gameCanvas.save();
      gameCanvas.beginPath();
      gameCanvas.translate(this.x, this.y);
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
    };

    this.lose = function (canvasName) {
      this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
      this.y = -20;
    };
    this.fall = function () {
      this.dy = 1;
    };
    this.reset = function (canvasName) {
      this.x = canvasName.width - marginXheart;
      this.y = 10;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class multipleAliens {
  constructor(canvasName) {
    this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
    this.y = -(Math.random() * 200 + 10);
    this.w = 60;
    this.h = 4;
    this.size = 3;
    this.speed = 1;
    this.dx = (Math.random() * 2 + 1) * direction;
    this.dy = Math.random() * 0.9 + 1.0;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x,
        this.y,
        this.size,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x - 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x + 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#FF0000",
        this.x,
        this.y + 4,
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
        this.x - 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
      this.y = -(Math.random() * 200 + 10);
      this.dx = (Math.random() * 2 + 1) * direction;
      this.dy = Math.random() * 0.9 + 1.0;
      this.speed = 1;
    };
  }
}

function fillBulletsArray() {
  for (var i = 0; i < 5; i++) {
    bulletsArray[i] = new multipleBullets();
  }
}

function fillHeartsArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    if (i == 0) {
      marginXheart = 60;
    } else if (i == 1) {
      marginXheart = 45;
    } else if (i == 2) {
      marginXheart = 30;
    }
    heartsArray[i] = new multipleHearts(canvasName);
  }
}

function fillAliensArray(canvasName) {
  for (var i = 0; i < 8; i++) {
    aliensArray[i] = new multipleAliens(canvasName);
    direction *= -1;
  }
}

function drawHeartsArray(gameCanvas) {
  for (var i = 0; i < heartsArray.length; i++) {
    heartsArray[i].draw(gameCanvas);
  }
}

function moveHeartsArray(canvasName, lukesArray) {
  for (var i = 0; i < heartsArray.length; i++) {
    heartsArray[i].y += heartsArray[i].dy;
    heartsArray[i].x += heartsArray[i].dx;

    if (
      heartsArray[i].y + heartsArray[i].size > canvasName.height ||
      heartsArray[i].y - heartsArray[i].size < -50
    ) {
      heartsArray[i].lose(canvasName);
    }
    if (
      heartsArray[i].x > lukesArray[0].x - 20 &&
      heartsArray[i].x < lukesArray[0].x + 20 &&
      heartsArray[i].y > lukesArray[0].y - 16 &&
      heartsArray[i].y < lukesArray[0].y + 10
    ) {
      if (i == 0) {
        marginXheart = 60;
      } else if (i == 1) {
        marginXheart = 45;
      } else if (i == 2) {
        marginXheart = 30;
      }
      heartsArray[i].reset(canvasName);
      if (heartNr == 1) {
        heartNr = 0;
      } else if (heartNr == 0) {
        heartNr = undefined;
      }
    }
  }
}

function loseHeart(lukesArray, canvasName) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    for (var i = 0; i < aliensArray.length; i++) {
      if (
        aliensArray[i].x - aliensArray[i].size > lukesArray[0].x - 20 &&
        aliensArray[i].x + aliensArray[i].size < lukesArray[0].x + 20 &&
        aliensArray[i].y > lukesArray[0].y - 16 &&
        aliensArray[i].y < lukesArray[0].y + 10
      ) {
        let AC = i;
        enemyExplosion(AC, canvasName);
        if (heartNr == undefined) {
          heartNr = 0;
          heartsArray[heartNr].lose(canvasName);
        } else if (heartNr == 0) {
          heartNr = 1;
          heartsArray[heartNr].lose(canvasName);
        } else if (heartNr == 1) {
          heartNr = 2;
          heartsArray[heartNr].lose(canvasName);
          gameOver();
        }
      }
    }
  }
}

function resetHeartsArray(canvasName) {
  for (var i = 0; i < heartsArray.length; i++) {
    if (i == 0) {
      marginXheart = 60;
    } else if (i == 1) {
      marginXheart = 45;
    } else if (i == 2) {
      marginXheart = 30;
    }
    heartsArray[i].reset(canvasName);
  }
}

function drawAliensArray(gameCanvas) {
  for (var i = 0; i < aliensArray.length; i++) {
    aliensArray[i].draw(gameCanvas);
  }
}

function moveAliensArray(canvasName) {
  for (var i = 0; i < aliensArray.length; i++) {
    aliensArray[i].y += aliensArray[i].dy;
    aliensArray[i].x += aliensArray[i].dx;

    if (aliensArray[i].x + 10 > canvasName.width || aliensArray[i].x - 10 < 0) {
      aliensArray[i].dx *= -1;
    }
    if (aliensArray[i].y < -500 || aliensArray[i].y > canvasName.height) {
      direction *= -1;
      aliensArray[i].reset(canvasName);
    }
  }
}

function resetAliensArray(canvasName) {
  for (var i = 0; i < aliensArray.length; i++) {
    direction *= -1;
    aliensArray[i].reset(canvasName);
  }
}

function drawBulletsArray(gameCanvas) {
  for (var i = 0; i < bulletsArray.length; i++) {
    bulletsArray[i].draw(gameCanvas);
  }
}

function shootBulletsArray(actionSubject) {
  bulletsArray[BI].update(actionSubject);
  bulletsArray[BI].shoot();
  if (BI == 4) {
    BI = 0;
  } else {
    BI++;
  }
}

function moveBulletsArray(canvasName) {
  for (var i = 0; i < bulletsArray.length; i++) {
    bulletsArray[i].y += bulletsArray[i].dy;
    bulletsArray[i].x += bulletsArray[i].dx;

    if (
      bulletsArray[i].y + bulletsArray[i].size > canvasName.height ||
      bulletsArray[i].y - bulletsArray[i].size < -50
    ) {
      bulletsArray[i].reset();
    }
  }
}

function resetBulletsArray() {
  for (var i = 0; i < bulletsArray.length; i++) {
    bulletsArray[i].reset();
  }
}

function killEnemy(canvasName, gameNr, gameScore) {
  for (var KA = 0; KA < aliensArray.length; KA++) {
    for (var i = 0; i < bulletsArray.length; i++) {
      if (
        bulletsArray[i].x > aliensArray[KA].x - 20 &&
        bulletsArray[i].x < aliensArray[KA].x + 20 &&
        bulletsArray[i].y > aliensArray[KA].y - 3 &&
        bulletsArray[i].y < aliensArray[KA].y + 6
      ) {
        enemyExplosion(KA, canvasName);
        bulletsArray[i].reset();
        scorePoints(gameNr, gameScore);
      }
    }
  }
}

function enemyExplosion(AC, canvasName) {
  setTimeout(() => {
    for (i = 0; i <= 150; i++) {
      let dx = (Math.random() - 0.5) * 0.5;
      let dy = (Math.random() - 0.5) * 0.3;
      let radius = 0.5;
      let piece = new Piece(
        aliensArray[AC].x,
        aliensArray[AC].y,
        radius,
        dx,
        dy
      );

      debris.push(piece);
    }
    explosion();
    aliensArray[AC].reset(canvasName);
  }, 0);
}

function explosion() {
  debris.forEach((piece, i) => {
    if (piece.alpha <= 0) {
      debris.splice(i, 1);
    } else piece.update();
  });
  requestAnimationFrame(explosion);
}

fillBackgroundStarsArray(canvas2, backgroundStarsArray2, 0, 1);
fillLukesArray(canvas2, lukesArray2, 2, 40);
fillBulletsArray();
fillHeartsArray(canvas2);
fillAliensArray(canvas2);

function drawGame2Elements() {
  emptyCanvas(ctx2, canvas2);
  drawBackgroundStarsArray(ctx2, backgroundStarsArray2);
  drawBulletsArray(ctx2);
  drawAliensArray(ctx2);
  drawHeartsArray(ctx2);
  drawLukesArray(ctx2, lukesArray2);
  drawScore(ctx2, canvas2, score2);
}

function game2Action() {
  drawGame2Elements();
  moveBackgroundStars(canvas2, backgroundStarsArray2);
  moveLukesArray(lukesArray2, 140, 60, 280, 20);
  moveBulletsArray(canvas2);
  moveAliensArray(canvas2);
  moveHeartsArray(canvas2, lukesArray2);
  loseHeart(lukesArray2, canvas2);
  killEnemy(canvas2, 2, score2);
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas(ctx2, canvas2);
  resetLukesArray(lukesArray2, canvas2, 2, 40);
  resetBulletsArray();
  resetAliensArray(canvas2);
  resetHeartsArray(canvas2);
  resetScore(2);
  cancelAnimationFrame(requestIdGame2);
  objectSpeedUp = 1;
}

//GAME 3
const canvas3 = document.getElementById("theGame3");
const ctx3 = canvas3.getContext("2d");
let score3 = 0;
let requestIdGame3;
let aliensArray2 = [];
let cometsArray = [];
let starsArray = [];
let lukesArray3 = [];
let rocksArray = [];
let backgroundStarsArray3 = [];
let SI = 0;

class multipleComets {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = -2.5;
    this.dy = 0;
    this.speed = 1.2;
    this.w = 20;
    this.h = 10;
    this.size = Math.random() * 2.8 + 9.1;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#D2691E",
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 4,
        this.y - 4,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x + 3,
        this.y + 3,
        this.size * 0.3,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 2,
        this.y - 2,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = 1.2;
    };
  }
}

class FuelBar {
  constructor() {
    this.w = 45;
    this.fu = 0.05;

    this.draw = function (gameCanvas, canvasName) {
      gameCanvas.beginPath();
      gameCanvas.rect(canvasName.width - 55, 12, this.w, 4);
      gameCanvas.fillStyle = "#05db05";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.use = function () {
      if (this.w > 0) {
        this.w -= this.fu;
      } else {
        this.w = 0;
      }
    };

    this.refill = function (lukesArray) {
      if (this.w <= 20) {
        this.w += 25;
      } else {
        this.w += 25 - (this.w - 20);
      }
      lukesArray[0].speed = 2;
    };

    this.reset = function () {
      this.w = 45;
      this.fu = 0.05;
    };

    this.pause = function () {
      this.fu = 0;
    };
  }
}

class multipleStars {
  constructor(canvasName) {
    this.x = canvasName.width + 10;
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = 0;
    this.dy = 0;
    this.r = 6;
    this.n = 5;
    this.inset = -1;
    this.size = 3;
    this.speed = 1;

    this.draw = function (gameCanvas) {
      gameCanvas.save();
      gameCanvas.beginPath();
      gameCanvas.translate(this.x, this.y);
      gameCanvas.moveTo(0, 0 - this.r);
      for (let x = 0; x < this.n; x++) {
        gameCanvas.rotate(Math.PI / this.n);
        gameCanvas.lineTo(0, 0 - this.r * this.inset);
        gameCanvas.rotate(Math.PI / this.n);
        gameCanvas.lineTo(0, 0 - this.r);
      }
      gameCanvas.fillStyle = "#05db05";
      gameCanvas.fill();
      gameCanvas.closePath();
      gameCanvas.restore();
    };

    this.fall = function () {
      this.dx = -2;
    };

    this.return = function (canvasName) {
      this.x = canvasName.width + 10;
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + 10;
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class multipleAliens2 {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.w = 60;
    this.h = 4;
    this.size = 3;
    this.speed = Math.random() * 0.8 + 0.8;
    this.dx = -2.5;
    this.dy = 0;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x,
        this.y,
        this.size,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x - 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x + 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#FF0000",
        this.x,
        this.y + 4,
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
        this.x - 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = Math.random() * 0.8 + 0.8;
    };
  }
}

class multipleRocks {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = -2.5;
    this.dy = 0;
    this.speed = Math.random() * 0.6 + 1.2;
    this.w = 20;
    this.h = 10;
    this.size = Math.random() * 3.5 + 3.1;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#D2691E",
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 2,
        this.y - 2,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x + 1,
        this.y + 1,
        this.size * 0.3,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 1,
        this.y - 1,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = Math.random() * 0.6 + 1.2;
    };
  }
}

function useFuel(lukesArray) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    fuelBar.use();
  }
  if (fuelBar.w === 0) {
    lukesArray[0].speed = 0;
  }
}

function fillStarsArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    starsArray[i] = new multipleStars(canvasName);
  }
}

function drawStarsArray(gameCanvas) {
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].draw(gameCanvas);
  }
}

function dropStar() {
  starsArray[SI].dx = -2;
}

function moveStarsArray(canvasName, lukesArray, gameNr, gameScore) {
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].y += starsArray[i].dy;
    starsArray[i].x += starsArray[i].dx;

    if (starsArray[i].x > canvasName.width + 50 || starsArray[i].x < 0) {
      starsArray[i].return(canvasName);
    }
    let waitForStart = gamePlayed.slice(4) - 1;
    if (
      startGameScreens[waitForStart].classList.contains("hide-screen") &&
      gameOverScreens[waitForStart].classList.contains("hide-screen")
    ) {
      if (
        starsArray[i].x > lukesArray[0].x - 20 &&
        starsArray[i].x < lukesArray[0].x + 20 &&
        starsArray[i].y > lukesArray[0].y - 16 &&
        starsArray[i].y < lukesArray[0].y + 10
      ) {
        scorePoints(gameNr, gameScore);
        starsArray[i].return(canvasName);
        fuelBar.refill(lukesArray);
      }
    }
  }
}

function resetStarsArray(canvasName) {
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].reset(canvasName);
  }
  SI = 0;
  dropStar();
}

function fillAliensArray2(canvasName) {
  for (var i = 0; i < 5; i++) {
    aliensArray2[i] = new multipleAliens2(canvasName);
  }
}

function drawAliensArray2(gameCanvas) {
  for (var i = 0; i < aliensArray2.length; i++) {
    aliensArray2[i].draw(gameCanvas);
  }
}

function moveAliensArray2(canvasName) {
  for (var i = 0; i < aliensArray2.length; i++) {
    //aliensArray2[i].y += aliensArray2[i].dy * aliensArray2[i].speed;
    aliensArray2[i].x += aliensArray2[i].dx * aliensArray2[i].speed;

    if (aliensArray2[i].x > canvasName.width + 500 || aliensArray2[i].x < -20) {
      aliensArray2[i].reset(canvasName);
    }
    // if (
    //   aliensArray2[i].y < canvasName.height * 0.7 ||
    //   aliensArray2[i].y < canvasName.height * 0.3
    // ) {
    //   aliensArray2[i].dy *= -1;
    // }
  }
}

function resetAliensArray2(canvasName) {
  for (var i = 0; i < aliensArray2.length; i++) {
    aliensArray2[i].reset(canvasName);
  }
}

function fillRocksArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    rocksArray[i] = new multipleRocks(canvasName);
  }
}

function drawRocksArray(gameCanvas) {
  for (var i = 0; i < rocksArray.length; i++) {
    rocksArray[i].draw(gameCanvas);
  }
}

function moveRocksArray(canvasName) {
  for (var i = 0; i < rocksArray.length; i++) {
    rocksArray[i].x += rocksArray[i].dx * rocksArray[i].speed;

    if (rocksArray[i].x > canvasName.width + 500 || rocksArray[i].x < -20) {
      rocksArray[i].reset(canvasName);
    }
  }
}

function resetRocksArray(canvasName) {
  for (var i = 0; i < rocksArray.length; i++) {
    rocksArray[i].reset(canvasName);
  }
}

function fillCometsArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    cometsArray[i] = new multipleComets(canvasName);
  }
}

function drawCometsArray(gameCanvas) {
  for (var i = 0; i < cometsArray.length; i++) {
    cometsArray[i].draw(gameCanvas);
  }
}

function moveCometsArray(canvasName) {
  for (var i = 0; i < cometsArray.length; i++) {
    cometsArray[i].x += cometsArray[i].dx * cometsArray[i].speed;

    if (cometsArray[i].x > canvasName.width + 500 || cometsArray[i].x < -20) {
      cometsArray[i].reset(canvasName);
    }
  }
}

function resetCometsArray(canvasName) {
  for (var i = 0; i < cometsArray.length; i++) {
    cometsArray[i].reset(canvasName);
  }
}

let fuelBar = new FuelBar();
fillLukesArray(canvas3, lukesArray3, 4, 0);
fillBackgroundStarsArray(canvas3, backgroundStarsArray3, -1, 0);
fillCometsArray(canvas3);
fillRocksArray(canvas3);
fillStarsArray(canvas3);
fillAliensArray2(canvas3);

function drawGame3Elements() {
  emptyCanvas(ctx3, canvas3);
  drawBackgroundStarsArray(ctx3, backgroundStarsArray3);
  fuelBar.draw(ctx3, canvas3);
  drawLukesArray(ctx3, lukesArray3);
  drawCometsArray(ctx3);
  drawRocksArray(ctx3);
  drawAliensArray2(ctx3);
  drawStarsArray(ctx3);
  drawScore(ctx3, canvas3, score3);
}

function game3Action() {
  drawGame3Elements();
  moveBackgroundStars(canvas3, backgroundStarsArray3);
  useFuel(lukesArray3);
  moveLukesArray(lukesArray3, 140, 10, 160, 20);
  moveStarsArray(canvas3, lukesArray3, 3, score3);
  moveAliensArray2(canvas3);
  moveCometsArray(canvas3);
  moveRocksArray(canvas3);
  gameOver(lukesArray3, aliensArray2);
  gameOver(lukesArray3, cometsArray);
  gameOver(lukesArray3, rocksArray);
  requestIdGame3 = requestAnimationFrame(game3Action);
}

function resetGame3() {
  emptyCanvas(ctx3, canvas3);
  resetLukesArray(lukesArray3, canvas3, 4, 0);
  resetStarsArray(canvas3);
  resetAliensArray2(canvas3);
  resetCometsArray(canvas3);
  resetRocksArray(canvas3);
  fuelBar.reset();
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

function openFootText() {
  closeFootTexts();
  event.target.classList.add("highlight");
  subjectFooter = event.target.id;
  const textShown = document.getElementById(`${subjectFooter}-text`);
  textShown.classList.remove("hide-text");
}

function closeFootTexts() {
  for (x = 0; x < textsArr.length; x++) {
    textsArr[x].classList.add("hide-text");
    footLinks[x].classList.remove("highlight");
  }
}

function addFooterOpeningEventListeners() {
  for (x = 0; x < footLinks.length; x++) {
    footLinks[x].addEventListener("click", openFootText);
  }
}
addFooterOpeningEventListeners();

function closeViaFooter() {
  if (subjectFooter == subjectFooter2) {
    closeFootTexts();
    subjectFooter2 = undefined;
  } else {
    subjectFooter2 = event.target.id;
  }
}

function addFooterClosingEventListeners() {
  for (x = 0; x < footLinks.length; x++) {
    footLinks[x].addEventListener("click", closeViaFooter);
  }
}
addFooterClosingEventListeners();

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
