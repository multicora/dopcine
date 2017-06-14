module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  function parse(user) {
    delete user.password;

    return user;
  }

  return {
    getUserForLogin: (login) => {
      let request = sqlBuilder
        .select()
        .from('users')
        .where(`email = '${login}'`)
        .toString();

      return connection.query(request).spread((res) => {
        return res.length && res[0] || null;
      });
    },

    getUserByEmail: (email) => {
      let request = sqlBuilder
        .select()
        .from('users')
        .where(`email = '${email}'`)
        .toString();

      return connection.query(request).spread((res) => {
        return res.length && parse(res[0]) || null;
      });
    },

    getUserById: (id) => {
      let request = sqlBuilder
        .select()
        .from('users')
        .where(`id = '${id}'`)
        .toString();

      return connection.query(request).spread((res) => {
        return res.length && parse(res[0]) || null;
      });
    },

    register: (email, passwordHash) => {
      const request = sqlBuilder.insert()
        .into('users')
        .set('email', email)
        .set('password', passwordHash)
        .set('cratedAt', sqlBuilder.str('NOW()'))
        .set('updatedAt', sqlBuilder.str('NOW()'))
        .toString();

      return connection.query(request).spread((res) => {
        return res;
      });
    },

    update: (user) => {
      const id = user.id;
      delete user.id;
      delete user.email;
      delete user.cratedAt;
      const request = sqlBuilder.update()
        .table('users')
        .setFields(parse(user))
        .set('updatedAt', sqlBuilder.str('NOW()'))
        .where(`id = ${id}`)
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
        'users ',
        '(',
          'id int(255) NOT NULL AUTO_INCREMENT UNIQUE, ',
          'email varchar(255) UNIQUE, ',
          'password varchar(255), ',
          'permanent BOOLEAN NOT NULL DEFAULT false, ',
          'blocked BOOLEAN NOT NULL DEFAULT false, ',
          'cratedAt DATETIME NOT NULL, ',
          'updatedAt DATETIME NOT NULL, ',
          'PRIMARY KEY (id)',
        ') '
      ].join('');

      return connection.query(request);
    },

    addColumnConfirmed: function () {
      const request = [
        'ALTER TABLE `users` ',
        'ADD `confirmed` BOOLEAN ',
        'NOT NULL ',
        'DEFAULT FALSE;'
      ].join('');

      return connection.query(request);
    },
  };
};