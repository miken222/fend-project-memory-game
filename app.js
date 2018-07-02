/*
 * Create a list that holds all of your cards
 */
let cards = [
  'diamond',
  'diamond',
  'paper-plane-o',
  'paper-plane-o',
  'anchor',
  'anchor',
  'bolt',
  'bolt',
  'cube',
  'cube',
  'leaf',
  'leaf',
  'bicycle',
  'bicycle',
  'bomb',
  'bomb'
];


/*
 *
 * Display cards on the page
 *
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const shuffledDeck = shuffle(cards);


// Create a documentFragment to store cards before displaying
const fragment = document.createDocumentFragment();


// Loop through each card and create its HTML
for (let i = 0; i < shuffledDeck.length; i++) {
  let newCard = document.createElement('LI');
  newCard.classList.add('card');
  let cardContents = '<i class = "fa fa-' + shuffledDeck[i] + '"></i>';
  newCard.innerHTML = cardContents;

  fragment.appendChild(newCard);
}

// Add each card's HTML to the page for display
document.querySelector('.deck').appendChild(fragment);


/*
 *
 * Set up timer
 *
 * Used resource:
 * https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
 *
 */

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

function setTime() {
  totalSeconds++;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

setInterval(setTime, 1000)

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function displayCardSymbol(selectedCard) {
  selectedCard.classList.add('open', 'show')
}

function addToListOfOpenCards(selectedCard) {
  openCards.push(selectedCard);
  return openCards
}

function matched() {
  openCards.forEach(function(elem) {
    elem.classList.remove('open', 'show');
    elem.classList.add('match')
  });
  openCards.pop();
  openCards.pop();
  return openCards
}

function matchedCounter() {
  numMatched += 2;
  if (numMatched < cards.length) {
    return numMatched;
  } else {
    setTimeout('winningMessage()', 500);
  };
}

function winningMessage() {
  if (window.confirm('Congratulations!!! You completed the matching game in '
  + numMoves + ' moves and ' + minutesLabel.innerHTML + ':'
  + secondsLabel.innerHTML + '. You earned ' + numStars + ' stars! Would you'
  + 'like to play again?')) {
    location.reload()
  }
};

function noMatch() {
  openCards.forEach(function(elem) {
    elem.classList.remove('open', 'show')
  });
  openCards.pop();
  openCards.pop();
  return openCards
}

function incrMovesCounter() {
  numMoves++;
  document.querySelector('.moves').innerText = numMoves;
  return numMoves
}

function starRankDecr() {
  numStars--;
  const starList = document.querySelector('.stars');
  let starToBeRemoved = starList.lastElementChild;
  starList.removeChild(starToBeRemoved);
  return numStars
  }


let openCards = [];
let numMoves = 0;
let numMatched = 0;
let numStars = 3;


// Set up even listener for each card
const cardArray = document.querySelectorAll('.card');

cardArray.forEach(function(elem) {
  elem.addEventListener('click', function() {
    // Display selected card
    displayCardSymbol(elem);

    // Add the card to a *list* of "open" cards
    addToListOfOpenCards(elem);

    // Check if the list already has another card
    if (openCards.length === 2) {
      // Check if the cards match
      if (openCards[0].innerHTML === openCards[1].innerHTML) {
        // Cards match - lock in open position
        matched();
        // Increment number of cards matched & check for completion
        numMatched = matchedCounter();
      } else {
          // Cards do not match - remove from openCards and hide symbol
          setTimeout('noMatch()', 750);
          // Increment number of moves
          numMoves = incrMovesCounter();
          // If appropriate decrement number of stars
          if (numMoves === 6 || numMoves === 10) {
            numStars = starRankDecr()
          };
        };
    };
  });
});

/*
 *
 *  Set up even listener for reloading the game
 *
 */

const reloadGame = document.querySelector('.restart');

reloadGame.addEventListener('click', function() {
  location.reload()
});
