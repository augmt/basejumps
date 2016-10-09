'use strict';

import { createServer } from 'http';
import { createProxyServer } from 'http-proxy';
import basejumps from './basejumps.js';

const proxy = createProxyServer({});

const matchesPath = function (path) {
  return (basejump) => basejump.regexp.test(path);
};
const request = function (req, res, basejump) {
  const path = req.url.match(basejump.regexp);

  proxy.web(req, res, {
    headers: {'X-Forwarded-Path': path[1]},
    ignorePath: true,
    target: `http://localhost:${basejump.port}${path[2]}`
  });
};

createServer((req, res) => {
  const basejump = basejumps.find(matchesPath(req.url));

  if (basejump) {
    return request(req, res, basejump);
  }

  res.statusCode = 404;
  res.end('Not Found');
}).listen(process.env.PORT);
