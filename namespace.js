'use strict';

const mount = require('koa-mount');

function namespace(path, apps) {
  return apps.map(app => {
    if (typeof app.prefix !== 'string') {
      throw new TypeError('app prefix must be a string');
    }
    const prefix = path + app.prefix;
    const callback = app.callback();
    return mount(prefix, ctx => {
      ctx.req.headers['x-forwarded-prefix'] = prefix;
      return callback(ctx.req, ctx.res);
    });
  });
}

module.exports = namespace;
