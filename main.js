!function(n){var t={};function e(c){if(t[c])return t[c].exports;var o=t[c]={i:c,l:!1,exports:{}};return n[c].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=n,e.c=t,e.d=function(n,t,c){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:c})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(e.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var o in n)e.d(c,o,function(t){return n[t]}.bind(null,o));return c},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=0)}([function(n,t,e){e(1),n.exports=e(2)},function(module,exports){eval("if ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => {\n    navigator.serviceWorker.register('src/ServiceWorker/sw.js');\n  });\n}\n\nconst $red = document.querySelector('.red');\nconst $blue = document.querySelector('.blue');\nconst $yellow = document.querySelector('.yellow');\nconst $green = document.querySelector('.green');\nconst $orange = document.querySelector('.orange');\nconst $pink = document.querySelector('.pink');\nconst $start = document.querySelector('.menu__start-button');\nconst $nextRound = document.querySelector('.central-menu__continue-button');\nconst $easyMode = document.querySelector('.easy');\nconst $hardMode = document.querySelector('.hard');\nconst $colors = [$red, $blue, $yellow, $green, $orange, $pink];\nconst easyModeTimeout = 1000;\nconst hardModeTimeout = 300;\nconst $roundText = document.querySelector('.round');\nconst $alertLine = document.querySelector('.canv__alert-info__massage');\nconst $tapCount = document.querySelector('.tap-count');\nconst $currentModeInfo = document.querySelector('.mode__current-mode');\nlet arr = null;\nlet randomColorArray = [];\nlet round = null;\nlet waiting = false;\nlet modeTimeout = null;\nconst fadeUpArray = ['#fc3730', '#3ca5d6', '#fff243', '#46f56b', '#f09951', '#f538bc'];\nconst fadeDownArray = ['#ff6f69', '#69d0ff', '#fff9a4', '#94f8a9', '#f5bb8c', '#f894da'];\n\nfunction colorFading ($element, colorNumber) {\n  $element.style.setProperty('--color', fadeUpArray[colorNumber]);\n  $element.style.setProperty('--shadow', 20 + 'px');\n  setTimeout(() => {\n    $element.style.setProperty('--color', fadeDownArray[colorNumber]);\n    $element.style.setProperty('--shadow', 0 + 'px');\n  }, modeTimeout / 4);\n}\n\nfunction getRandomColorArray (round) {\n  for (let i = 0; i < round; i++) {\n    randomColorArray[i] = Math.floor(Math.random() * $colors.length);\n  }\n  return randomColorArray;\n}\n\nfunction restart () {\n  round = null;\n  $roundText.innerHTML = round;\n  randomColorArray = [];\n  arr = null;\n  $tapCount.textContent = null;\n  waiting = false;\n}\n\nfunction check () {\n  $tapCount.textContent++;\n  //console.log(arr);\n  //console.log(randomColorArray);\n  if (arr.length === randomColorArray.length) {\n    if (arr.every(function (value, index) {\n      return value === randomColorArray[index];\n    })) {\n      const audio = new Audio();\n      audio.src = 'src/sounds/Молодца!.mp3';\n      audio.autoplay = true;\n      $alertLine.innerHTML = 'Nice! ^~^';\n      randomColorArray = [];\n      arr = null;\n      waiting = false;\n    } else {\n      $alertLine.innerHTML = 'You lost! :c';\n      restart();\n    }\n  }\n}\n\nfunction startRound () {\n  if (!waiting) {\n    waiting = true;\n    round++;\n    getRandomColorArray(round);\n    $tapCount.textContent = 0;\n    $alertLine.innerHTML = null;\n    $roundText.innerHTML = round;\n    let num;\n    let timeout = 0;\n    for (let i = 0; i < randomColorArray.length; i++) {\n      num = randomColorArray[i];\n      timeout += modeTimeout;\n      (function (num) {\n        setTimeout(() => {\n          colorFading($colors[num], num);\n        }, timeout);\n      })(num);\n    }\n    setTimeout(() => {\n      arr = [];\n    }, modeTimeout * randomColorArray.length);\n  }\n}\n\n$start.addEventListener ('click', () => {\n  restart();\n  if (!modeTimeout) {\n    modeTimeout = easyModeTimeout;\n    $currentModeInfo.innerHTML = 'Current mode: Easy';\n  }\n  startRound();\n});\n\n$nextRound.addEventListener ('click', () => {\n  startRound();\n});\n\n$easyMode.addEventListener ('click', () => {\n  restart();\n  modeTimeout = easyModeTimeout;\n  $currentModeInfo.innerHTML = 'Current mode: Easy';\n});\n\n$hardMode.addEventListener ('click', () => {\n  restart();\n  modeTimeout = hardModeTimeout;\n  $currentModeInfo.innerHTML = 'Current mode: Hard';\n});\n\n$red.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 0;\n    colorFading($red, colorNumber);\n    arr.push(0);\n    check();\n  }\n});\n\n$blue.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 1;\n    colorFading($blue, colorNumber);\n    arr.push(1);\n    check();\n  }\n});\n\n$yellow.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 2;\n    colorFading($yellow, colorNumber);\n    arr.push(2);\n    check();\n  }\n});\n\n$green.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 3;\n    colorFading($green, colorNumber);\n    arr.push(3);\n    check();\n  }\n});\n\n$orange.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 4;\n    colorFading($orange, colorNumber);\n    arr.push(4);\n    check();\n  }\n});\n\n$pink.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 5;\n    colorFading($pink, colorNumber);\n    arr.push(5);\n    check();\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzPzkyOTEiXSwic291cmNlc0NvbnRlbnQiOlsiaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoJ3NyYy9TZXJ2aWNlV29ya2VyL3N3LmpzJyk7XG4gIH0pO1xufVxuXG5jb25zdCAkcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlZCcpO1xuY29uc3QgJGJsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmx1ZScpO1xuY29uc3QgJHllbGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55ZWxsb3cnKTtcbmNvbnN0ICRncmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmVlbicpO1xuY29uc3QgJG9yYW5nZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcmFuZ2UnKTtcbmNvbnN0ICRwaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBpbmsnKTtcbmNvbnN0ICRzdGFydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19zdGFydC1idXR0b24nKTtcbmNvbnN0ICRuZXh0Um91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2VudHJhbC1tZW51X19jb250aW51ZS1idXR0b24nKTtcbmNvbnN0ICRlYXN5TW9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lYXN5Jyk7XG5jb25zdCAkaGFyZE1vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFyZCcpO1xuY29uc3QgJGNvbG9ycyA9IFskcmVkLCAkYmx1ZSwgJHllbGxvdywgJGdyZWVuLCAkb3JhbmdlLCAkcGlua107XG5jb25zdCBlYXN5TW9kZVRpbWVvdXQgPSAxMDAwO1xuY29uc3QgaGFyZE1vZGVUaW1lb3V0ID0gMzAwO1xuY29uc3QgJHJvdW5kVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3VuZCcpO1xuY29uc3QgJGFsZXJ0TGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW52X19hbGVydC1pbmZvX19tYXNzYWdlJyk7XG5jb25zdCAkdGFwQ291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFwLWNvdW50Jyk7XG5jb25zdCAkY3VycmVudE1vZGVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGVfX2N1cnJlbnQtbW9kZScpO1xubGV0IGFyciA9IG51bGw7XG5sZXQgcmFuZG9tQ29sb3JBcnJheSA9IFtdO1xubGV0IHJvdW5kID0gbnVsbDtcbmxldCB3YWl0aW5nID0gZmFsc2U7XG5sZXQgbW9kZVRpbWVvdXQgPSBudWxsO1xuY29uc3QgZmFkZVVwQXJyYXkgPSBbJyNmYzM3MzAnLCAnIzNjYTVkNicsICcjZmZmMjQzJywgJyM0NmY1NmInLCAnI2YwOTk1MScsICcjZjUzOGJjJ107XG5jb25zdCBmYWRlRG93bkFycmF5ID0gWycjZmY2ZjY5JywgJyM2OWQwZmYnLCAnI2ZmZjlhNCcsICcjOTRmOGE5JywgJyNmNWJiOGMnLCAnI2Y4OTRkYSddO1xuXG5mdW5jdGlvbiBjb2xvckZhZGluZyAoJGVsZW1lbnQsIGNvbG9yTnVtYmVyKSB7XG4gICRlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yJywgZmFkZVVwQXJyYXlbY29sb3JOdW1iZXJdKTtcbiAgJGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2hhZG93JywgMjAgKyAncHgnKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgJGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3InLCBmYWRlRG93bkFycmF5W2NvbG9yTnVtYmVyXSk7XG4gICAgJGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2hhZG93JywgMCArICdweCcpO1xuICB9LCBtb2RlVGltZW91dCAvIDQpO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb21Db2xvckFycmF5IChyb3VuZCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdW5kOyBpKyspIHtcbiAgICByYW5kb21Db2xvckFycmF5W2ldID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogJGNvbG9ycy5sZW5ndGgpO1xuICB9XG4gIHJldHVybiByYW5kb21Db2xvckFycmF5O1xufVxuXG5mdW5jdGlvbiByZXN0YXJ0ICgpIHtcbiAgcm91bmQgPSBudWxsO1xuICAkcm91bmRUZXh0LmlubmVySFRNTCA9IHJvdW5kO1xuICByYW5kb21Db2xvckFycmF5ID0gW107XG4gIGFyciA9IG51bGw7XG4gICR0YXBDb3VudC50ZXh0Q29udGVudCA9IG51bGw7XG4gIHdhaXRpbmcgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY2hlY2sgKCkge1xuICAkdGFwQ291bnQudGV4dENvbnRlbnQrKztcbiAgLy9jb25zb2xlLmxvZyhhcnIpO1xuICAvL2NvbnNvbGUubG9nKHJhbmRvbUNvbG9yQXJyYXkpO1xuICBpZiAoYXJyLmxlbmd0aCA9PT0gcmFuZG9tQ29sb3JBcnJheS5sZW5ndGgpIHtcbiAgICBpZiAoYXJyLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gcmFuZG9tQ29sb3JBcnJheVtpbmRleF07XG4gICAgfSkpIHtcbiAgICAgIGNvbnN0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XG4gICAgICBhdWRpby5zcmMgPSAnc3JjL3NvdW5kcy/QnNC+0LvQvtC00YbQsCEubXAzJztcbiAgICAgIGF1ZGlvLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgICRhbGVydExpbmUuaW5uZXJIVE1MID0gJ05pY2UhIF5+Xic7XG4gICAgICByYW5kb21Db2xvckFycmF5ID0gW107XG4gICAgICBhcnIgPSBudWxsO1xuICAgICAgd2FpdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYWxlcnRMaW5lLmlubmVySFRNTCA9ICdZb3UgbG9zdCEgOmMnO1xuICAgICAgcmVzdGFydCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydFJvdW5kICgpIHtcbiAgaWYgKCF3YWl0aW5nKSB7XG4gICAgd2FpdGluZyA9IHRydWU7XG4gICAgcm91bmQrKztcbiAgICBnZXRSYW5kb21Db2xvckFycmF5KHJvdW5kKTtcbiAgICAkdGFwQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICRhbGVydExpbmUuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAkcm91bmRUZXh0LmlubmVySFRNTCA9IHJvdW5kO1xuICAgIGxldCBudW07XG4gICAgbGV0IHRpbWVvdXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZG9tQ29sb3JBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgbnVtID0gcmFuZG9tQ29sb3JBcnJheVtpXTtcbiAgICAgIHRpbWVvdXQgKz0gbW9kZVRpbWVvdXQ7XG4gICAgICAoZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb2xvckZhZGluZygkY29sb3JzW251bV0sIG51bSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgfSkobnVtKTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhcnIgPSBbXTtcbiAgICB9LCBtb2RlVGltZW91dCAqIHJhbmRvbUNvbG9yQXJyYXkubGVuZ3RoKTtcbiAgfVxufVxuXG4kc3RhcnQuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICByZXN0YXJ0KCk7XG4gIGlmICghbW9kZVRpbWVvdXQpIHtcbiAgICBtb2RlVGltZW91dCA9IGVhc3lNb2RlVGltZW91dDtcbiAgICAkY3VycmVudE1vZGVJbmZvLmlubmVySFRNTCA9ICdDdXJyZW50IG1vZGU6IEVhc3knO1xuICB9XG4gIHN0YXJ0Um91bmQoKTtcbn0pO1xuXG4kbmV4dFJvdW5kLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgc3RhcnRSb3VuZCgpO1xufSk7XG5cbiRlYXN5TW9kZS5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCAoKSA9PiB7XG4gIHJlc3RhcnQoKTtcbiAgbW9kZVRpbWVvdXQgPSBlYXN5TW9kZVRpbWVvdXQ7XG4gICRjdXJyZW50TW9kZUluZm8uaW5uZXJIVE1MID0gJ0N1cnJlbnQgbW9kZTogRWFzeSc7XG59KTtcblxuJGhhcmRNb2RlLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgcmVzdGFydCgpO1xuICBtb2RlVGltZW91dCA9IGhhcmRNb2RlVGltZW91dDtcbiAgJGN1cnJlbnRNb2RlSW5mby5pbm5lckhUTUwgPSAnQ3VycmVudCBtb2RlOiBIYXJkJztcbn0pO1xuXG4kcmVkLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMDtcbiAgICBjb2xvckZhZGluZygkcmVkLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMCk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRibHVlLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMTtcbiAgICBjb2xvckZhZGluZygkYmx1ZSwgY29sb3JOdW1iZXIpO1xuICAgIGFyci5wdXNoKDEpO1xuICAgIGNoZWNrKCk7XG4gIH1cbn0pO1xuXG4keWVsbG93LmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMjtcbiAgICBjb2xvckZhZGluZygkeWVsbG93LCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMik7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRncmVlbi5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCAoKSA9PiB7XG4gIGlmIChhcnIpIHtcbiAgICBjb25zdCBjb2xvck51bWJlciA9IDM7XG4gICAgY29sb3JGYWRpbmcoJGdyZWVuLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMyk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRvcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoYXJyKSB7XG4gICAgY29uc3QgY29sb3JOdW1iZXIgPSA0O1xuICAgIGNvbG9yRmFkaW5nKCRvcmFuZ2UsIGNvbG9yTnVtYmVyKTtcbiAgICBhcnIucHVzaCg0KTtcbiAgICBjaGVjaygpO1xuICB9XG59KTtcblxuJHBpbmsuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoYXJyKSB7XG4gICAgY29uc3QgY29sb3JOdW1iZXIgPSA1O1xuICAgIGNvbG9yRmFkaW5nKCRwaW5rLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goNSk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n")},function(module,exports){eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/ODg3YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n")}]);