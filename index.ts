// Import stylesheets
import './style.css';
import { Colours } from './models/Colours.enum';
import { Player } from './models/Player';

// #region tic tac toe

// NOTE: 'TTT' stands for Tic Tac Toe

// ------- Initialise global variables
// this list is used to store the player and ai's position
// at the start of the game, it will have 9 null elements
let sqList = Array(9).fill(null);

// this list is used to store the square elements
let sqElementList: HTMLElement[] = [];

let isHumanPlayerTurn: boolean = true;

/**
 * Start of the program
 */
function init() {
  createBoard();
}

/**
 * Create the board for the Tic Tac Toe game
 */
function createBoard() {
  const board = document.getElementById('board');

  // create the 9 squares
  for (let i = 0; i < sqList.length; i++) {
    // creating the square
    const sq = document.createElement('div');
    sq.classList.add('square');
    sq.setAttribute('pos', i.toString());

    // when the square is clicked, the playermove() function will execute
    // and we pass the newly created square into the playermove()
    sq.addEventListener('click', function() {
      playerMove(sq);
    });

    sqElementList.push(sq);

    // adding to newly created square into the board
    board.appendChild(sq);
  }
}

/**
 * Fill in the square that the Human player has clicked on with 'X'
 *
 * @param sq the square that the player has clicked on
 */
function playerMove(sq: HTMLElement) {
  // check that player can make a move
  if (isHumanPlayerTurn) {
    // get the pos value from the square
    const pos: number = Number(sq.getAttribute('pos'));
    const hasMoved = move(pos, 'X', sq, true);

    if (hasMoved) {
      // disable the Human player from clicking on the board
      // this is so that the player can't click on the board while the program is calculating the winner and the AI is making its move
      isHumanPlayerTurn = false;

      // call calcWinner() to check if the Human player is the winner
      if (calcWinner() === true) {
        // setting a delay here so that the Human player can see the X drawn onto the screen before the alert is shown
        setTimeout(function() {
          alert('The winner is P1');
        }, 1);
      } else {
        // if Human player is not the winner, then allow the AI to make a move
        // setTimeout() will delays the AI's move onto the board to give the illusion that the AI is 'thinking'
        setTimeout(function() {
          aiMove();

          // once the AI has made its move onto the board, allows the Human player to make a move
          isHumanPlayerTurn = true;
        }, 250);
      }
    }
  }
}

/**
 * Add X or O onto the square
 *
 * @param pos the position of the square on the board
 * @param symbol 'X' for human and 'O' for AI
 * @param isPlayerHuman
 *
 * @return whether the square is filled or not
 */
function move(
  pos: number,
  symbol: string,
  sq: HTMLElement,
  isPlayerHuman: boolean
): boolean {
  // check that the current position is not yet filled by P1 or AI
  // P1 or AI cannot fill in the square if it is already filled in
  if (sqList[pos] === null) {
    sq.textContent = symbol;
    sq.style.color = isPlayerHuman ? 'gold' : 'lightsalmon';

    // fill in the square
    sqList.splice(pos, 1, isPlayerHuman ? 'P1' : 'AI');

    return true;
  }
  return false;
}

/**
 * Calculate the winner for the tic tac toe game using an algorithm
 */
function calcWinner(): boolean {
  const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningPos.length; i++) {
    const [a, b, c] = winningPos[i];
    if (sqList[a] && sqList[a] === sqList[b] && sqList[a] === sqList[c]) {
      return true;
    }
  }
  return false;
}

/**
 * Making the move for the AI
 */
function aiMove() {
  // get all of the elements in sqList that are not yet filled with X or O, and then add it to freeSqList
  let freeSqList = [];

  for (let i = 0; i < sqList.length; i++) {
    if (sqList[i] === null) {
      freeSqList.push(i);
    }
  }

  // randomly selects a number. The range is between 0 to the freeSqList.length
  // e.g. if freeSqList has 3 elements, then it is between 0 and 3. So randIndex is expected to be 0, 1 or 2
  const randIndex = Math.floor(Math.random() * freeSqList.length);

  // randIndex is then used as index for freeSqList
  const pos = freeSqList[randIndex];

  move(pos, 'O', sqElementList[pos], false);

  if (calcWinner() === true) {
    setTimeout(function() {
      alert('The winner is AI');
    }, 1);
  }
}

init();

// #endregion

const colourSelect: HTMLSelectElement = document.getElementById(
  'colour-slt'
) as HTMLSelectElement;
const colourSeelectBtn: HTMLElement = document.getElementById(
  'colourSelect-btn'
);
const rollBtn: HTMLElement = document.getElementById('roll-btn');
const currentPlayer: HTMLElement = document.getElementById('currentPlayer');
const scores: HTMLElement = document.getElementById('scores');
const dice: HTMLElement = document.getElementById('dice');

let isP1Turn: boolean = true;
let p1: Player = new Player();
let p2: Player = new Player();

colourSeelectBtn.addEventListener('click', selectColour);
rollBtn.addEventListener('click', roll);

startDiceGame();

function startDiceGame() {
  //populate colour dropdown list
  let count = 0;
  for (let c in Colours) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      colourSelect.add(newOption);
    }
  }

  if (isP1Turn) {
    currentPlayer.innerHTML = "Player 1's Turn";
  }
}

function selectColour() {
  if (isP1Turn && p1.colour == null) {
    p1.colour =
      Colours[colourSelect.options[colourSelect.selectedIndex].innerHTML];
    changeTurn();
  } else if (!isP1Turn && p2.colour == null) {
    p2.colour =
      Colours[colourSelect.options[colourSelect.selectedIndex].innerHTML];
    changeTurn();
  }
}

function roll() {
  if (isP1Turn && p1.colour == null) {
    alert('Player 1, please select a colour first');
    return;
  } else if (!isP1Turn && p2.colour == null) {
    alert('Player 2, please select a colour first');
    return;
  }

  if (isP1Turn) {
    changeTurn();
  } else {
    changeTurn();
  }
}

function rollDice(sides: number) {
  return 0;
}

function changeTurn() {
  isP1Turn = !isP1Turn;
  if (isP1Turn) {
    dice.style.backgroundColor = p1.colour;
    currentPlayer.innerHTML = "Player 1's Turn";
  } else {
    dice.style.backgroundColor = p2.colour;
    currentPlayer.innerHTML = "Player 2's Turn";
  }
}
