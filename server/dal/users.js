module.exports = function(connection) {
  var Sequelize = require('sequelize');

  var model = connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    firstName:{
      type: Sequelize.STRING
    },
    secondName:{
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING,
      unique: true
    },
    password:{
      type: Sequelize.STRING
    },
    permanent: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    blocked: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    cratedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
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

    // For migrations
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
    }
  };
};