'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const rp = require('request-promise-native');

const app = module.exports = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
});

const basejumps = [
  'file-metadata-microservice', // 4
  'image-search-abstraction-layer', // 2
  'request-header-parser-microservice', // 1
  'timestamp-microservice', // 2
  'url-shortener-microservice' // 3
];

basejumps.forEach((basejump) => {
  const reBasejump = new RegExp(`/${basejump}(/.*)?$`, 'i');
  const server = require(`./${basejump}/index.js`);
  const port = server.address().port;

  router.get(reBasejump, async (ctx) => {
    const path = ctx.url.replace(`/${basejump}`, '');
    try {
      ctx.body = await rp({
        headers: ctx.request.header,
        method: ctx.request.method,
        url: `http://localhost:${port}${path}`
      });
      ctx.type = 'json';
    } catch(err) {
      ctx.throw(err);
    }
  });
});

app.use(router.routes());
