'use strict';

module.exports = function(DAL) {
  return {
    version: 3,
    message: 'Created "tokens" table',
    script: function () {
      return DAL.tokens.createTable();
    }
  };
};
