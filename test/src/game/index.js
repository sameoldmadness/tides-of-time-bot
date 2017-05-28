import test from 'ava';

import createGame from '../../../src/game';
import { deck } from '../../../src/game/deck';

const cards = (place, game) => index => game[`player${index}`][place].map(x => {
    return (x.suit ? `${x.suit}   ` : '') + 
            x.description +
           (x.marked ? `   ❗️` : '');
});

test('general game mechanics', t => {
    const game = createGame({ shuffleDeck: false });

    const hand = cards('hand', game);
    const table = cards('table', game);

    t.true(game.drawPileNotEmpty());

    t.deepEqual(hand(1), [
        "Double the amount of your most numerous suit",
        "👑   For each 📜 gain 3 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "👑   Win all ties",
        "For scoring the highest with a single card gain 8 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "🖐   For majority in 🌿 gain 7 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🌿   For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
        "👑   For majority in 🏰 gain 7 ⭐",
    ]);

    t.deepEqual(table(1), [
    ]);

    t.deepEqual(table(2), [
    ]);

    game.draft(0, 4);

    t.deepEqual(hand(1), [
        "🖐   For majority in 🌿 gain 7 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🌿   For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "👑   For each 📜 gain 3 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "👑   Win all ties",
        "For scoring the highest with a single card gain 8 ⭐",
    ]);

    t.deepEqual(table(1), [
        "Double the amount of your most numerous suit",
    ]);

    t.deepEqual(table(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
    ]);

    game.draft(0, 3);

    t.deepEqual(hand(1), [
        "👑   For each 📜 gain 3 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "👑   Win all ties",
    ]);

    t.deepEqual(hand(2), [
        "🌿   For majority in 👑 gain 7 ⭐",
        "🌿   For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
    ]);

    t.deepEqual(table(1), [
        "Double the amount of your most numerous suit",
        "🖐   For majority in 🌿 gain 7 ⭐",
    ]);

    t.deepEqual(table(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
    ]);

    game.draft(0, 2);

    t.deepEqual(hand(1), [
        "🌿   For majority in 👑 gain 7 ⭐",
        "🌿   For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "👑   Win all ties",
    ]);

    t.deepEqual(table(1), [
        "Double the amount of your most numerous suit",
        "🖐   For majority in 🌿 gain 7 ⭐",
        "👑   For each 📜 gain 3 ⭐",
    ]);

    t.deepEqual(table(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
    ]);

    game.draft(0, 1);

    t.deepEqual(hand(1), [
    ]);

    t.deepEqual(hand(2), [
    ]);

    t.deepEqual(table(1), [
        "Double the amount of your most numerous suit",
        "🖐   For majority in 🌿 gain 7 ⭐",
        "👑   For each 📜 gain 3 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
    ]);

    t.deepEqual(table(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
        "👑   Win all ties",
        "🌿   For a set of 👑 🏰 🌿 📜 🖐 gain 13 ⭐",
    ]);

    t.is(game.player1.total, 0);
    t.is(game.player2.total, 11);

    game.collect();

    game.discard(0, 4);

    t.deepEqual(hand(1), [
        "🖐   For majority in 🌿 gain 7 ⭐",
        "👑   For each 📜 gain 3 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
        "👑   Win all ties",
    ]);

    t.deepEqual(table(1), [
    ]);

    t.deepEqual(table(2), [
    ]);

    game.mark(0, 3);

    t.deepEqual(hand(1), [
        "👑   For each 📜 gain 3 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
    ]);

    t.deepEqual(table(1), [
        "🖐   For majority in 🌿 gain 7 ⭐   ❗️",
    ]);

    t.deepEqual(table(2), [
        "👑   Win all ties   ❗️",
    ]);

    game.draw();

    t.deepEqual(hand(1), [
        "👑   For each 📜 gain 3 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "📜   For majority in 🖐 gain 7 ⭐",
        "🏰   For each suit you don\'t have gain 3 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "👑   For majority in 🏰 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
        "🌿   For each 🏰 gain 3 ⭐",
        "🏰   For each 🖐 gain 3 ⭐",
    ]);

    t.deepEqual(table(1), [
        "🖐   For majority in 🌿 gain 7 ⭐   ❗️",
    ]);

    t.deepEqual(table(2), [
        "👑   Win all ties   ❗️",
    ]);

    game.draft(0, 4);
    game.draft(0, 3);
    game.draft(0, 2);
    game.draft(0, 1);

    t.deepEqual(hand(1), [
    ]);

    t.deepEqual(hand(2), [
    ]);

    t.deepEqual(table(1), [
        "🖐   For majority in 🌿 gain 7 ⭐   ❗️",
        "👑   For each 📜 gain 3 ⭐",
        "👑   For majority in 🏰 gain 7 ⭐",
        "🌿   For majority in 👑 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
    ]);

    t.deepEqual(table(2), [
        "👑   Win all ties   ❗️",
        "🏰   For each 🖐 gain 3 ⭐",
        "🏰   For each suit you don\'t have gain 3 ⭐",
        "🌿   For each 🏰 gain 3 ⭐",
        "📜   For majority in 🖐 gain 7 ⭐",
        "📜   For each 🌿 gain 3 ⭐",
    ]);

    t.is(game.player1.total, 15);
    t.is(game.player2.total, 23);

    game.collect();
    game.discard(0, 4);
    game.mark(0, 3);
    game.draw();

    t.deepEqual(hand(1), [
        "🌿   For majority in 👑 gain 7 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
        "📜   For each set of 👑 🏰 🖐 gain 9 ⭐",
        "🏰   For majority in 📜 gain 7 ⭐",
    ]);

    t.deepEqual(hand(2), [
        "🏰   For each 🖐 gain 3 ⭐",
        "🏰   For each suit you don\'t have gain 3 ⭐",
        "🌿   For each 🏰 gain 3 ⭐",
        "For majority in suits with only one card gain 8 ⭐",
        "🖐   For each 👑 gain 3 ⭐",
    ]);

    t.deepEqual(table(1), [
        "🖐   For majority in 🌿 gain 7 ⭐   ❗️",
        "👑   For majority in 🏰 gain 7 ⭐   ❗️",
    ]);

    t.deepEqual(table(2), [
        "👑   Win all ties   ❗️",
        "📜   For majority in 🖐 gain 7 ⭐   ❗️",
    ]);

    game.draft(0, 4);
    game.draft(0, 3);
    game.draft(0, 2);
    game.draft(0, 1);

    t.deepEqual(hand(1), [
    ]);

    t.deepEqual(hand(2), [
    ]);

    t.deepEqual(table(1), [
        "🖐   For majority in 🌿 gain 7 ⭐   ❗️",
        "👑   For majority in 🏰 gain 7 ⭐   ❗️",
        "🌿   For majority in 👑 gain 7 ⭐",
        "🏰   For each 🖐 gain 3 ⭐",
        "For scoring the highest with a single card gain 8 ⭐",
        "🏰   For each suit you don\'t have gain 3 ⭐",
        "🖐   For each set of 📜 🌿 gain 5 ⭐",
    ]);

    t.deepEqual(table(2), [
        "👑   Win all ties   ❗️",
        "📜   For majority in 🖐 gain 7 ⭐   ❗️",
        "🖐   For each 👑 gain 3 ⭐",
        "🏰   For majority in 📜 gain 7 ⭐",
        "For majority in suits with only one card gain 8 ⭐",
        "📜   For each set of 👑 🏰 🖐 gain 9 ⭐",
        "🌿   For each 🏰 gain 3 ⭐",
    ]);

    t.is(game.player1.total, 31);
    t.is(game.player2.total, 53);

    t.not(game.drawPileNotEmpty);
});