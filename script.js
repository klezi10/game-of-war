let deckId;
let computerScore = 0;
let yourScore = 0;
const newDeck = document.getElementById('new-deck');
const drawBtn = document.getElementById('draw-btn');
const cardsHolder = document.getElementById('cards');
const remainingCards = document.getElementById('remaining');
const gameText = document.getElementById('game-header');
const computerScoreTotal = document.getElementById('computer-score');
const yourScoreTotal = document.getElementById('your-score');

newDeck.addEventListener('click', handleNewDeck);

async function handleNewDeck() {
  const response = await fetch(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
  const data = await response.json();
  deckId = data.deck_id;
  remainingCards.textContent = `Remaining cards: ${data.remaining}`;
}

drawBtn.addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
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
        checkForWinner();
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
    computerScore++;
    computerScoreTotal.textContent = computerScore;
    return 'Computer wins!';
  } else if (card1ValueIndex < card2ValueIndex) {
    yourScore++;
    yourScoreTotal.textContent = yourScore;
    return 'You win!';
  } else {
    return 'War!';
  }
}

function checkForWinner() {
  if (computerScore > yourScore) {
    gameText.textContent = `Game over! Computer wins!`;
  } else if (computerScore < yourScore) {
    gameText.textContent = `Game over! You win!`;
  } else {
    gameText.textContent = `Game over! It's a tie!`;
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
