const TelegrafFlow = require('telegraf-flow');

const createGame = require('../game');
const discardScene = require('./scenes/discard');
const drawScene = require('./scenes/draw');
const markScene = require('./scenes/mark');

const flow = new TelegrafFlow();

flow.command('play', ctx => {
    ctx.reply('New game is ready to begin');
    ctx.reply('Shuffling the deck.');

    ctx.session.game = createGame();

    ctx.flow.enter('draw');
});

flow.register(drawScene);
flow.register(discardScene);
flow.register(markScene);

module.exports = flow;
