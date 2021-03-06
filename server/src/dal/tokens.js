'use strict';

// TODO: need some clear strategy
module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  return {
    TYPES: {
      RESET: 'reset',
      AUTH: 'auth',
    },
    create: (token, userId, type) => {
      const request = sqlBuilder.insert()
        .into('tokens')
        .set('value', token)
        .set('user', userId)
        .set('type', type)
        .set('cratedAt', sqlBuilder.str('NOW()'))
        .set('updatedAt', sqlBuilder.str('NOW()'))
        .toString();

      return connection.query(request).spread((res) => {
        return res;
      });
    },

    get: (token) => {
      let request = sqlBuilder
        .select()
        .from('tokens')
        .where(`value = '${token}'`)
        .toString();

      return connection.query(request).spread((res) => {
        return res.length && res[0] || null;
      });
    },

    /** -----------
     *  Migrations
     *  -----------
     */

    createTable: () => {
      let request = [
        'CREATE TABLE ',
        'tokens ',
        '(',
          'id int(255) NOT NULL AUTO_INCREMENT UNIQUE, ',
          'value varchar(255), ',
          'user int(255), ',
          'type varchar(255), ',
          'cratedAt DATETIME NOT NULL, ',
          'updatedAt DATETIME NOT NULL, ',
          'PRIMARY KEY (id), ',
          'FOREIGN KEY (user) REFERENCES users(id)',
        ') '
      ].join('');

      return connection.query(request);
    },
  };
};
