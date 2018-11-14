!function(n){var e={};function t(c){if(e[c])return e[c].exports;var o=e[c]={i:c,l:!1,exports:{}};return n[c].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=n,t.c=e,t.d=function(n,e,c){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:c})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var o in n)t.d(c,o,function(e){return n[e]}.bind(null,o));return c},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(n,e,t){t(1),n.exports=t(2)},function(module,exports){eval("function serviceWorkerRegistr (mode) {\n  if ('serviceWorker' in navigator) {\n    if (mode === 'development')\n      window.addEventListener('load', () => {\n        navigator.serviceWorker.register('service-worker.js');\n      });\n    else\n      navigator.serviceWorker.register('/simon-game/service-worker.js');\n  }\n}\nserviceWorkerRegistr(\"production\");\n\nconst $red = document.querySelector('.red');\nconst $blue = document.querySelector('.blue');\nconst $yellow = document.querySelector('.yellow');\nconst $green = document.querySelector('.green');\nconst $orange = document.querySelector('.orange');\nconst $pink = document.querySelector('.pink');\nconst $start = document.querySelector('.menu__start-button');\nconst $nextRound = document.querySelector('.central-menu__continue-button');\nconst $easyMode = document.querySelector('.easy');\nconst $hardMode = document.querySelector('.hard');\nconst $colors = [$red, $blue, $yellow, $green, $orange, $pink];\nconst easyModeTimeout = 1000;\nconst hardModeTimeout = 300;\nconst $roundText = document.querySelector('.round');\nconst $alertLine = document.querySelector('.canv__alert-info__massage');\nconst $tapCount = document.querySelector('.tap-count');\nconst $currentModeInfo = document.querySelector('.mode__current-mode');\nlet arr = null;\nlet randomColorArray = [];\nlet round = null;\nlet waiting = false;\nlet modeTimeout = null;\nconst fadeUpArray = ['#fc3730', '#3ca5d6', '#fff243', '#46f56b', '#f09951', '#f538bc'];\nconst fadeDownArray = ['#ff6f69', '#69d0ff', '#fff9a4', '#94f8a9', '#f5bb8c', '#f894da'];\n\nfunction colorFading ($element, colorNumber) {\n  $element.style.setProperty('--color', fadeUpArray[colorNumber]);\n  $element.style.setProperty('--shadow', 20 + 'px');\n  setTimeout(() => {\n    $element.style.setProperty('--color', fadeDownArray[colorNumber]);\n    $element.style.setProperty('--shadow', 0 + 'px');\n  }, modeTimeout / 4);\n}\n\nfunction getRandomColorArray (round) {\n  for (let i = 0; i < round; i++) {\n    randomColorArray[i] = Math.floor(Math.random() * $colors.length);\n  }\n  return randomColorArray;\n}\n\nfunction restart () {\n  round = null;\n  $roundText.innerHTML = round;\n  randomColorArray = [];\n  arr = null;\n  $tapCount.textContent = null;\n  waiting = false;\n}\n\nfunction check () {\n  $tapCount.textContent++;\n  if (arr.length === randomColorArray.length) {\n    if (arr.every(function (value, index) {\n      return value === randomColorArray[index];\n    })) {\n      $alertLine.innerHTML = 'Nice! ^~^';\n      randomColorArray = [];\n      arr = null;\n      waiting = false;\n    } else {\n      $alertLine.innerHTML = 'You lost! :c';\n      restart();\n    }\n  }\n}\n\nfunction startRound () {\n  if (!waiting) {\n    waiting = true;\n    round++;\n    getRandomColorArray(round);\n    $tapCount.textContent = 0;\n    $alertLine.innerHTML = null;\n    $roundText.innerHTML = round;\n    let num;\n    let timeout = 0;\n    for (let i = 0; i < randomColorArray.length; i++) {\n      num = randomColorArray[i];\n      timeout += modeTimeout;\n      (function (num) {\n        setTimeout(() => {\n          colorFading($colors[num], num);\n        }, timeout);\n      })(num);\n    }\n    setTimeout(() => {\n      arr = [];\n    }, modeTimeout * randomColorArray.length);\n  }\n}\n\n$start.addEventListener ('click', () => {\n  restart();\n  if (!modeTimeout) {\n    modeTimeout = easyModeTimeout;\n    $currentModeInfo.innerHTML = 'Current mode: Easy';\n  }\n  startRound();\n});\n\n$nextRound.addEventListener ('click', () => {\n  startRound();\n});\n\n$easyMode.addEventListener ('click', () => {\n  restart();\n  modeTimeout = easyModeTimeout;\n  $currentModeInfo.innerHTML = 'Current mode: Easy';\n});\n\n$hardMode.addEventListener ('click', () => {\n  restart();\n  modeTimeout = hardModeTimeout;\n  $currentModeInfo.innerHTML = 'Current mode: Hard';\n});\n\n$red.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 0;\n    colorFading($red, colorNumber);\n    arr.push(0);\n    check();\n  }\n});\n\n$blue.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 1;\n    colorFading($blue, colorNumber);\n    arr.push(1);\n    check();\n  }\n});\n\n$yellow.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 2;\n    colorFading($yellow, colorNumber);\n    arr.push(2);\n    check();\n  }\n});\n\n$green.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 3;\n    colorFading($green, colorNumber);\n    arr.push(3);\n    check();\n  }\n});\n\n$orange.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 4;\n    colorFading($orange, colorNumber);\n    arr.push(4);\n    check();\n  }\n});\n\n$pink.addEventListener ('click', () => {\n  if (arr) {\n    const colorNumber = 5;\n    colorFading($pink, colorNumber);\n    arr.push(5);\n    check();\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzPzkyOTEiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2VydmljZVdvcmtlclJlZ2lzdHIgKG1vZGUpIHtcbiAgaWYgKCdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IpIHtcbiAgICBpZiAobW9kZSA9PT0gJ2RldmVsb3BtZW50JylcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc2VydmljZS13b3JrZXIuanMnKTtcbiAgICAgIH0pO1xuICAgIGVsc2VcbiAgICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcvc2ltb24tZ2FtZS9zZXJ2aWNlLXdvcmtlci5qcycpO1xuICB9XG59XG5zZXJ2aWNlV29ya2VyUmVnaXN0cihwcm9jZXNzLmVudi5OT0RFX0VOVik7XG5cbmNvbnN0ICRyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVkJyk7XG5jb25zdCAkYmx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibHVlJyk7XG5jb25zdCAkeWVsbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnllbGxvdycpO1xuY29uc3QgJGdyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyZWVuJyk7XG5jb25zdCAkb3JhbmdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9yYW5nZScpO1xuY29uc3QgJHBpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGluaycpO1xuY29uc3QgJHN0YXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX3N0YXJ0LWJ1dHRvbicpO1xuY29uc3QgJG5leHRSb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZW50cmFsLW1lbnVfX2NvbnRpbnVlLWJ1dHRvbicpO1xuY29uc3QgJGVhc3lNb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVhc3knKTtcbmNvbnN0ICRoYXJkTW9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYXJkJyk7XG5jb25zdCAkY29sb3JzID0gWyRyZWQsICRibHVlLCAkeWVsbG93LCAkZ3JlZW4sICRvcmFuZ2UsICRwaW5rXTtcbmNvbnN0IGVhc3lNb2RlVGltZW91dCA9IDEwMDA7XG5jb25zdCBoYXJkTW9kZVRpbWVvdXQgPSAzMDA7XG5jb25zdCAkcm91bmRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdW5kJyk7XG5jb25zdCAkYWxlcnRMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhbnZfX2FsZXJ0LWluZm9fX21hc3NhZ2UnKTtcbmNvbnN0ICR0YXBDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXAtY291bnQnKTtcbmNvbnN0ICRjdXJyZW50TW9kZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kZV9fY3VycmVudC1tb2RlJyk7XG5sZXQgYXJyID0gbnVsbDtcbmxldCByYW5kb21Db2xvckFycmF5ID0gW107XG5sZXQgcm91bmQgPSBudWxsO1xubGV0IHdhaXRpbmcgPSBmYWxzZTtcbmxldCBtb2RlVGltZW91dCA9IG51bGw7XG5jb25zdCBmYWRlVXBBcnJheSA9IFsnI2ZjMzczMCcsICcjM2NhNWQ2JywgJyNmZmYyNDMnLCAnIzQ2ZjU2YicsICcjZjA5OTUxJywgJyNmNTM4YmMnXTtcbmNvbnN0IGZhZGVEb3duQXJyYXkgPSBbJyNmZjZmNjknLCAnIzY5ZDBmZicsICcjZmZmOWE0JywgJyM5NGY4YTknLCAnI2Y1YmI4YycsICcjZjg5NGRhJ107XG5cbmZ1bmN0aW9uIGNvbG9yRmFkaW5nICgkZWxlbWVudCwgY29sb3JOdW1iZXIpIHtcbiAgJGVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3InLCBmYWRlVXBBcnJheVtjb2xvck51bWJlcl0pO1xuICAkZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zaGFkb3cnLCAyMCArICdweCcpO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAkZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcicsIGZhZGVEb3duQXJyYXlbY29sb3JOdW1iZXJdKTtcbiAgICAkZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zaGFkb3cnLCAwICsgJ3B4Jyk7XG4gIH0sIG1vZGVUaW1lb3V0IC8gNCk7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yQXJyYXkgKHJvdW5kKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm91bmQ7IGkrKykge1xuICAgIHJhbmRvbUNvbG9yQXJyYXlbaV0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAkY29sb3JzLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHJhbmRvbUNvbG9yQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJlc3RhcnQgKCkge1xuICByb3VuZCA9IG51bGw7XG4gICRyb3VuZFRleHQuaW5uZXJIVE1MID0gcm91bmQ7XG4gIHJhbmRvbUNvbG9yQXJyYXkgPSBbXTtcbiAgYXJyID0gbnVsbDtcbiAgJHRhcENvdW50LnRleHRDb250ZW50ID0gbnVsbDtcbiAgd2FpdGluZyA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjaGVjayAoKSB7XG4gICR0YXBDb3VudC50ZXh0Q29udGVudCsrO1xuICBpZiAoYXJyLmxlbmd0aCA9PT0gcmFuZG9tQ29sb3JBcnJheS5sZW5ndGgpIHtcbiAgICBpZiAoYXJyLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gcmFuZG9tQ29sb3JBcnJheVtpbmRleF07XG4gICAgfSkpIHtcbiAgICAgICRhbGVydExpbmUuaW5uZXJIVE1MID0gJ05pY2UhIF5+Xic7XG4gICAgICByYW5kb21Db2xvckFycmF5ID0gW107XG4gICAgICBhcnIgPSBudWxsO1xuICAgICAgd2FpdGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYWxlcnRMaW5lLmlubmVySFRNTCA9ICdZb3UgbG9zdCEgOmMnO1xuICAgICAgcmVzdGFydCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdGFydFJvdW5kICgpIHtcbiAgaWYgKCF3YWl0aW5nKSB7XG4gICAgd2FpdGluZyA9IHRydWU7XG4gICAgcm91bmQrKztcbiAgICBnZXRSYW5kb21Db2xvckFycmF5KHJvdW5kKTtcbiAgICAkdGFwQ291bnQudGV4dENvbnRlbnQgPSAwO1xuICAgICRhbGVydExpbmUuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAkcm91bmRUZXh0LmlubmVySFRNTCA9IHJvdW5kO1xuICAgIGxldCBudW07XG4gICAgbGV0IHRpbWVvdXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZG9tQ29sb3JBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgbnVtID0gcmFuZG9tQ29sb3JBcnJheVtpXTtcbiAgICAgIHRpbWVvdXQgKz0gbW9kZVRpbWVvdXQ7XG4gICAgICAoZnVuY3Rpb24gKG51bSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb2xvckZhZGluZygkY29sb3JzW251bV0sIG51bSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgfSkobnVtKTtcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBhcnIgPSBbXTtcbiAgICB9LCBtb2RlVGltZW91dCAqIHJhbmRvbUNvbG9yQXJyYXkubGVuZ3RoKTtcbiAgfVxufVxuXG4kc3RhcnQuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICByZXN0YXJ0KCk7XG4gIGlmICghbW9kZVRpbWVvdXQpIHtcbiAgICBtb2RlVGltZW91dCA9IGVhc3lNb2RlVGltZW91dDtcbiAgICAkY3VycmVudE1vZGVJbmZvLmlubmVySFRNTCA9ICdDdXJyZW50IG1vZGU6IEVhc3knO1xuICB9XG4gIHN0YXJ0Um91bmQoKTtcbn0pO1xuXG4kbmV4dFJvdW5kLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgc3RhcnRSb3VuZCgpO1xufSk7XG5cbiRlYXN5TW9kZS5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCAoKSA9PiB7XG4gIHJlc3RhcnQoKTtcbiAgbW9kZVRpbWVvdXQgPSBlYXN5TW9kZVRpbWVvdXQ7XG4gICRjdXJyZW50TW9kZUluZm8uaW5uZXJIVE1MID0gJ0N1cnJlbnQgbW9kZTogRWFzeSc7XG59KTtcblxuJGhhcmRNb2RlLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgcmVzdGFydCgpO1xuICBtb2RlVGltZW91dCA9IGhhcmRNb2RlVGltZW91dDtcbiAgJGN1cnJlbnRNb2RlSW5mby5pbm5lckhUTUwgPSAnQ3VycmVudCBtb2RlOiBIYXJkJztcbn0pO1xuXG4kcmVkLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMDtcbiAgICBjb2xvckZhZGluZygkcmVkLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMCk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRibHVlLmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMTtcbiAgICBjb2xvckZhZGluZygkYmx1ZSwgY29sb3JOdW1iZXIpO1xuICAgIGFyci5wdXNoKDEpO1xuICAgIGNoZWNrKCk7XG4gIH1cbn0pO1xuXG4keWVsbG93LmFkZEV2ZW50TGlzdGVuZXIgKCdjbGljaycsICgpID0+IHtcbiAgaWYgKGFycikge1xuICAgIGNvbnN0IGNvbG9yTnVtYmVyID0gMjtcbiAgICBjb2xvckZhZGluZygkeWVsbG93LCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMik7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRncmVlbi5hZGRFdmVudExpc3RlbmVyICgnY2xpY2snLCAoKSA9PiB7XG4gIGlmIChhcnIpIHtcbiAgICBjb25zdCBjb2xvck51bWJlciA9IDM7XG4gICAgY29sb3JGYWRpbmcoJGdyZWVuLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goMyk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7XG5cbiRvcmFuZ2UuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoYXJyKSB7XG4gICAgY29uc3QgY29sb3JOdW1iZXIgPSA0O1xuICAgIGNvbG9yRmFkaW5nKCRvcmFuZ2UsIGNvbG9yTnVtYmVyKTtcbiAgICBhcnIucHVzaCg0KTtcbiAgICBjaGVjaygpO1xuICB9XG59KTtcblxuJHBpbmsuYWRkRXZlbnRMaXN0ZW5lciAoJ2NsaWNrJywgKCkgPT4ge1xuICBpZiAoYXJyKSB7XG4gICAgY29uc3QgY29sb3JOdW1iZXIgPSA1O1xuICAgIGNvbG9yRmFkaW5nKCRwaW5rLCBjb2xvck51bWJlcik7XG4gICAgYXJyLnB1c2goNSk7XG4gICAgY2hlY2soKTtcbiAgfVxufSk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n")},function(module,exports){eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9zY3NzL3N0eWxlLnNjc3M/ODg3YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n")}]);