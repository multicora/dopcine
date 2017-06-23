'use strict';

// const _ = require('lodash');

module.exports = function (DAL, options) {
  const Promise = require('promise');

  options = options || {};

  return options.getDbVersion(DAL).then( v => {
    return versionCb(v);
  });

  function versionCb(v) {
    var migrations = fillMigrations(options.migrations || []);

    console.log('');
    console.log('    Migration start');
    console.log('    Current DB version: ' + v);

    return runAllMigrations(
      migrations,
      parseInt(v, 10),
      DAL
    ).then( v => {
      console.log('    DB version: ' + v);
      console.log('    Migration end');
    });
  }

  function fillMigrations(migrations) {
    let mg = {};

    migrations.forEach(function (migration) {
      if (mg[migration.version]) {
        console.log('    Migration with this version already exists.');
      } else {
        mg[migration.version] = migration;
      }
    });

    return mg;
  }

  function runAllMigrations(migrations, currentDbVersion, DAL) {
    var index = currentDbVersion;

    return next(migrations, index + 1, DAL);
  }

  function next(migrations, v, DAL) {
    var currentMigration = migrations[v];

    if (currentMigration) {
      return runMigration(currentMigration.script).then( () => {
        migrationEnd(currentMigration.message);

        return options.setDbVersion(DAL, v);
      }).then( () => {
        return next(migrations, v + 1, DAL);
      });
    } else {
      return Promise.resolve(v - 1, DAL);
    }
  }

  // migrationFunc {function(next)}
  // msg {string}
  function runMigration(migrationFunc) {
    return migrationFunc();
  }

  function migrationEnd(msg) {
    console.log('    Finished: ' + msg);
  }
};
