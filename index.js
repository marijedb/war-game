let deckId
const scoresArray = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const remainingCards = document.getElementById("remaining-cards")
const title = document.getElementById("title")
const computerPoints = document.getElementById("computer-points")
const playerPoints = document.getElementById("player-points")

let pointsComputer = 0;
let pointsPlayer = 0;

drawCardsBtn.disabled = true

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", drawCards)


function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
        .then(res => res.json())
        .then(data => {
            pointsComputer = 0
            pointsPlayer = 0
            title.textContent = "Game of War"
            cardsContainer.children[0].innerHTML = ""
            cardsContainer.children[1].innerHTML = ""
            computerPoints.textContent = "Computer: 0"
            playerPoints.textContent = "You: 0"
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
            title.textContent = compareCards(data.cards[0], data.cards[1])


            if (!data.remaining) {
                drawCardsBtn.disabled = true
                if (pointsComputer > pointsPlayer) {
                    title.textContent = "You lost the game!"
                } else if (pointsComputer < pointsPlayer) {
                    title.textContent = "Hoorah! You won the game! "
                } else {
                    title.textContent = "The game ended in a tie!"
                }
            }
        })
}

function compareCards(card1, card2) {
    const cardOneScore = scoresArray.indexOf(card1.value)
    const cardTwoScore = scoresArray.indexOf(card2.value)

    if (cardOneScore > cardTwoScore) {
        pointsComputer++
        computerPoints.textContent = `Computer: ${pointsComputer}`
        return "Computer wins!"
    } else if (cardOneScore < cardTwoScore) {
        pointsPlayer++
        playerPoints.textContent = `You: ${pointsPlayer}`
        return "You win!"
    } else {
        return "WAR!"
    }
}