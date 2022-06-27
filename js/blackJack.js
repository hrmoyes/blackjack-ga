// Blackjack game


document.addEventListener("DOMContentLoaded", () => {

const blackJackBtn = document.getElementById("play-blackjack")

blackJackBtn.addEventListener("click", () => {
    console.log("clicked")
    fetch("js/cards.json")
        .then(res => res.json())
        .then(json => shuffle(json))
        .catch()
drawGameBoard()
})

const winLoss = document.getElementById("win-loss-msg")
let bank = 500;
let currentPot = 0;
const bankInfo = document.getElementById("bank")
const potInfo = document.getElementById("pot")

bankInfo.innerText = `Bank: $${bank}`

const chipFive = document.getElementById("chip-5")
const chipTen = document.getElementById("chip-10")
const chipTwentyFive = document.getElementById("chip-25")
const chipHundred = document.getElementById("chip-100")
const removeBets = document.getElementById("remove-bets")


chipFive.addEventListener("click", () => addToPot(5))
chipTen.addEventListener("click", () => addToPot(10))
chipTwentyFive.addEventListener("click", () => addToPot(25))
chipHundred.addEventListener("click", () => addToPot(100))
removeBets.addEventListener("click", () => resetPot())

function addToPot(money) {
    console.log("add " + money)
        if (bank >= money) {
        currentPot += money;
        potInfo.innerText = `$${currentPot}`
        bank -= money
        bankInfo.innerText = `Bank: $${bank}`
        } else {
            console.log("Insufficent funds")
        }
}

function resetPot() {
    bank += currentPot;
    bankInfo.innerText = `Bank: $${bank}`
    currentPot = 0
    potInfo.innerText = `$${currentPot}`
}


function winRound() {
    bank += currentPot*2
    bankInfo.innerText = `Bank: $${bank}`
    currentPot = 0
    potInfo.innerText = `$${currentPot}`
    setTimeout(() => cleanUp(), 5500)
}

function loseRound() {
    currentPot = 0
    potInfo.innerText = `$${currentPot}`
    setTimeout(() => cleanUp(), 5500)
}

function pushRound() {
    resetPot()
    setTimeout(() => cleanUp(), 5500)
}

function cleanUp() {
    if (bank == 0) {
        gameOver()
    }
    document.getElementById("dealer-hand").innerHTML = ""
    document.getElementById("player-hand").innerHTML = ""
    playerHand = []
    dealerHand = []

    playerAces = 0;
    dealerAces = 0;
    if (currentDeck.length < 20) {
        fetch("js/cards.json")
        .then(res => res.json())
        .then(json => shuffle(json))
    }
    showChips()
    for (let i = 0; i < options.length; i++) {
        options[i].style.display = 'none';
    }
    document.getElementById('deal').style.display = "flex"
    // for (let i = 0; i < playControls.length; i++) {
    //     playControls[i].style.display = 'flex';
    //   }
}

function gameOver() {
    endGame()
    document.getElementById("bank-empty").style.display = "flex"
    document.getElementById("blackjack-controls").style.display = "none"
}


currentDeck = []

const shuffle = (cardArray) => {
    let currentCard = cardArray.length, randomCard;

    // while there are still cards to shuffle:
    while (currentCard != 0) {

        // pick a remaining card
        randomCard = Math.floor(Math.random() * currentCard);
        currentCard -= 1;

        [cardArray[currentCard], cardArray[randomCard]] = [cardArray[randomCard], cardArray[currentCard]];
    }
    currentDeck = cardArray
    console.log(currentDeck)
}

const options = document.getElementsByClassName('options')
function drawGameBoard() {
    const game = document.getElementById('canvas')
    const ctx = game.getContext('2d')

    game.setAttribute('width', '800px')
    game.setAttribute('height', '500px')

    ctx.width = game.width
    ctx.height = game.height

   
    let table = document.getElementById('blackjack-table')
    ctx.drawImage(table, 0, 0, 800, 500)
    document.getElementById('blackjack-controls').style.display = "flex"
    for (let i = 0; i < options.length; i++){
        options[i].style.display = 'none'
    }
    document.getElementById('bank').style.display = 'flex'
    document.getElementById('pot').style.display = 'flex'
};

function deal() {
    if (currentPot > 0) {
    document.getElementById('deal').style.display = "none"
    hideControls()
    hideChips()
    setTimeout(() => {
        for (let i = 0; i < playControls.length; i++) {
        playControls[i].style.display = 'flex';}
        document.getElementById('deal').style.display = "none"

    }, 5000)
    setTimeout(givePlayerCard, 1000)
    setTimeout(giveDealerCard, 2000)
    setTimeout(givePlayerCard, 3000)
    setTimeout(dealerBlankCard, 4000)
    } else {
        alert("You must make a bet!")
    }
}

const chips = document.getElementsByClassName("chip")

function hideChips() {
    for (let i = 0; i < chips.length; i++){
        chips[i].style.display = 'none';}

}

function showChips() {
    for (let i = 0; i < chips.length; i++){
        chips[i].style.display = 'block';}
}

function givePlayerCard() {

    console.log(document.getElementById("player-hand"))
    let newCard = document.createElement('img')
    newCard.src = currentDeck[0].image
    newCard.classList.add("card-img")
    document.getElementById("player-hand").appendChild(newCard)
    playerHand.push(currentDeck[0].value)
    aceCheckPlayer()
    currentDeck.shift()

    console.log(`player hand: ${playerHand}`)
}

function giveDealerCard() {
    let newCard = document.createElement('img')
    newCard.src = currentDeck[0].image
    newCard.classList.add('card-img')
    document.getElementById('dealer-hand').appendChild(newCard)
    dealerHand.push(currentDeck[0].value)
    aceCheckDealer()
    currentDeck.shift()

    console.log(`dealer hand: ${dealerHand}`)
}

const hiddenCard = {
    value: 1,
    image: ""
}

function dealerBlankCard() {
    console.log("dealer blank")

    let blankCard = document.createElement('img')
    blankCard.src = "/js/assets/card-back.svg"
    blankCard.classList.add("card-img")
    blankCard.setAttribute('id', 'to-be-flipped')

    hiddenCard.value = currentDeck[0].value
    hiddenCard.image = currentDeck[0].image

    document.getElementById('dealer-hand').appendChild(blankCard)
    dealerHand.push(currentDeck[0].value)
    currentDeck.shift()
    initialPlay()
    console.log(dealerHand)
}


const stayButton = document.getElementById("stay")
stayButton.addEventListener('click', stay)

const dealButton = document.getElementById("deal")
dealButton.addEventListener('click', deal)

const hitButton = document.getElementById("hit")
hitButton.addEventListener('click', hit)

let playerHand = []
let dealerHand = []

let playerAces = 0;
let dealerAces = 0;

// PLAYING!

function initialPlay() {
    let playerSum = playerHand.reduce((partial, total) => partial + total, 0);
    console.log(`Player: ${playerSum}`)
    let dealerSum = dealerHand.reduce((partial, total) => partial + total, 0);
    console.log(`Dealer: ${dealerSum}`)
    if (playerSum == 21) {
        winLoss.innerText = "Blackjack! You win!"
        winRound()
        // CODE FOR PLAYER WIN BLACKJACK INCREMENT
    } 
}

function hit() {
    console.log("hit activated")
    let newCard = document.createElement('img')
    newCard.src = currentDeck[0].image
    newCard.classList.add("card-img")
    document.getElementById("player-hand").appendChild(newCard)
    playerHand.push(currentDeck[0].value)
    aceCheckPlayer()
    currentDeck.shift()
    bustCheckPlayer()
}

function dealerHit() {
    console.log("dealer hit activated")
    let newCard = document.createElement('img')
    newCard.src = currentDeck[0].image
    newCard.classList.add("card-img")
    document.getElementById("dealer-hand").appendChild(newCard)
    dealerHand.push(currentDeck[0].value)
    aceCheckDealer()
    currentDeck.shift()
    bustCheckDealer()
}


function bustCheckPlayer() {
    let playerSum = playerHand.reduce((partial, total) => partial + total, 0);
    let dealerSum = dealerHand.reduce((partial, total) => partial + total, 0);

    console.log(`Player: ${playerSum}`)
    if (playerSum == 21) {
        winLoss.innerText = "You should stay."
    } else if (playerSum > 21) {
        if (playerAces > 0) {
            playerSum = playerSum - 10
            playerAces -= 1
            winCheck(playerSum, dealerSum);

        } else {
        setTimeout(function() {winLoss.innerText = "You Busted!"}, 1000)
        flipper()
        loseRound()
        }
    }
}

function bustCheckDealer() {
    let playerSum = playerHand.reduce((partial, total) => partial + total, 0);
    let dealerSum = dealerHand.reduce((partial, total) => partial + total, 0);

    console.log(`Dealer: ${dealerSum}`)
    if (dealerSum > 21) {
        if (dealerAces > 0) {
            dealerSum = dealerSum - 10
            dealerAces -= 1
            winCheck(playerSum, dealerSum);
        } else {
        setTimeout(function() {winLoss.innerText = "The Dealer Busted. You win!"}, 1000)
        flipper()
        winRound()
        
        }
    } else {
        winCheck(playerSum, dealerSum)
    }
}

function flipper() {
    let flipMe = document.getElementById("to-be-flipped")
    flipMe.src = hiddenCard.image
}

function stay() {
    hideControls()
    let playerSum = playerHand.reduce((partial, total) => partial + total, 0);
    console.log(`Player: ${playerSum}`)
    let dealerSum = dealerHand.reduce((partial, total) => partial + total, 0);
    console.log(`Player: ${dealerSum}`)

    setTimeout(flipper, 1000);
    if (dealerSum < 17) {
        setTimeout(dealerHit, 1500)
    } else if (dealerSum >= 17 && dealerSum <= 21) {
        if (playerSum > dealerSum) {
            setTimeout(function() {winLoss.innerText = `You won! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            winRound()
        } else if (playerSum < dealerSum) {
            setTimeout(function() {winLoss.innerText = `You lost! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            loseRound()
        } else if (playerSum == dealerSum) {
            setTimeout(function() {winLoss.innerText = `Push! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            pushRound()
        }
    }
}

function aceCheckPlayer() {
    if (currentDeck[0].value == 11) {
        playerAces++;
    }
}
function aceCheckDealer() {
    if (currentDeck[0].value == 11) {
        dealerAces++;
    }
}

function winCheck(playerSum, dealerSum) {

    if (dealerSum < 17) {
        setTimeout(dealerHit, 1500)
     } else if (dealerSum >= 17 && dealerSum <= 21) {
        if (playerSum > dealerSum) {
            setTimeout(function() {winLoss.innerText = `You won! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            winRound()
        } else if (playerSum < dealerSum) {
            setTimeout(function() {winLoss.innerText = `You lost! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            loseRound()
        } else if (playerSum == dealerSum) {
            setTimeout(function() {winLoss.innerText = `Push! Your ${playerSum} vs dealer's ${dealerSum}.`}, 1200)
            pushRound()
        }
    }
}

const playControls = document.getElementsByClassName("control");

function hideControls() {
    for (let i = 0; i < playControls.length; i++) {
        playControls[i].style.display = 'none';
      }
    console.log(playControls)
}

const leaveTable = document.getElementById("leave-table")

function endGame() {
    document.getElementById('canvas').style.display = 'none'
    document.getElementById('blackjack-controls').style.display = 'none'
    document.getElementById('bank').style.display = 'none'
    document.getElementById('pot').style.display = 'none'
    if (bank > 500) {
        winLoss.innerText = `Congrats. You managed to make it out with $${bank}, making your total winnings $${bank-500}! Come back again!`
    } else if (bank == 500) {
        winLoss.innerText = `Wow, you didn't lose money, and you didn't win any either. Good job, I guess?`
    } else if (bank < 500) {
        winLoss.innerText = `Damn, you lost $${500-bank}.`
    } 
    document.getElementById('tyler').style.display = 'flex'
}

leaveTable.addEventListener("click", endGame)


})

