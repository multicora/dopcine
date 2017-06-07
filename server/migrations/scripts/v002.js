'use strict';

module.exports = function(DAL) {
  return {
    version: 2,
    message: 'Created "confirmed" field in "users" table',
    script: function () {
      return DAL.users.addColumnConfirmed();
    }
  };
};
