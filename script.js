let deckId;
const newDeck = document.getElementById('new-deck');

newDeck.addEventListener('click', handleNewDeck);

function handleNewDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let deckId = data.deck_id;
      console.log(deckId);
    });
}
