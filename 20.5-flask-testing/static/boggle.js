class Boggle {

  /**
   * Builds the boggle object
   * 
   * @param {number} [seconds=60] The amount of time the user has to guess words
   */
  constructor(seconds=60) {
    this.board = $("#boggle");
    this.seconds=seconds
    this.score = 0;
    this.correct_guesses = new Set();

    this.timer = setInterval(this.tick.bind(this), 1000);

    $(".guess-form", this.board).on("submit", this.handle_submit_guess.bind(this));
  }
  
  /**
   * Handles a submit guess event from the .guess form
   * 
   * @param {Event} evt 
   */
  async handle_submit_guess(evt) {
    evt.preventDefault();

    const $guess = $(".guess", this.board);
    let guess = $guess.val().toLowerCase();
    $(".guess", this.board).val("")

    const response = await axios.get("/check-guess", {params: {guess:guess}})
    const text_of_response = response.data.result

    if (this.correct_guesses.has(guess)) {
      this.show_message(guess, text_of_response, true)
    } else {
      this.show_message(guess, text_of_response)
    }
  
    if (text_of_response === "ok" && !(this.correct_guesses.has(guess))) {
      this.correct_guess(guess);
    } 
  }

  /**
   * Handles a correct guess from the user
   * 
   * @param {String} guess - the user's guess in text
   */
  correct_guess(guess) {
    $(".correct-guesses", this.board).append(`<li>${guess.toUpperCase()} - ${guess.length} points</li>`)
    this.score += guess.length;
    this.correct_guesses.add(guess)
    $("#score", this.board).text(this.score);
  }

  /**
   * Shows the message after a user's guess
   * 
   * @param {String} guess - the user's guess
   * @param {String} response - the response to user's guess (ok, not-word, or not-on-board)
   * @param {Boolean} already_guessed - true if user has input guess before
   */
  show_message(guess, response, already_guessed=false) {
    guess = guess.toUpperCase();
    if (already_guessed) {
      $(".msg", this.board).text(`You've already guessed ${guess}`)
      return
    }
    if (response === "not-word") {
      $(".msg", this.board).text(`You guessed ${guess} which is not a word.`)
    } else if (response === "not-on-board") {
      $(".msg", this.board).text(`You guessed ${guess} which is not a possible word for this board.`)
    } else {
      $(".msg", this.board).text(`You guessed ${guess} - It's a correct word!!`)
    }
  }

  /**
   * Updates the timer on the frontend
   */
  show_timer() {
    $("#timer", this.board).text(this.seconds);
  }

  /**
   * Ticks timer down and handles when timer is 0
   */
  async tick() {
    this.seconds -= 1;
    this.show_timer();

    if (this.seconds === 0) {
      clearInterval(this.timer);
      await this.post_score();
    }
  }

  /** Updates frontend with new high score and nplays */
  update_plays_highscore(nplays, highscore=-1) {
    if (!highscore == -1) {
      $(".highscore", this.board).text(`${highscore}`);
    }
    $(".nplays", this.board).text(`${nplays}`);
  }

  /**
   * Sends a post request with user's high score then updates the frontend
   */
  async post_score() {

    $(".guess-form", this.board).hide();

    const response = await axios.post("/post-score", {score:this.score});
    console.log(response.data);
    console.log(response.data.nplays);

    if (response.data.newRecord) {
      $(".msg", this.board).text(`New high score: ${this.score}`)

      this.update_plays_highscore(response.data.nplays, this.score)
    }
    else {
      $(".msg", this.board).text(`Final score: ${this.score}`)

      this.update_plays_highscore(response.data.nplays)
    }
  }
}
