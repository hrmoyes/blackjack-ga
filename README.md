## Casino Project
- Game Idea: a small casino game that has Blackjack (and if that works, Roulette)
    - The game will have a money tracking system and a standard-rules game of player vs. house blackjack and roulette
    - start player off with 500$ initially
    - allow player to bet, split, double, hit, stand, etc with a standard $1/5/25/100 chip system
    - keep track of player money
    - animate card dealings
    - utilize playing card API to more easily create a functional deck implimentation system
    - allow player to leave the table at any time, thus displaying a win/loss message (see final wireframe image)
## Wireframes
![Front page/ setup](https://i.imgur.com/UJ9fvzd.jpg)
![hand win/loss and settings](https://i.imgur.com/fo1AkmX.jpg)
![roulette setup + some wins](https://i.imgur.com/TcGE2uX.jpg)
![end result possibles](https://i.imgur.com/vzBHbes.jpg)

## Explanation

I ended up just doing solely Blackjack as my game. I utilized a variety of functions to make the game work, and ended with a working, albeit messy, result.

I began the process by drawing up a canvas board, then one by one adding buttons and positioning them atop the canvas in a way that aligns with the Blackjack table. From there I began the logic for blackjack. I set up my own local JSON file containing all cards, which has their suits, their values 2-11, and their images. I was not able to find a working API for 52 cards online, so I ended up just creating my own. Once I implemented the json, I began working on game logic.

To start, I began by creating a function to loop through my json and create + shuffle a deck of cards. From there, I set up an array for the Player's Hand and another for the Dealer's Hand. Before making the bank + pot system, I just got this basic logic working. When the dealing happens, the player gets a card, then the dealer, then the player, then the dealer gets an upside down image dealt, but still gets "dealt" the next card in the deck. When the player stays, the dealer will flip the hidden card and begin dealing until he hits 17. Each time a card enters a hand, it is deleted from the deck. When there are around 20 cards left, the dealer will reshuffle a new 52 card deck. 

I then set up the win conditions, which are just the standard rules for Blackjack. Over 21 is a bust for either player, and the highest player wins. If the dealer and player have the same hand value, it will be a push. For the aces to be 1 or 11, I counted the amount of aces in each hand, and if the hand busts, the ace is set to 1 rather than 11.