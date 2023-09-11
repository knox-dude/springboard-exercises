const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  idCounter = 0
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.id = idCounter;
    idCounter++;

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let clickedCards = [];

function handleCardClick(event) {
  // Set the background color
  event.target.style.backgroundColor = event.target.className;

  if (clickedCards.length != 0 && clickedCards[0].id == event.target.id) {
    return; // Ignore event if user clicks the same card
  }
  if (event.target.dataset.clicked == 'true') {
    return; // Ignore event if user clicks an already matched card
  }
  clickedCards.push(event.target); // Add to array for processing
  if (clickedCards.length == 2) {
    let cardsToFlip = clickedCards.slice(); // copy array so the contents don't disappear
    clickedCards = [];
    if (cardsToFlip[0].className != cardsToFlip[1].className) {
      setTimeout(function() {
        for (card of cardsToFlip) {
          if (!card.dataset.clicked) {
            card.style.backgroundColor = "white";
          }
        }
      }, 1000)
    } else {
      for (card of cardsToFlip) {
        card.dataset.clicked = 'true';
      }
    }
  }
  // clickedCards.add(event.target.className);
}

// when the DOM loads
createDivsForColors(shuffledColors);
