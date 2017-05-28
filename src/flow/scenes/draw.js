const { Markup } = require('micro-bot');
const { Scene } = require('telegraf-flow');

const scene = new Scene('draw');

scene.enter(ctx => {
    ctx.reply('Here\'s your hand. Which card would you take',
        Markup.inlineKeyboard(
            ctx.session.game.player1.hand.map((card, index) => {
                return [Markup.callbackButton(card.short, String(index))];
            })
        ).extra()
    );
});

scene.action(/\d+/, async ctx => {
    const player1draft = Number(ctx.match[0]);
    const player2draft = 0;

    const { game } = ctx.session;

    ctx.session.game.draft(player1draft, player2draft);

    await ctx.reply('You table looks like');
    await Promise.all(ctx.session.game.player1.table.map(card => {
        return ctx.reply(card.short);
    }));

    if (ctx.session.game.player1.hand.length === 0) {
        if (game.drawPileNotEmpty()) {
            await ctx.reply('end of round');
            await ctx.reply(`You current total is ${ctx.session.game.player1.total}`);
            ctx.flow.enter('discard');
        } else {
            ctx.reply('Game finished');
            ctx.reply(`Your score: ${game.player1.total}`);
            ctx.reply(`Opponent's score: ${game.player2.total}`);
            ctx.flow.leave();
        }
    } else {
        ctx.flow.reenter();
    }
});

module.exports = scene;
