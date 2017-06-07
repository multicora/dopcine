'use strict';

const migrator = require('./migrator.js');

module.exports = function (DAL) {
  const migrationOptions = {
    setDbVersion: setDbVersion,
    getDbVersion: getDbVersion,
    migrations: [
      require('./scripts/v001.js')(DAL),
      require('./scripts/v002.js')(DAL),
    ]
  };

  return createSettingsTable(DAL).then( () => {
    return migrator(DAL, migrationOptions);
  });

};

function setDbVersion(DAL, v) {
  return DAL.settings.update({
    name: 'version',
    value: v
  });
}

function getDbVersion(DAL) {
  return DAL.settings.getByName('version').then( res => {
    return res.value;
  });
}

function createSettingsTable(DAL) {
  return DAL.settings.create();
}