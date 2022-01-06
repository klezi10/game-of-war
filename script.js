let deckId;
const newDeck = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw-btn');
const cardsHolder = document.getElementById('cards');
const remainingCards = document.getElementById('remaining');
const gameText = document.getElementById('game-header');

newDeck.addEventListener('click', handleNewDeck);

function handleNewDeck() {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      remainingCards.textContent = `Remaining cards: ${data.remaining}`;
    });
}

drawBtn.addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cardsHolder.children[0].innerHTML = `
      <img src=${data.cards[0].image} class="drawn-card" />
      `;
      cardsHolder.children[1].innerHTML = `
      <img src=${data.cards[1].image} class="drawn-card" />
      `;
      const winningText = determineWinningCard(data.cards[0], data.cards[1]);
      gameText.textContent = winningText;
      remainingCards.textContent = `Remaining cards: ${data.remaining}`;
      if (data.remaining === 0) {
        drawBtn.disabled = true;
      }
    });
});

function determineWinningCard(card1, card2) {
  const valueOptions = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'JACK',
    'QUEEN',
    'KING',
    'ACE',
  ];

  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  console.log('card 1:', card1ValueIndex);
  console.log('card 2:', card2ValueIndex);

  if (card1ValueIndex > card2ValueIndex) {
    return 'Computer wins!';
  } else if (card1ValueIndex < card2ValueIndex) {
    return 'You win!';
  } else {
    return 'War!';
  }
}

//========== TESTING =========
// const card1Obj = {
//   value: 'KING',
// };

// const card2Obj = {
//   value: 'KING',
// };

// determineWinningCard(card1Obj, card2Obj);
