let deckId
const scoresArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const remainingCards = document.getElementById("remaining-cards")
drawCardsBtn.disabled = true

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", drawCards)


function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
        .then(res => res.json())
        .then(data => {
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            deckId = data.deck_id
            drawCardsBtn.disabled = false
        })
}

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            remainingCards.textContent = `Remaining Cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" alt='${data.cards[0].value} of ${data.cards[0].suit}'>
            `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" alt='${data.cards[1].value} of ${data.cards[1].suit}'>
            `
            document.getElementById("title").textContent = compareCards(data.cards[0], data.cards[1])
            if(!data.remaining) {
                drawCardsBtn.disabled = true
            }
        })
}

function compareCards(card1, card2) {
    const cardOneScore = scoresArray.indexOf(card1.value)
    const cardTwoScore = scoresArray.indexOf(card2.value)

    if (cardOneScore > cardTwoScore) {
        return "Computer wins!"
    } else if (cardOneScore < cardTwoScore) {
        return "You win!"
    } else {
        return "WAR!"
    }
}