function guessingGame() {
  const numToGuess = Math.floor(Math.random() * 100);
  let numGuesses = 0;
  let gameOver = false;
  return function(guess) {
    if (gameOver) {
      return "The game is over, you already won!";
    }
    numGuesses++;
    if (guess === numToGuess) {
      gameOver = true;
      return `You win! You found ${guess} in ${numGuesses} guesses.`
    } else if (guess < numToGuess) {
      return (`${guess} is too low!`)
    } else {
      return (`${guess} is too high!`)
    }
  }

}

module.exports = { guessingGame };
