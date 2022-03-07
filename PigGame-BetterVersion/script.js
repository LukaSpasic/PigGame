'use strict';
// Functions

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
}

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');

const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const buttonNew = document.querySelector('.btn--new');
const buttonRoll = document.querySelector('.btn--roll');
const buttonHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0.classList.remove('player--winer');
  player1.classList.remove('player--winer');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

// Setting score to zero
score0Element.textContent = 0;
score1Element.textContent = 0;

diceElement.classList.add('hidden');

// Rolling dice

buttonRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Chech for rolled 1
    if (dice != 1) {
      // Add dive to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch players
      currentScore = 0;
      switchPlayer();
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player score
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check score >= 100 win
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      console.log(`Player ${activePlayer + 1} wins!`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // Switch
    else {
      switchPlayer();
    }
  }
});

buttonNew.addEventListener('click', init);
