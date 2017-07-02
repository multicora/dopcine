'use strict';

module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  return {
    // getUserForLogin: (login) => {
    //   let request = sqlBuilder
    //     .select()
    //     .from('users')
    //     .where(`email = '${login}'`)
    //     .toString();

    //   return connection.query(request).spread((res) => {
    //     return res.length && res[0] || null;
    //   });
    // },

    // getUserByEmail: (email) => {
    //   let request = sqlBuilder
    //     .select()
    //     .from('users')
    //     .where(`email = '${email}'`)
    //     .toString();

    //   return connection.query(request).spread((res) => {
    //     return res.length && parse(res[0]) || null;
    //   });
    // },

    // getUserById: (id) => {
    //   let request = sqlBuilder
    //     .select()
    //     .from('users')
    //     .where(`id = '${id}'`)
    //     .toString();

    //   return connection.query(request).spread((res) => {
    //     return res.length && parse(res[0]) || null;
    //   });
    // },


    // update: (user) => {
    //   const id = user.id;
    //   delete user.id;
    //   delete user.email;
    //   delete user.password;
    //   delete user.cratedAt;
    //   const request = sqlBuilder.update()
    //     .table('users')
    //     .setFields(parse(user))
    //     .set('updatedAt', sqlBuilder.str('NOW()'))
    //     .where(`id = ${id}`)
    //     .toString();

    //   return connection.query(request).spread((res) => {
    //     return res;
    //   });
    // },

    // setPassword: (userId, passwordHash) => {
    //   const request = sqlBuilder.update()
    //     .table('users')
    //     .set('password', passwordHash)
    //     .where(`id = "${userId}"`)
    //     .toString();

    //   return connection.query(request).spread((res) => {
    //     return res;
    //   });
    // },

    create: (video) => {
      const request = sqlBuilder.insert()
        .into('videos')
        .setFields(video)
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
        'videos ',
        '(',
          'id int(255) NOT NULL AUTO_INCREMENT UNIQUE, ',
          'name varchar(255), ',
          'title varchar(255), ',
          'price DECIMAL(12, 2) NOT NULL, ',
          'currency ENUM("EUR","USD","JPY") NOT NULL, ',
          'description varchar(255), ',
          'keywords varchar(255), ',
          'owner varchar(255), ',
          'published BOOLEAN NOT NULL DEFAULT false, ',
          'moderated BOOLEAN NOT NULL DEFAULT false, ',
          'cratedAt DATETIME NOT NULL, ',
          'updatedAt DATETIME NOT NULL, ',
          'PRIMARY KEY (id), ',
          'FOREIGN KEY (id) REFERENCES users(id)',
        ') '
      ].join('');

      return connection.query(request);
    },
  };
};
