'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timestampMicroservice = require('@augmt/timestamp-microservice');

var _timestampMicroservice2 = _interopRequireDefault(_timestampMicroservice);

var _requestHeaderParserMicroservice = require('@augmt/request-header-parser-microservice');

var _requestHeaderParserMicroservice2 = _interopRequireDefault(_requestHeaderParserMicroservice);

var _urlShortenerMicroservice = require('@augmt/url-shortener-microservice');

var _urlShortenerMicroservice2 = _interopRequireDefault(_urlShortenerMicroservice);

var _imageSearchAbstractionLayer = require('@augmt/image-search-abstraction-layer');

var _imageSearchAbstractionLayer2 = _interopRequireDefault(_imageSearchAbstractionLayer);

var _fileMetadataMicroservice = require('@augmt/file-metadata-microservice');

var _fileMetadataMicroservice2 = _interopRequireDefault(_fileMetadataMicroservice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basejumps = [_timestampMicroservice2.default, _requestHeaderParserMicroservice2.default, _urlShortenerMicroservice2.default, _imageSearchAbstractionLayer2.default, _fileMetadataMicroservice2.default];

exports.default = basejumps.map(basejump => {
  const server = basejump.listen();

  return {
    name: basejump.name,
    port: server.address().port,
    regexp: new RegExp(`^(/${ basejump.name })((?:/.*)?)$`)
  };
});