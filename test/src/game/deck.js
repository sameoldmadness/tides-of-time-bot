import test from 'ava';

import { deck, priorities } from '../../../src/game/deck';

test('deck contains exactly 18 cards', t => {
	t.is(deck.length, 18);
});

test('each suit has equal number of cards', t => {
    ['👑', '🏰', '🌿', '📜', '🖐', undefined].forEach(suit => {
        const count = deck.filter(x => x.suit === suit).length;

        t.is(count, 3);
    });
});

test('each card has a description', t => {
    deck.forEach(card => {
        t.true(typeof card.description === 'string');
    });
});

test('each card has a resolve function', t => {
    deck.forEach(card => {
        t.true(typeof card.resolve === 'function');
    });
});

test('each card has a priority function', t => {
    deck.forEach(card => {
        t.true(Object.values(priorities).includes(card.priority));
    });
});