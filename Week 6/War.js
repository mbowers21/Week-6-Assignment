const SUIT = ['diamonds', 'hearts', 'clubs', 'spades'];
const VALUE = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class Deck {
    constructor (cards = DeckofCards()) {
        this.cards = cards 
    }

    shuffle () {
        for (let i = 0; i < this.cards.length-1; i++) {
            const newIndex = Math.floor(Math.random () * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
        }
    }
}

class Card {
    constructor (suit, value) {
        this.suit = suit
        this.value = value
    }
}

// Create Deck
function DeckofCards () {
    return SUIT.flatMap ((suit)=> {
        return VALUE.map ((value)=>{
            return new Card (suit,value);
        })
    })
}

class War {
    constructor() {
        this.playerOne = [];
        this.playerTwo = [];
    }

    // Start
    start() {
        let selection = this.showGameOptions ();
        while (selection != 'exit') {
            switch(selection){
                case 'play':
                    this.playGame();
                    break;
                case 'exit':
                    selection = 'exit';
                default:
                    alert("That's not an option")
                    break;
            }
            selection = this.showGameOptions();
        }
        alert ('Thanks for playing!!')
    }

    // Game Options
    showGameOptions() {
        return prompt(`
        Play Game (play)
        Exit Game (exit)
    `)
    }

    // Game Being Played
    playGame() {
        let deck = new Deck ();
        deck.shuffle();
        console.log(deck.cards)
        const deckMiddle = deck.cards.length / 2;
        let cardNumber = 0;

        // Player One
        let playerOneNumber = [];
        let playerOneSuit = [];
        let playerOneScore = 0;
        this.playerOne = new Deck(deck.cards.slice(0, deckMiddle));
        this.playerOne.cards.map((card) => {
            playerOneNumber.push(card.value)
            playerOneSuit.push(card.suit)
        });
        

        // Player Two
        let playerTwoNumber = [];
        let playerTwoSuit = [];
        let playerTwoScore = 0;
        this.playerTwo = new Deck(deck.cards.slice(deckMiddle, deck.cards.length));
        this.playerTwo.cards.map((card) => {
            playerTwoNumber.push(card.value)
            playerTwoSuit.push(card.suit)
        });
        
        

        while(cardNumber < 26) {

            let play = prompt(`
            Player One has ${playerOneScore} wins.
            Player Two has ${playerTwoScore} wins.
            [${26 - (cardNumber)} turns left]
            Type draw to battle Or exit to leave!
            `);

            switch(play) {
                case 'draw':
                    alert(`
                    PlayerOne has: ${playerOneNumber[cardNumber]} of ${playerOneSuit[cardNumber]}
                    PlayerTwo has: ${playerTwoNumber[cardNumber]} of ${playerTwoSuit[cardNumber]}
                    `);
                    let num1 = 0;
                    let num2 = 0;

                    // Player One
                    switch(playerOneNumber[cardNumber]){
                        case 'J':
                            num1 += 11;
                        case 'Q':
                            num1 += 12;
                        case 'K':
                            num1 += 13;
                        case 'A':
                            num1 += 14;
                        default:
                            num1 += playerOneNumber[cardNumber]
                    }
                    
                    // Player Two
                    switch(playerTwoNumber[cardNumber]){
                        case 'J':
                            num2 += 11;
                        case 'Q':
                            num2 += 12;
                        case 'K':
                            num2 += 13;
                        case 'A':
                            num2 += 14;
                        default:
                            num2 += playerTwoNumber[cardNumber]
                    }
                    
                    if(num1 > num2){

                        alert(`
                        Player Two was defeated! Player One Won!`);
                        playerOneScore += 1

                    } else if(num1 < num2 ) {

                        alert(`
                        Player One was defeated! Player Two Won!`);
                        playerTwoScore += 1

                    } else {
                        alert('Draw!')
                    };
                    cardNumber += 1;
                    break;

                case 'exit':
                    cardNumber = 27
                    
                    break;
                default:
                    alert("That's not an option!")
            };
        }

        // Results
        if(playerOneScore > playerTwoScore) {
            alert('Player One is the winner!!')
        } else if (playerOneScore < playerTwoScore) {
            alert('Player Two is the winner!!')
        } else {
            alert('Draw')
        };

        // Reset
        cardNumber = 0;
        playerOneNumber = [];
        playerOneSuit = [];
        playerOneScore = 0;
        playerTwoNumber = [];
        playerTwoSuit = [];
        playerTwoScore = 0;
        

    }
}



let game = new War()
game.start()
