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
      const response = await rp({
        followRedirect: false,
        headers: {
          'X-Forwarded-Path': `/${basejump}`,
          ...ctx.request.header
        },
        method: ctx.request.method,
        resolveWithFullResponse: true,
        simple: false,
        url: `http://localhost:${port}${path}`
      });

      if (response.statusCode < 200) {
        // pass
      } else if (response.statusCode < 300) {
        ctx.body = response.body;
        ctx.type = 'json';
      } else if (response.statusCode < 400) {
        ctx.redirect(response.headers.location);
        ctx.status = response.statusCode;
      } else {
        ctx.throw(response.body, response.statusCode);
      }
    } catch (err) {
      ctx.throw(err.statusCode, err.message);
    }
  });
});

app.use(router.routes());
