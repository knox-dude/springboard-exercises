import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

interface CardProps {
  "code": string,
  "image": string,
  "value": string,
  "suit": string,
}

function CardList() {
  const [deckId, setDeckId] = useState<string>("");
  const [currentCard, setCurrentCard] = useState<CardProps | undefined>();
  const [shuffling, setShuffling] = useState<boolean>(false);
  const [cardsLeft, setCardsLeft] = useState<number>(52);

  // get a deck code once on mount
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeck() {
      const { data } = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeckId(data.deck_id);
    }
    fetchDeck();
  }, []);

  // draw a card, alert if no cards are left in deck
  const drawCard = async function drawCard() {
    const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=13`);
    if (data.success) {
      setCurrentCard(data.cards[0])
      setCardsLeft(data.remaining)
    } else {
      alert("Error: no cards remaining!");
    }
  }

  // shuffle deck when button is pressed
  const shuffleDeck = async function shuffleDeck() {
    setCurrentCard(undefined);
    setShuffling(true);
    const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    if (data.success) {  
      setCardsLeft(data.remaining);
    } else {
      alert("Error on shuffle. Dev, check this out.");
    }
    setShuffling(false);
  }

  // show draw button
  function renderDrawButton() {
    return (
      <button
        onClick={drawCard}
        disabled={shuffling}>
        Draw Card
      </button>
    );
  }

  // show shuffle button
  function renderShuffleButton() {
    return (
      <button onClick={shuffleDeck}>Shuffle Deck</button>
    );
  }

  // show current card
  function renderCard() {
    if (currentCard == null) return;
    return (
      <Card
        code={currentCard.code}
        image={currentCard.image}
        value={currentCard.value}
        suit={currentCard.suit}
      />
    );
  }

  return (
    <div className="CardList">
      <div className="CardList-Buttons">
        {renderDrawButton()}
        {renderShuffleButton()}
      </div>
      {renderCard()}
      <div className="CardList-CardsLeft">
        {cardsLeft} cards left!
      </div>
    </div>
  )
}

export default CardList;