'use strict';

const multer = require('koa-multer');
const Router = require('koa-router');

const upload = multer();
const router = module.exports = new Router();

router.get('/', (ctx) => {
  ctx.throw(404, 'ERROR: Must be POST request');
});

router.post('/', upload.single('file'), (ctx, next) => {
  ctx.assert(ctx.req.file, 404, 'ERROR: Must provide input file');

  ctx.body = {filesize: ctx.req.file.size};
  ctx.type = 'application/json';
});
