const cellsEl = document.querySelectorAll('.cell');

let options = ["", "", "", "", "", "", "", "", "",]

let playingGame = true

const pattern = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

let currentPlayer = "♚";

cellsEl.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    const index = e.target.getAttribute('cellIndex');
    makeMoves(e, index);
    checkWinner();
  })
})

function makeMoves(cell, index){
  if(options[index] != '' || !playingGame){
    return
  }

  options[index] = currentPlayer;
  cell.target.innerText = currentPlayer;
}

function checkWinner(){
  let gameWon = false

  for(let i = 0; i < pattern.length; i++){
    const [a,b,c] = pattern[i];
    if(options[a] === "" || options[b] === "" || options[c] === ""){
      continue;
    }

    if(options[a] === options[b] && options[a] === options[c]){
      highlighCells(a, b, c);
      gameWon = true;
      break;
    }
  }

  if(gameWon){
    document.querySelector('.result').innerHTML = `Player ${currentPlayer} Won!`
    playingGame = false
    return
  }

  if (!options.includes('')) {
    document.querySelector('.result').innerHTML= 'It\'s a Draw! 🤝';
    playingGame = false;
    return;
  }

  currentPlayer = (currentPlayer == "♚") ? "♘" : "♚";
  document.querySelector('.result').innerHTML = `Player ${currentPlayer}'s Turn`
}

function highlighCells(a, b, c){
  cellsEl.forEach((cell) => {
    const index = cell.getAttribute('cellIndex');
    if(index == a || index == b || index == c) {
      cell.classList.add('pattern')
    }
  })
}

function reset(){
  options = ["", "", "", "", "", "", "", "", "",]
  currentPlayer = '♚';
  playingGame = true

  cellsEl.forEach((cell) => {
    cell.innerHTML = '';
    cell.classList.remove('pattern');
  })
}

document.querySelector('.reset-btn').addEventListener('click', () => {
  reset()
  document.querySelector('.result').innerHTML = `Player ${currentPlayer}'s Turn`
})