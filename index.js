const Telegraf = require('micro-bot');

const flow = require('./src/flow');

const app = new Telegraf.Composer();

app.use(Telegraf.log());
app.use(Telegraf.memorySession());
app.use(flow.middleware());

module.exports = app;
