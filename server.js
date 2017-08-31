'use strict';

const Koa = require('koa');
const cors = require('kcors');
const namespace = require('./namespace.js');
const basejumps = require('./basejumps.js');

const app = new Koa();
const apiNamespace = namespace('/api/', basejumps);

app.use(cors());
app.use((ctx, next) => {
  if (ctx.url === '/') {
    return ctx.redirect('https://codepen.io/augmt/full/YxRaEN/');
  }
  next();
});

for (const basejump of apiNamespace) {
  app.use(basejump);
}

const server = app.listen(process.env.PORT);

module.exports = server;
