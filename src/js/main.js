function serviceWorkerRegistr (mode) {
  if ('serviceWorker' in navigator) {
    if (mode === 'development')
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
      });
    else
      navigator.serviceWorker.register('/simon-game/service-worker.js');
  }
}
serviceWorkerRegistr(process.env.NODE_ENV);

const $red = document.querySelector('.red');
const $blue = document.querySelector('.blue');
const $yellow = document.querySelector('.yellow');
const $green = document.querySelector('.green');
const $orange = document.querySelector('.orange');
const $pink = document.querySelector('.pink');
const $start = document.querySelector('.menu__start-button');
const $nextRound = document.querySelector('.central-menu__continue-button');
const $easyMode = document.querySelector('.easy');
const $hardMode = document.querySelector('.hard');
const $colors = [$red, $blue, $yellow, $green, $orange, $pink];
const easyModeTimeout = 1000;
const hardModeTimeout = 300;
const $roundText = document.querySelector('.round');
const $alertLine = document.querySelector('.canv__alert-info__massage');
const $tapCount = document.querySelector('.tap-count');
const $currentModeInfo = document.querySelector('.mode__current-mode');
let arr = null;
let randomColorArray = [];
let round = null;
let waiting = false;
let modeTimeout = null;
const fadeUpArray = ['#fc3730', '#3ca5d6', '#fff243', '#46f56b', '#f09951', '#f538bc'];
const fadeDownArray = ['#ff6f69', '#69d0ff', '#fff9a4', '#94f8a9', '#f5bb8c', '#f894da'];

function colorFading ($element, colorNumber) {
  $element.style.setProperty('--color', fadeUpArray[colorNumber]);
  $element.style.setProperty('--shadow', 20 + 'px');
  setTimeout(() => {
    $element.style.setProperty('--color', fadeDownArray[colorNumber]);
    $element.style.setProperty('--shadow', 0 + 'px');
  }, modeTimeout / 4);
}

function getRandomColorArray (round) {
  for (let i = 0; i < round; i++) {
    randomColorArray[i] = Math.floor(Math.random() * $colors.length);
  }
  return randomColorArray;
}

function restart () {
  round = null;
  $roundText.innerHTML = round;
  randomColorArray = [];
  arr = null;
  $tapCount.textContent = null;
  waiting = false;
}

function check () {
  $tapCount.textContent++;
  if (arr.length === randomColorArray.length) {
    if (arr.every(function (value, index) {
      return value === randomColorArray[index];
    })) {
      $alertLine.innerHTML = 'Nice! ^~^';
      randomColorArray = [];
      arr = null;
      waiting = false;
    } else {
      $alertLine.innerHTML = 'You lost! :c';
      restart();
    }
  }
}

function startRound () {
  if (!waiting) {
    waiting = true;
    round++;
    getRandomColorArray(round);
    $tapCount.textContent = 0;
    $alertLine.innerHTML = null;
    $roundText.innerHTML = round;
    let num;
    let timeout = 0;
    for (let i = 0; i < randomColorArray.length; i++) {
      num = randomColorArray[i];
      timeout += modeTimeout;
      (function (num) {
        setTimeout(() => {
          colorFading($colors[num], num);
        }, timeout);
      })(num);
    }
    setTimeout(() => {
      arr = [];
    }, modeTimeout * randomColorArray.length);
  }
}

$start.addEventListener ('click', () => {
  restart();
  if (!modeTimeout) {
    modeTimeout = easyModeTimeout;
    $currentModeInfo.innerHTML = 'Current mode: Easy';
  }
  startRound();
});

$nextRound.addEventListener ('click', () => {
  startRound();
});

$easyMode.addEventListener ('click', () => {
  restart();
  modeTimeout = easyModeTimeout;
  $currentModeInfo.innerHTML = 'Current mode: Easy';
});

$hardMode.addEventListener ('click', () => {
  restart();
  modeTimeout = hardModeTimeout;
  $currentModeInfo.innerHTML = 'Current mode: Hard';
});

$red.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 0;
    colorFading($red, colorNumber);
    arr.push(0);
    check();
  }
});

$blue.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 1;
    colorFading($blue, colorNumber);
    arr.push(1);
    check();
  }
});

$yellow.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 2;
    colorFading($yellow, colorNumber);
    arr.push(2);
    check();
  }
});

$green.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 3;
    colorFading($green, colorNumber);
    arr.push(3);
    check();
  }
});

$orange.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 4;
    colorFading($orange, colorNumber);
    arr.push(4);
    check();
  }
});

$pink.addEventListener ('click', () => {
  if (arr) {
    const colorNumber = 5;
    colorFading($pink, colorNumber);
    arr.push(5);
    check();
  }
});