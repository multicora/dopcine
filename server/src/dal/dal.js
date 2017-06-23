'use strict';

module.exports = function(connection){
  let DAL = {};

  // Users
  DAL.users = require('./users.js')(connection);

  // Users Details
  DAL.usersDetails = require('./users-details.js')(connection);

  // Settings
  DAL.settings = require('./settings.js')(connection);

  // Tokens
  DAL.tokens = require('./tokens.js')(connection);

  return DAL;
};
