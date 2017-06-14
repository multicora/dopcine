'use strict';

module.exports = function(DAL) {
  return {
    version: 4,
    message: 'Created "users_details" table',
    script: function () {
      return DAL.usersDetails.createTable();
    }
  };
};