'use strict';

const request = require('supertest');

const fs = require('fs');

const server = require('./../app.js').listen();

describe('app', function () {
  it('should process form-data that includes a file upload', function (done) {
    request(server)
      .post('/')
      .attach('file', 'test/mock.txt')
      .expect(200, done);
  });

  it('should respond with the input file\'s size in bytes', function (done) {
    const stats = fs.statSync('test/mock.txt');

    request(server)
      .post('/')
      .attach('file', 'test/mock.txt')
      .expect({filesize: stats.size}, done);
  });

  it('should respond with json', function (done) {
    request(server)
      .post('/')
      .attach('file', 'test/mock.txt')
      .expect('Content-Type', 'application/json; charset=utf-8', done);
  });
});
