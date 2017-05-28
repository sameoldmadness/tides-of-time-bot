const { Markup } = require('micro-bot');
const { Scene } = require('telegraf-flow');

const scene = new Scene('mark');

scene.enter(ctx => {
    ctx.reply('Here\'s your hand. Which card would you mark',
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

    game.mark(player1choice, player2choice);
    game.draw();

    ctx.flow.enter('draw');
});

module.exports = scene;
