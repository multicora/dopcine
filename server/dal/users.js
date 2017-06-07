module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

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
    // register: (email, password, company) => {
    //   return new Promise((resolve, reject) => {
    //     password = passwordHash.generate(password);

    //     const request = sqlBuilder.insert()
    //       .into('users')
    //       .set('email', email)
    //       .set('password', password)
    //       .set('company', company)
    //       .toString();

    //     connection.query(request, (err, response) => {
    //       err ? reject(err) : resolve(response[0]);
    //     });
    //   });
    // },

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
          'firstName varchar(255), ',
          'secondName varchar(255), ',
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