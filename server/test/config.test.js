'use strict';

var proxyquire = require('proxyquire');
var chai = require('chai');

var expect = chai.expect;
var config = proxyquire('../src/config', {
  './userConfig.js': {
    mailGun: {
      apiKey: 'apiKey',
      domain: 'domain',
    },
    mail: {
      defaultFrom: 'defaultFrom'
    },
    '@noCallThru': true
  }
});

describe('Config', function() {
  it('should return object', function() {
    expect(config).to.be.a('object');
  });
});
