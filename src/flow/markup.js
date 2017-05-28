const { Markup } = require('micro-bot');

exports.replyWithDeck = (text, deck, ctx) => {
    return ctx.reply(text,
        Markup.inlineKeyboard(
            deck.map((card, index) => [
                Markup.callbackButton(card.shortDescription, String(index))
            ])
        ).extra()
    );
};

exports.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
