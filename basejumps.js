'use strict';

const whoami = require('@augmt/request-header-parser-microservice');
const timestamp = require('@augmt/timestamp-microservice');
const shorturl = require('@augmt/url-shortener-microservice');
const imgsearch = require('@augmt/image-search-abstraction-layer');
const fileanalyse = require('@augmt/file-metadata-microservice');

const basejumps = [
  {basejump: whoami, prefix: 'whoami'},
  {basejump: timestamp, prefix: 'timestamp'},
  {basejump: shorturl, prefix: 'shorturl'},
  {basejump: imgsearch, prefix: 'imgsearch'},
  {basejump: fileanalyse, prefix: 'fileanalyse'}
];

module.exports = basejumps.map(({basejump, prefix}) => {
  basejump.prefix = prefix;
  return basejump;
});
