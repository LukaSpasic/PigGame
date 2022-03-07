'use strict';
// Functions

function changePlayers(player1, player2) {
  player1.classList.remove('player--active');
  player2.classList.add('player--active');
}

const hold0 = function () {
  score0 += currentScore0;
  currentScore0 = 0;
  currentScore0Element.textContent = currentScore0;
  score0Element.textContent = score0;
  player0.classList.remove('player--active');
  player1.classList.add('player--active');
};

const hold1 = function () {
  score1 += currentScore1;
  currentScore1 = 0;
  currentScore1Element.textContent = currentScore1;
  score1Element.textContent = score1;
  changePlayers(player1, player0);
};

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');

const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');
const win = document.querySelector('.wins--btn');

let currentScore0 = 0;
let currentScore1 = 0;

let score0 = 0;
let score1 = 0;

// Setting score to zero
score0Element.textContent = 0;
score1Element.textContent = 0;

diceElement.classList.add('hidden');

// Rolling dice

buttonRoll.addEventListener('click', function () {
  if (score0 >= 100) {
    win.textContent = 'Player 1 wins!!!';
    win.classList.remove('hidden');
    buttonHold.classList.add('hidden');
    buttonRoll.classList.add('hidden');
  } else if (score1 >= 100) {
    win.textContent = 'Player 2 wins!!!';
    win.classList.remove('hidden');
    buttonHold.classList.add('hidden');
    buttonRoll.classList.add('hidden');
  }

  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;

  // 3. Chech for rolled 1
  if (dice === 1 && player0.classList.contains('player--active')) {
    currentScore0 = 0;
    currentScore0Element.textContent = 0;
    changePlayers(player0, player1);
  } else if (dice != 1 && player0.classList.contains('player--active')) {
    currentScore0 += dice;
    currentScore0Element.textContent = currentScore0;
    buttonHold.addEventListener('click', function () {
      score0 += currentScore0;
      currentScore0 = 0;
      currentScore0Element.textContent = currentScore0;
      score0Element.textContent = score0;
      changePlayers(player0, player1);
    });
  } else if (dice === 1 && player1.classList.contains('player--active')) {
    currentScore1 = 0;
    currentScore1Element.textContent = 0;
    changePlayers(player1, player0);
  } else if (dice != 1 && player1.classList.contains('player--active')) {
    currentScore1 += dice;
    currentScore1Element.textContent = currentScore1;
    buttonHold.addEventListener('click', function () {
      score1 += currentScore1;
      currentScore1 = 0;
      currentScore1Element.textContent = currentScore1;
      score1Element.textContent = score1;
      changePlayers(player1, player0);
    });
  }
});

buttonNew.addEventListener('click', function () {
  currentScore0 = 0;
  currentScore1 = 0;
  score0 = 0;
  score1 = 0;

  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  diceElement.classList.add('hidden');
  win.classList.add('hidden');
  buttonHold.classList.remove('hidden');
  buttonRoll.classList.remove('hidden');
});
