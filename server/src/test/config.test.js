'use strict';

var chai = require('chai');
var expect = chai.expect;

var config = require('../config');

describe('Config', function() {
  it('should return object', function() {
    expect(config).to.be.a('object');
  });
});
