document.body = document.createElement("body");
document.body.id = "main";
const main = document.getElementById("main");
main.onload = renderBoard();

function renderBoard(num) {
  let m = document.getElementById('main');
  m.innerHTML = '';
  let numbers = [];
  if (num === undefined) {
    for (let i = 0; i < 16; i++) {
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
  } else {
    numbers = num;
  }
  const main = document.getElementById("main");
  const rows = [];
  for (let i = 0; i < 4; i += 1) {
    rows.push([]);
  }
  let rowNumber = 0;
  let cent = "central";
  let count = 0;
  for (let j = 0; j < numbers.length; j += 1) {
    if (count === 4) {
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
      if (e.target.className.includes("move")) {
        let zero = document.getElementById("0");
        let el = e.target;
        if (el.tagName == 'SPAN') {
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
      renderBoard(numbers);
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
          console.log( rows[i][j - 1].children[0])
          rows[i][j - 1].children[0].classList.toggle('move');
        }
        if (rows[i][j + 1] !== undefined) {
          rows[i][j + 1].classList.toggle("move");
          rows[i][j + 1].children[0].classList.toggle('move');
        }
        if (i !== 0) {
          if (rows[i - 1][j] !== undefined) {
            rows[i - 1][j].classList.toggle("move");
            rows[i - 1][j].children[0].classList.toggle('move');
          }
        }
        if (i !== rows.length - 1) {
          if (rows[i + 1][j] !== undefined) {
            rows[i + 1][j].classList.toggle("move");
            rows[i + 1][j].children[0].classList.toggle('move');
          }
        }
      }
      row.appendChild(rows[i][j]);
    }
    row.classList.add("row");
    main.appendChild(row);
  }
}


