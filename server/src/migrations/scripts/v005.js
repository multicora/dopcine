'use strict';

module.exports = function(connection) {
  return {
    version: 5,
    message: 'Created "videos" table',
    script: function () {
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
    }
  };
};
