const $red = document.querySelector('.red');
const $blue = document.querySelector('.blue');
const $yellow = document.querySelector('.yellow');
const $green = document.querySelector('.green');
const $start = document.querySelector('.start-button');
const $restart = document.querySelector('.restart-button');
const $easyMod = document.querySelector('.easy');
const $hardMod = document.querySelector('.hard');
const $colors = [$red, $blue, $yellow, $green];
let $roundText = document.querySelector('.round');
let $alertLine = document.querySelector('.alert-line');
let $tapCount = document.querySelector('.tap-count');
let arr = null;
let randomColorArray = [];
let round = null;
let waiting = false;
let modeTimeout = 1000;
const fadeUpArray = ['red', '#3ca5d6', '#fff243', '#46f56b'];
const fadeDownArray = ['#ff6f69', '#69d0ff', '#fff9a4', '#94f8a9'];


function colorFading($element, colorNumber) {
    $element.style.setProperty('--color', fadeUpArray[colorNumber]);
    $element.style.setProperty('--shadow', 20 + 'px');
    setTimeout(() => {
        $element.style.setProperty('--color', fadeDownArray[colorNumber]);
        $element.style.setProperty('--shadow', 0 + 'px');
    }, modeTimeout/4);
}

function getRandomColorArray(round) {
    for (let i = 0; i < round; i++) {
        randomColorArray[i] = Math.floor(Math.random() * $colors.length);
    }
    return randomColorArray;
}

function restart(){
    round = null;
    $roundText.innerHTML = round;
    randomColorArray = [];
    arr = null;
    $tapCount.textContent = null;
    waiting = false;
}

function check() {
    $tapCount.textContent++;
    console.log(arr);
    console.log(randomColorArray);
    if (arr.length === randomColorArray.length) {
        if (arr.every(function (value, index) { return value === randomColorArray[index] })) {
            const audio = new Audio();
            audio.src = 'src/Молодца!.mp3';
            audio.autoplay = true;
            $alertLine.innerHTML = 'Nice! ^~^';
            randomColorArray = [];
            arr = null;
            waiting = false;
            $tapCount.textContent = null;
        }
        else {
            $alertLine.innerHTML = 'You lost! :c';
            restart();
        }
    }
}

$start.addEventListener('click', () => {
    if (!waiting) {
        waiting = true;
        round++;
        getRandomColorArray(round);
        $alertLine.innerHTML = null;
        $roundText.innerHTML = round;
        let num;
        let timeout = 0;
        for (let i = 0; i < randomColorArray.length; i++) {
            num = randomColorArray[i];
            timeout += modeTimeout;
            (function (num) {
                setTimeout(() => {
                    colorFading($colors[num], num)
                }, timeout);
            })(num);
        }
        setTimeout(() => {
            arr = [];
        }, modeTimeout * randomColorArray.length);
    }
})

$restart.addEventListener('click', () => {
    restart();
})

$easyMod.addEventListener('click', () => {
    modeTimeout = 1000;
})

$hardMod.addEventListener('click', () => {
    modeTimeout = 300;
})

$red.addEventListener('click', () => {
    if (arr) {
        const colorNumber = 0;
        colorFading($red, colorNumber);
        arr.push(0);
        check();
    }
})
$blue.addEventListener('click', () => {
    if (arr) {
        const colorNumber = 1;
        colorFading($blue, colorNumber);
        arr.push(1);
        check();
    }
})
$yellow.addEventListener('click', () => {
    if (arr) {
        const colorNumber = 2;
        colorFading($yellow, colorNumber);
        arr.push(2);
        check();
    }
})
$green.addEventListener('click', () => {
    if (arr) {
        const colorNumber = 3;
        colorFading($green, colorNumber);
        arr.push(3);
        check();
    }
})