document.addEventListener("DOMContentLoaded", () => {
const game = document.getElementById('canvas')
const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

})

function playBlackjack() {
    console.log('blackjack started')
    toggleScreen('play-blackjack', false)
    
    
}

function toggleScreen(id,toggle) {
    let element = document.getElementById(id);
    let display = ( toggle ) ? 'block' : 'none';
    element.style.display = display
}