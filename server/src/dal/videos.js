'use strict';

module.exports = function(connection) {
  const sqlBuilder = require('../services/sqlBuilder.js');

  return {

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
          'user int(255), ',
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
