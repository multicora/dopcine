// TODO: need some clear strategy
module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  function parse(user) {
    delete user.password;

    return user;
  }

  return {
    TYPES: {
      RESET: 'reset'
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