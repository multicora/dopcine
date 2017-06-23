'use strict';

module.exports = function() {
  const config = require('./config.js');
  const Sequelize = require('sequelize');

  return new Sequelize(
    config.db.dbName,
    config.db.user,
    config.db.password,
    {
      // disable logging; default: console.log
      logging: false,
    }
  );
};
