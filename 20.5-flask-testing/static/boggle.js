class Boggle {

  constructor() {
    this.board = $("#boggle");
    $(".guess-form", this.board).on("submit", this.guess.bind(this));
  }
  
  async guess(evt) {
    evt.preventDefault();
    const $guess = $(".guess", this.board);
    let guess = $guess.val();
    const response = await axios.get("/check-guess", {params: {guess:guess}})
    $(".msg", this.board).text(`You guessed ${guess} and the response was ${response.data.result}`)
  }
}
