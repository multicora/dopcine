'use strict';

module.exports = function(connection) {
  var Sequelize = require('sequelize');

  var model = connection.define('dbinfo', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    value:{
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
  });

  return {
    model: model,

    // get: (cb) => {
    //   return connection('SELECT * FROM dbinfo', cb);
    // },
    getByName: (name) => {
      return model.findOne({
        where: {
          name: name
        },
        raw: true
      });
    },
    update: (setting, cb) => {
      return model.update({
        value: setting.value,
      }, {
        where: {
          name: setting.name
        }
      });
    },

    create: (cb) => {
      let createTableRequest = [
        'CREATE TABLE ',
        'IF NOT EXISTS ',
        'dbinfo ',
        '(',
          'name varchar(255) NOT NULL UNIQUE, ',
          'value varchar(255) NOT NULL, ',
          'PRIMARY KEY (name)',
        ')'
      ].join('');

      let insertVersionRequest = [
        'INSERT IGNORE INTO dbinfo ',
        '(name, value) ',
        'VALUES ("version", "0")'
      ].join('');

      return connection.query(createTableRequest).then(function() {
        return connection.query(insertVersionRequest);
      });
    }
  };

  return settings;
};
