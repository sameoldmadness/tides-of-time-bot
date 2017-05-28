const { Scene } = require('telegraf-flow');

const { replyWithDeck, getRandomInt } = require('../markup');

const scene = new Scene('discard');

scene.enter(async ctx =>  {
    const { game } = ctx.session;

    game.collect();

    await replyWithDeck('Discard one card', game.player1.hand, ctx);
});

scene.action(/\d+/, async ctx => {
    const player1choice = Number(ctx.match[0]);
    const player2choice = getRandomInt(0, game.player2.hand.length - 1);

    const { game } = ctx.session;
    
    game.discard(player1choice, player2choice);

    ctx.flow.enter('mark');
});

module.exports = scene;
