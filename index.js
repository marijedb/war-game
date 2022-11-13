let deckId
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
drawCardsBtn.disabled = true

newDeckBtn.addEventListener("click", handleClick)
drawCardsBtn.addEventListener("click", drawCards)


function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            drawCardsBtn.disabled = false
        })
}

function drawCards(){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
            <img src=${data.cards[0].image} class="card" alt='${data.cards[0].value} of ${data.cards[0].suit}'>
            `
            cardsContainer.children[1].innerHTML = `
            <img src=${data.cards[1].image} class="card" alt='${data.cards[1].value} of ${data.cards[1].suit}'>
            `
        })
}