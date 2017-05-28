const { Markup } = require('micro-bot');
const { Scene } = require('telegraf-flow');

const scene = new Scene('discard');

scene.enter(ctx => {
    const { game } = ctx.session;

    game.collect();
    
    ctx.reply('Here\'s your hand. Which card would you discard',
        Markup.inlineKeyboard(
            ctx.session.game.player1.hand.map((card, index) => {
                return [Markup.callbackButton(card.short, String(index))]
            })
        ).extra()
    );
});

scene.action(/\d+/, async ctx => {
    const player1choice = Number(ctx.match[0]);
    const player2choice = 0;

    const { game } = ctx.session;
    
    game.discard(player1choice, player2choice);

    ctx.flow.enter('mark');
});

module.exports = scene;
