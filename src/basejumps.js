'use strict';

import timestampAPI from '@augmt/timestamp-microservice';
import requestHeaderParserAPI from '@augmt/request-header-parser-microservice';
import urlShortenerAPI from '@augmt/url-shortener-microservice';
import imageSearchAPI from '@augmt/image-search-abstraction-layer';
import fileMetadataAPI from '@augmt/file-metadata-microservice';

const basejumps = [
  timestampAPI,
  requestHeaderParserAPI,
  urlShortenerAPI,
  imageSearchAPI,
  fileMetadataAPI
];

export default basejumps.map((basejump) => {
  const server = basejump.listen();

  return {
    name: basejump.name,
    port: server.address().port,
    regexp: new RegExp(`^(/${basejump.name})((?:/.*)?)$`)
  };
});
