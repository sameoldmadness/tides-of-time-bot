const { Scene } = require('telegraf-flow');

const { replyWithDeck, getRandomInt } = require('../markup');

const scene = new Scene('draw');

scene.enter(async ctx => {
    const { game } = ctx.session;

    await replyWithDeck('Place one card on a table', game.player1.hand, ctx);
});

scene.action(/\d+/, async ctx => {
    const player1draft = Number(ctx.match[0]);
    const player2draft = getRandomInt(0, game.player2.hand.length - 1);

    const { game } = ctx.session;

    ctx.session.game.draft(player1draft, player2draft);

    const cards1 = game.player1.table.map(x => (x.marked ? '❗' : '') + x.shortDescription);
    const cards2 = game.player2.table.map(x => (x.marked ? '❗' : '') + x.shortDescription);

    await ctx.reply([
        'Your table', 
        ...cards1,
        '',
        'Opponent\'s table',
        ...cards2
    ].join('\n'));

    if (ctx.session.game.player1.hand.length === 0) {
        if (game.drawPileNotEmpty()) {
            await ctx.reply(`You current total is ${ctx.session.game.player1.total}
Opponent\'s total is ${ctx.session.game.player2.total}`);
            ctx.flow.enter('discard');
        } else {
            await ctx.reply(`Your score: ${game.player1.total}
Opponent's score: ${game.player2.total}`);
            ctx.flow.leave();
        }
    } else {
        ctx.flow.reenter();
    }
});

module.exports = scene;
