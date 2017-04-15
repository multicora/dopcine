'use strict';

module.exports = {
  get: readFiles
};

function readFiles() {
  const fs = require('fs');
  const Promise = require('promise');
  const utils = require('./utils.js');

  let tls = {
    key: null,
    cert: null,
    passphrase: null
  };

  return utils.readFile('./cakey.pem').then( key => {
    tls.key = key;
  }).then( () => {
    return utils.readFile('./cacert.pem');
  }).then( cert => {
    tls.cert = cert;
  }).then( () => {
    return utils.readFile('./passphrase.txt', 'utf8');
  }).then( passphrase => {
    tls.passphrase = passphrase;
  }).then( () => {
    return tls;
  });
}