// Load saved score from localStorage, or start fresh
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Returns 'Rock', 'Paper' or 'Scissor' at random
function pickComputerMove() {
  const randomNum = Math.random();

  if (randomNum < 1 / 3) {
    return 'Rock';
  } else if (randomNum < 2 / 3) {
    return 'Paper';
  } else {
    return 'Scissor';
  }
}

// Plays one round and updates the score + screen
function playGame(userMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (userMove === computerMove) {
    result = 'Its a tie';
    score.ties++;
  } else if (
    (userMove === 'Rock' && computerMove === 'Scissor') ||
    (userMove === 'Paper' && computerMove === 'Rock') ||
    (userMove === 'Scissor' && computerMove === 'Paper')
  ) {
    result = 'You win';
    score.wins++;
  } else {
    result = 'You lose';
    score.losses++;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();

  document.querySelector('.js-result').innerHTML = `${result}.`;
  document.querySelector('.js-moves').innerHTML =
    `Your move is ${userMove} and Computer's move is ${computerMove}.`;
}

function updateScore() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScore();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

// Hook up the buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('Rock'));
document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('Paper'));
document.querySelector('.js-scissor-button')
  .addEventListener('click', () => playGame('Scissor'));
document.querySelector('.js-reset-button')
  .addEventListener('click', resetScore);

// Show the saved score when the page first loads
updateScore();
