// Part 1: Number Facts
const BASE_URL_PART2 = "https://deckofcardsapi.com/api/deck"
const DRAW_URL_PART2 = "https://deckofcardsapi.com/api/deck/new/draw/?count=1"

$(document).ready(function(){

    //question 1: draw a single card

    axios.get(`${DRAW_URL_PART2}`).then(res => {
        let card = res.data.cards[0]
        console.log(card.value + " of " + card.suit);
    });

    let deck;

    //get a new deck and draw 2 cards
    axios.get(`${BASE_URL_PART2}/new/`)
    .then(res => {
        deck = res.data.deck_id;
        return axios.get(`${BASE_URL_PART2}/${deck}/draw/?count=1`);
    })
    .then(res => {
        let card = res.data.cards[0]
        console.log(card.value + " of " + card.suit);
        return axios.get(`${BASE_URL_PART2}/${deck}/draw/?count=1`);
    })
    .then(res => {
        let card = res.data.cards[0]
        console.log(card.value + " of " + card.suit);
    })
});