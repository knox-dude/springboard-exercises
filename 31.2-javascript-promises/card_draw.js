const BASE_URL = "https://deckofcardsapi.com/api/deck"
const drawButton = $('#drawButton')[0];
let deck;

async function draw() {
    
    resp = await axios.get(`${BASE_URL}/${deck}/draw/?count=1`);

    if (resp.data.remaining == 50) {
        drawButton.hidden = true;
        drawButton.removeEventListener('click', draw);
    }

    $("body").append(`<img src="${resp.data.cards[0].image}" alt="Photo of ${resp.data.cards[0].code}">`);
}

async function setup() {

    // make a new deck
    let resp = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
    deck = resp.data.deck_id;

    drawButton.addEventListener('click', draw);

}

$(document).ready(setup())