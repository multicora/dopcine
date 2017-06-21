'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('foo', function() {
  it('"foo" should be "foo"', function() {
    expect('foo').to.equal('foo');
  });
});
