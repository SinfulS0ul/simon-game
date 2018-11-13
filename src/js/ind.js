const $colors = ['red', 'blue', 'yellow', 'green', 'orange', 'pink'];
let randomColorArray = [];

export function getRandomColorArray (round) {
  for (let i = 0; i < round; i++) {
    randomColorArray[i] = Math.floor(Math.random() * $colors.length);
  }
  return randomColorArray;
}

export function restart () {
  this.round = null;
  this.randomColorArray = [];
  this.arr = null;
  this.waiting = false;
}

export function check () {
  randomColorArray = this.randColorArray;
  if (this.arr.length === randomColorArray.length) {
    if (this.arr.every(function (value, index) {
      return value === randomColorArray[index];
    })) {
      const audio = new Audio();
      audio.src = 'src/sounds/Молодца!.mp3';
      audio.autoplay = true;
      return true;
    } else {
      return false;
    }
  }
}

export function startRound () {
  if (!this.waiting) {
    this.waiting = true;
    this.round++;
    return true;
  } else
    return false;
}