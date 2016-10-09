'use strict';

var _http = require('http');

var _httpProxy = require('http-proxy');

var _basejumps = require('./basejumps.js');

var _basejumps2 = _interopRequireDefault(_basejumps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const proxy = (0, _httpProxy.createProxyServer)({});

const matchesPath = function (path) {
  return basejump => basejump.regexp.test(path);
};
const request = function (req, res, basejump) {
  const path = req.url.match(basejump.regexp);

  proxy.web(req, res, {
    headers: { 'X-Forwarded-Path': path[1] },
    ignorePath: true,
    target: `http://localhost:${ basejump.port }${ path[2] }`
  });
};

(0, _http.createServer)((req, res) => {
  const basejump = _basejumps2.default.find(matchesPath(req.url));

  if (basejump) {
    return request(req, res, basejump);
  }

  res.statusCode = 404;
  res.end('Not Found');
}).listen(process.env.PORT);