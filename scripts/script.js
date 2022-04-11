let area = document.getElementById('area');
let cell = document.getElementsByClassName('cell');
let resetButton = document.querySelector('.reset-button');
let res = document.querySelector('.res');
let playerOne = {  x: `<svg id="cross" class="cross"><line class="first" x1="15" y1="15" x2="100" y2="100" stroke="salmon" stroke-width="10" stroke-linecap="round"/></line><line class="second" x1="100" y1="15" x2="15" y2="100" stroke="salmon" stroke-width="10" stroke-linecap="round"></line></svg>`}
let playerTwo = { o: `<svg id="circle" class="circle"><circle r="50" cx="80" cy="65" stroke="#6495ED" stroke-width="10" fill="none" stroke-linecap="round"/></circle></svg>`}
let player = playerOne;

const winIndex = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  
];
function drawField(fieldSize) {
for (let i = 0; i <= fieldSize; i++) {
  area.innerHTML += "<div class='cell' pos=" + i +"></div>";
} 
}
drawField(8);

resetButton.addEventListener('click', function() {
	 res.innerText = '';
   for (let i = 0; i < cell.length; i++) {           
    cell[i].innerHTML = '';
    cell[i].classList.remove("x", "o", "active");
    cell[i].addEventListener('click', cellClick);
  }});

for (let i = 0; i <= cell.length; i++) {
     cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {
  
   var data = [];
  
   if(!this.innerHTML) {
     let keys = Object.keys(player)
    this.innerHTML = (player[keys[0]]);
     this.classList.add(Object.keys(player));
  }  else {
    alert("Ячейка занята!");
   return;
  }  
  for (let kes = 0; kes < cell.length; kes++) {
    if (cell[kes].classList.contains(Object.keys(player))) {
   data.push(parseInt(cell[kes].getAttribute('pos')));
}
    
 }
  
   for (let qwinIndex in winIndex) {

       if (cell[winIndex[qwinIndex][0]].classList.contains(Object.keys(player)) && 
           cell[winIndex[qwinIndex][1]].classList.contains(Object.keys(player)) && 
           cell[winIndex[qwinIndex][2]].classList.contains(Object.keys(player))) 
    {
     
    setTimeout(() => {
       cell[winIndex[qwinIndex][0]].classList.add('active');
       cell[winIndex[qwinIndex][1]].classList.add('active');
       cell[winIndex[qwinIndex][2]].classList.add('active');
    }, 10);
    }
 }
  
  if(checkWin(data)) {
    restart(`Winner is ${(Object.keys(player))[0].toUpperCase()}!`);

  } else {
    let draw = true;
    for(var ves in cell) {
     if(cell[ves].innerHTML == '') draw = false;
    }
    if(draw) {
      restart("Ничья!");
    }
  }
    player = player == playerOne ? playerTwo : playerOne;
}

function checkWin(data) {
  for(let i in winIndex) {
    var win = true;
    for (let j in winIndex[i]) {
      let id = winIndex[i][j];
      let ind = data.indexOf(id);
      if(ind == -1) {
        win = false
      }
    }
    if(win)
      return true;
  }
return false;
  
}

function restart(text) {
      res.innerText = text;
        for(let k = 0; k < cell.length; k++){
  cell[k].removeEventListener("click", cellClick);
        }
}


