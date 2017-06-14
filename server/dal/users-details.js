module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  return {

    getById: (id) => {
      let request = sqlBuilder
        .select()
        .from('users_details')
        .where(`id = '${id}'`)
        .toString();

      return connection.query(request).spread((res) => {
        return res.length && res[0] || null;
      });
    },

    create: (id, firstName, lastName) => {
      const request = sqlBuilder.insert()
        .into('users_details', id)
        .set('id', id)
        .set('firstName', firstName)
        .set('lastName', lastName)
        .toString();

      return connection.query(request).spread((res) => {
        return res;
      });
    },

    update: (user) => {
      const id = user.id;
      const {firstName, lastName} = user;
      const request = sqlBuilder.update()
        .table('users_details')
        .setFields(parse({firstName, lastName}))
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
        'users_details ',
        '(',
          'id int(255) NOT NULL UNIQUE, ',
          'firstName varchar(255), ',
          'lastName varchar(255), ',
          'PRIMARY KEY (id)',
        ') '
      ].join('');

      return connection.query(request);
    }
  };
};