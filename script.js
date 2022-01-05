let deckId;
const newDeck = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw-btn');
const cardsHolder = document.getElementById('cards');

newDeck.addEventListener('click', handleNewDeck);

function handleNewDeck() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      console.log(deckId);
    });
}

drawBtn.addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cardsHolder.children[0].innerHTML = `
      <img src=${data.cards[0].image} />
      `;
      cardsHolder.children[1].innerHTML = `
      <img src=${data.cards[1].image} />
      `;
    });
});
