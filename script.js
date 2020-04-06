document.body = document.createElement("body");
document.body.id = "main";
const main = document.getElementById("main");
main.onload = renderBoard();

function getAndSetTime(reset, save) {
  let time = localStorage.getItem("time");
  if (reset || localStorage.getItem("time") === undefined) {
    localStorage.setItem("time", Date.now());
    time = localStorage.getItem("time");
  }
  if (typeof save === "number") {
    localStorage.setItem("time", save);
    time = localStorage.getItem("time");
  }
  return time;
}

function playPause(toggle) {
  let state = localStorage.getItem("state");
  switch (state) {
    case "false":
      state = false;
      break;
    case "true":
      state = true;
      break;
    default:
      state = true;
      break;
  }
  if (toggle) {
    localStorage.setItem("state", !state);
    return !state;
  }
  localStorage.setItem("state", state);
  return state;
}

function readAndSaveReults(read, save) {
  let best = localStorage.getItem("best", "");
}

function showTime() {
  if (playPause()) {
    let now = Date.now();
    let timeStart = getAndSetTime();
    let s = Math.round((now - timeStart) / 1000);
    let m = Math.floor(s / 60);
    s = s % 60;
    let h = 0;
    let time = "Время: " + m + ":" + s + " ";
    document.getElementById("timeLbl").innerText = time;
  }
  movesLbl.innerText = `Ходов: ${movesCounter()}`;
  setTimeout(showTime, 0);
}

showTime();

function movesCounter(plusOne, reset) {
  let moves = +localStorage.getItem("moves");
  if (reset || localStorage.getItem("moves") === undefined) {
    localStorage.setItem("moves", 0);
    moves = +localStorage.getItem("moves");
  }
  if (plusOne) {
    moves += 1;
    localStorage.setItem("moves", `${moves}`);
  }
  return moves;
}

function renderBoard(num, dim, end) {
  if (end) {
  }
  let n = 16;
  if (typeof dim === "number") {
    n = dim * dim;
  }
  let solved = [];
  for (let i = 1; i <= n; i++) {
    solved.push(i);
  }
  getAndSetTime();
  movesCounter();
  let ScWidth = window.screen.width;
  let ScHeight = window.screen.height;
  let styleSh = document.styleSheets;
  if (ScWidth <= 500) {
    styleSh[0].insertRule(
      `.row { width: ${(ScWidth / 1.9) * (1 + Math.sqrt(n) / 10)}px;
              height: ${ScHeight / (6 + Math.sqrt(n))}px;}`,
      styleSh[0].rules.length
    );
    styleSh[0].insertRule(
      `.box { width: ${
        (((ScWidth / 1.9) * (1 + Math.sqrt(n) / 10)) / Math.sqrt(n)) * 0.97
      }px;
              height: ${(ScHeight / (6 + Math.sqrt(n))) * 0.96}px;}`,
      styleSh[0].rules.length
    );
  } else {
    styleSh[0].insertRule(
      `.row { width: ${(ScWidth / 3) * (1 + Math.sqrt(n) / 10)}px;
              height: ${ScHeight / (6 + Math.sqrt(n))}px;}`,
      styleSh[0].rules.length
    );
    styleSh[0].insertRule(
      `.box { width: ${
        (((ScWidth / 3) * (1 + Math.sqrt(n) / 10)) / Math.sqrt(n)) * 0.97
      }px;
              height: ${(ScHeight / (6 + Math.sqrt(n))) * 0.96}px;}`,
      styleSh[0].rules.length
    );
    styleSh[0].insertRule(
      `.labels {height: ${(ScHeight / (6 + Math.sqrt(n))) * 0.8}px;}`,
      styleSh[0].rules.length
    );
  }
  let buttonBar = document.createElement("div");
  buttonBar.classList.add("row");
  buttonBar.classList.add("labels");
  let newGameBt = document.createElement("button");
  newGameBt.id = "newGameBt";
  newGameBt.classList.add("button");
  newGameBt.innerText = "New Game";
  newGameBt.onmousedown = function newGame() {
    renderBoard();
    getAndSetTime(true);
    movesCounter(false, true);
    if (!playPause()) {
      playPause(true);
    }
  };
  buttonBar.appendChild(newGameBt);
  let stopBt = document.createElement("button");
  stopBt.id = "stopBt";
  stopBt.classList.add("button");
  stopBt.onmousedown = function stop() {
    if (playPause()) {
      let temp = Date.now() - getAndSetTime();
      getAndSetTime(false, temp);
      playPause(true);
      stopBt.innerText = "Resume";
    } else {
      playPause(true);
      stopBt.innerText = "Stop";
      let temp = Date.now() - getAndSetTime();
      getAndSetTime(false, temp);
    }
  };
  stopBt.innerText = "Stop";
  buttonBar.appendChild(stopBt);
  let saveBt = document.createElement("button");
  saveBt.id = "saveBt";
  saveBt.classList.add("button");
  saveBt.onmousedown = function save() {
    readAndSaveReults(false, numbers);
  };
  saveBt.innerText = "Save Results";
  buttonBar.appendChild(saveBt);
  let resultsBt = document.createElement("button");
  resultsBt.id = "resultsBt";
  resultsBt.classList.add("button");
  resultsBt.innerText = "Show Results";
  buttonBar.appendChild(resultsBt);
  let m = document.getElementById("main");
  m.innerHTML = "";
  let movesLbl = document.createElement("label");
  movesLbl.id = "movesLbl";
  movesLbl.innerText = `Ходов: ${movesCounter()}`;
  let timeLbl = document.createElement("label");
  timeLbl.id = "timeLbl";
  timeLbl.innerText = `Время: 0:0`;
  let labelBar = document.createElement("div");
  labelBar.id = "labelBar";
  labelBar.classList.add("row");
  labelBar.classList.add("labels");
  let currentFieldRow = document.createElement("div");
  currentFieldRow.id = "currentFieldRow";
  currentFieldRow.classList.add("row");
  currentFieldRow.classList.add("labels");
  let currentFieldDim = document.createElement("label");
  currentFieldDim.innerText = `Размер поля: ${Math.sqrt(n)}х${Math.sqrt(n)}`;
  currentFieldRow.id = "currentFieldRow";
  currentFieldRow.appendChild(currentFieldDim);
  let dimBar = document.createElement("div");
  dimBar.id = "dimBar";
  dimBar.classList.add("row");
  dimBar.classList.add("labels");
  let dimensions = document.createElement("label");
  dimensions.id = "dimensions";
  dimensions.innerText = "Другие размеры: ";
  dimBar.appendChild(dimensions);
  let x3 = document.createElement("a");
  x3.id = "x3";
  x3.onmousedown = function threeBLocks() {
    renderBoard(0, 3);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x3.innerText = " 3x3 ";
  dimBar.appendChild(x3);
  let x4 = document.createElement("a");
  x4.id = " x4 ";
  x4.onmousedown = function threeBLocks() {
    renderBoard(0, 4);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x4.innerText = " 4x4 ";
  dimBar.appendChild(x4);
  let x5 = document.createElement("a");
  x5.id = "x5";
  x5.onmousedown = function threeBLocks() {
    renderBoard(0, 5);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x5.innerText = " 5x5 ";
  dimBar.appendChild(x5);
  let x6 = document.createElement("a");
  x6.id = "x6";
  x6.onmousedown = function threeBLocks() {
    renderBoard(0, 6);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x6.innerText = " 6x6 ";
  dimBar.appendChild(x6);
  let x7 = document.createElement("a");
  x7.id = "x7";
  x7.onmousedown = function threeBLocks() {
    renderBoard(0, 7);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x7.innerText = " 7x7 ";
  dimBar.appendChild(x7);
  let x8 = document.createElement("a");
  x8.id = "x8";
  x8.onmousedown = function threeBLocks() {
    renderBoard(0, 8);
    getAndSetTime(true);
    movesCounter(false, true);
  };
  x8.innerText = " 8x8 ";
  dimBar.appendChild(x8);
  labelBar.appendChild(timeLbl);
  labelBar.appendChild(movesLbl);
  m.appendChild(buttonBar);
  m.appendChild(labelBar);
  let numbers = [];
  if (!Array.isArray(num)) {
    for (let i = 0; i < n; i++) {
      numbers.push({ index: Math.random() * 16, value: i });
    }
    numbers.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      }
      if (a.index < b.index) {
        return -1;
      }
    });
  } else if (readAndSaveReults()) {
    
  }
  else {
    numbers = num;
  }
  const main = document.getElementById("main");
  const rows = [];
  for (let i = 0; i < Math.sqrt(n); i += 1) {
    rows.push([]);
  }
  let rowNumber = 0;
  let cent = "central";
  let count = 0;
  for (let j = 0; j < numbers.length; j += 1) {
    if (count === Math.sqrt(n)) {
      rowNumber += 1;
      count = 0;
    }
    count++;
    const el = document.createElement("div");
    const central = document.createElement("span");
    if (numbers[j].value != 0) {
      central.innerText = numbers[j].value;
    }
    el.id = numbers[j].value;
    el.classList.add(numbers[j].value);
    central.classList.add(numbers[j].value);
    el.onmousedown = function handleClick(e) {
      if (e.target.className.includes("move") && playPause()) {
        movesLbl.innerText = `Ходов: ${movesCounter(true)}`;
        let zero = document.getElementById("0");
        let el = e.target;
        if (el.tagName == "SPAN") {
          el = el.parentElement;
        }
        let empty = document.createElement("div");
        let parentEl = el.parentElement;
        let parentZero = zero.parentElement;
        parentZero.replaceChild(empty, zero);
        let temp = parentEl.replaceChild(zero, el);
        parentZero.replaceChild(temp, empty);
        let arr = document.getElementsByClassName("move");
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove("move");
        }
        el.classList.remove("move");
        for (let i = 0; i < numbers.length; i++) {
          let temp = 0;
          if (numbers[i].value == zero.id) {
            numbers[i].value = +el.id;
            temp = numbers[i].index;
          }
          if (numbers[i].value == el.id && numbers[i].index !== temp) {
            numbers[i].value = +zero.id;
          }
        }
        let isItOver = true;
        for (let i = 0; i < solved.length - 1; i++) {
          if (solved[i] !== numbers[i].value) {
            isItOver = false;
          }
        }

        renderBoard(numbers, Math.sqrt(n), isItOver);
      }
    };
    central.classList.add("central");
    el.appendChild(central);
    el.classList.add("box");
    rows[rowNumber].push(el);
  }
  for (let i = 0; i < rows.length; i += 1) {
    let row = document.createElement("div");
    for (let j = 0; j < rows[i].length; j += 1) {
      if (rows[i][j].id == 0) {
        if (rows[i][j - 1] !== undefined) {
          rows[i][j - 1].classList.toggle("move");
          rows[i][j - 1].children[0].classList.toggle("move");
        }
        if (rows[i][j + 1] !== undefined) {
          rows[i][j + 1].classList.toggle("move");
          rows[i][j + 1].children[0].classList.toggle("move");
        }
        if (i !== 0) {
          if (rows[i - 1][j] !== undefined) {
            rows[i - 1][j].classList.toggle("move");
            rows[i - 1][j].children[0].classList.toggle("move");
          }
        }
        if (i !== rows.length - 1) {
          if (rows[i + 1][j] !== undefined) {
            rows[i + 1][j].classList.toggle("move");
            rows[i + 1][j].children[0].classList.toggle("move");
          }
        }
      }
      row.appendChild(rows[i][j]);
    }
    row.classList.add("row");
    main.appendChild(row);
  }
  m.appendChild(currentFieldRow);
  m.appendChild(dimBar);
}
