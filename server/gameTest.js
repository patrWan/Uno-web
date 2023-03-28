var card = {}
var deck = [];

function random(a, b) {
    return 0.5 - Math.random();
}

function createCard(color) {
    for (let index = 0; index < 10; index++) {

        card = {
            id: color + (index * Math.random()),
            color: color,
            number: index,
        }

        deck.push(card)
    }
}

export const createDeck = () => {

    createCard('red');
    createCard('blue');
    createCard('green');
    createCard('yellow');

    deck.sort(random)


    //console.log(deck.sort(random));
}

var playerHand = [];

const distributeCards = (players) => {

    var startPlayer = Math.floor(Math.random()*players.length);
    console.log('QUIEN PARTE? => '+startPlayer)

    for (let index = 0; index < players.length; index++) {
        if(index === startPlayer){
            players[index].isActive = true;
        }
        for (let index = 0; index < 7; index++) {
            playerHand.push(deck[index])
            deck.shift();
        }
        players[index].hand = playerHand;
        playerHand = [];
    }



    

    console.log(players[0])
    console.log(players[1])
    console.log('=========================================')
    //console.log(deck)
}

export const startGame = (players) => {
    createDeck();
    distributeCards(players);
}

export const stopGame = (players) => {
    for (let index = 0; index < players.length; index++) {
        players[index].hand = [];
        players[index].isActive = false;
    }
}

export const dropCard = (players, droppedCard, player) => {
    const updatedHand = player.hand.filter(card => card.id !== droppedCard.id)

    var result = players.map(x => {
        if(x.id === player.id){
            x.hand = updatedHand
        }
    })

    console.log(updatedHand)
}


