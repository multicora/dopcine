'use strict';

module.exports = function(DAL) {
  return {
    version: 1,
    message: 'Created users table',
    script: function () {
      return DAL.users.createTable();
    }
  };
};
