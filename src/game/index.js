const { priorities, deck } = require('./deck');

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

const draw = (hand, drawPile) => hand.push(...drawPile.splice(0, 5 - hand.length)); 
const draft = (table, hand, index) => table.push(...hand.splice(index, 1));

const cardCountBySuit = table => {
    const suits = {};

    for (let card of table) {
        if (card.suit) {
            suits[card.suit] = suits[card.suit] || 0;
            suits[card.suit] += 1;
        }
    }

    return suits;
}

const takeCardsFromTableIntoHand = player => {
    player.hand = player.table.filter(x => !x.marked)
    player.table = player.table.filter(x => x.marked)
}

module.exports = (options = {}) => {
    const {
        shuffleDeck = true,
    } = options;

    const player1 = {
        hand: [],
        table: [],
        status: {
            suits: {},
            points: [],
        },
        total: 0,
    };

    const player2 = {
        hand: [],
        table: [],
        status: {
            suits: {},
            points: [],
        },
        total: 0,
    };

    const players = [player1, player2];

    const drawPile = [...deck];

    if (shuffleDeck) {
        shuffle(drawPile);
    }

    draw(player1.hand, drawPile);
    draw(player2.hand, drawPile);

    return {
        player1,

        player2,

        drawPileNotEmpty: function () {
            return drawPile.length !== 0
        },

        draft: function (index1, index2) {
            draft(player1.table, player1.hand, index1);
            draft(player2.table, player2.hand, index2);
            [player1.hand, player2.hand] = [player2.hand, player1.hand];

            if (player1.hand.length === 1) {
                draft(player1.table, player1.hand, 0);
                draft(player2.table, player2.hand, 0);

                player1.status.suits = cardCountBySuit(player1.table);
                player2.status.suits = cardCountBySuit(player2.table);

                player1.status.points = [];
                player2.status.points = [];

                for (let priority of Object.values(priorities)) {
                    for (let [index, player] of players.entries()) {
                        for (let card of player.table) {
                            if (card.priority === priority) {
                                card.resolve(player, players[1 - index]);
                            }
                        }
                    }
                }

                player1.total += player1.status.points.reduce((sum, x) => sum + x, 0);
                player2.total += player2.status.points.reduce((sum, x) => sum + x, 0);
            }
        },

        discard: function (index1, index2) {
            player1.hand.splice(index1, 1);
            player2.hand.splice(index2, 1);
        },

        mark: function (index1, index2) {
            player1.hand[index1].marked = true;
            draft(player1.table, player1.hand, index1);

            player2.hand[index2].marked = true;
            draft(player2.table, player2.hand, index2);
        },

        collect: function () {
            takeCardsFromTableIntoHand(player1)
            takeCardsFromTableIntoHand(player2)
        },

        draw: function () {
            draw(player1.hand, drawPile)
            draw(player2.hand, drawPile)
        }
    };
};
