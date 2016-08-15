'use strict';

const Koa = require('koa');

const cors = require('kcors');
const router = require('./routes.js');

const app = module.exports = new Koa();

app.use(cors());
app.use(router.routes());
