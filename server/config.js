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
  mail: {
    defaultFrom: '',
    defaultSubject: 'Dopcine'
  },
  storage: {
    accountId: '',
    applicationKey: '',
    bucketId: ''
  }
};

const fullConfig = merge.recursive(config, userConfig);

validate(fullConfig);

module.exports = fullConfig;

function validate(conf) {
  validateProperty(conf.mailGun.apiKey, '"config.mailGun.apiKey" key should be exist and not empty');
  validateProperty(conf.mailGun.domain, '"config.mailGun.domain" key should be exist and not empty');
  validateProperty(conf.mail.defaultFrom, '"config.mail.defaultFrom" key should be exist and not empty');
}

function showError(msg) {
  throw new Error(msg);
}

function validateProperty(property, message) {
  if (!property) {
    showError(message);
  }
}
