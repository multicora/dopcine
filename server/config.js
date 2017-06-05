'use strict';

const merge = require('merge');
let userConfig;

try {
  userConfig = require('./userConfig.js');
} catch (err) {
  userConfig = {};
}

const config = {
  db: {
    dbName: 'dopcine',
    host: 'localhost',
    user: 'root',
    password: ''
  },
  server: {
    port: 80, // http
    // port: 443 // https
  },
  mailGun: {
    apiKey: '',
    domain: ''
  },
  storage: {
    accountId: '',
    applicationKey: '',
    bucketId: ''
  }
};

module.exports = merge.recursive(config, userConfig);
