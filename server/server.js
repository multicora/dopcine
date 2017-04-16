'use strict';

// const _ = require('lodash');
const Promise = require('promise');
const config = require('./config.js');
// const migrations = require('./migrations/migrations');

module.exports = function () {
  const dataBaseConnection = require('./dataBaseConnection.js');

  // // ssl supporting
  // const tls = require('./tls.js');
  // tls.get().then( tls => {
  //   startServer(tls);
  // }).catch( err => {
  //   console.error(err);
  // });

  let db = dataBaseConnection();
  let dal = registerDAL(db);
  let server = startServer();

  migrations(dal).then( () => {
    return registerLoging(server);
  }).then( () => {
    return runServer(server);
  }).then( () => {
  //   return registerACL(server);
  // }).then( () => {
    return registerStaticFilesServer(server);
  }).then( () => {
  //   return registerAuth(server, dal);
  // }).then( () => {
    return registerRouting(server, dal);
  }).then( () => {
    showSuccessMessage(server);
  }).catch( err => {
    let parsedError = parseError(err);

    console.error('');
    if (parsedError) {
      console.error('Possible error reason: ' + parsedError);
    }

    console.error(err);
  });
};

function registerLoging(server) {
  return new Promise(function (resolve, reject) {
    const Good = require('good');
    server.register({
      register: Good,
      options: {
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*',
              error: '*'
            }]
          }, {
            module: 'good-console'
          }, 'stdout']
        }
      }
    }, function (err) {
      err ? reject() : resolve();
    });
  });
}

function parseError(err) {
  const dbConnectionProblem = /ECONNREFUSED .*:3306/;

  if ( dbConnectionProblem.test(err.message) ) {
    return 'database connection problem';
  }

  return null;
}

function startServer(tls) {
  const Hapi = require('hapi');

  const server = new Hapi.Server();

  server.connection({
    port: config.server.port,
    tls: tls
  });

  return server;
}

function migrations(DAL) {
  const migrations = require('./migrations/migrations.js');
  return migrations(DAL);
}

function registerStaticFilesServer(server) {
  return new Promise(
    function (resolve, reject) {
      const plugin = require('inert');
      server.register(plugin, function (err) {
        err ? reject() : resolve();
      });
    }
  );
}

function registerRouting(server, DAL) {
  const routing = require('./routing/routing.js');
  routing(server, DAL);
}

function registerDAL(db) {
  return require('./dal/dal.js')(db);
}

// function registerACL(server) {
//   return new Promise(function (resolve, reject) {
//     require('./acl.js')(server, function(err) {
//       err ? reject() : resolve();
//     });
//   });
// }

function showSuccessMessage(server) {
  console.log('');
  server.log('info', 'Server running at: ' + server.info.uri);
  console.log('Server running at: ' + server.info.uri);
}

function runServer(server) {
  return new Promise(
    function (resolve, reject) {
      server.start((err) => {
        err ? reject(err) : resolve();
      });
    }
  );
}

// function registerAuth(server, DAL) {
//   const usersController = require('./controllers/users.js')(DAL);

//   return new Promise(function (resolve, reject) {
//     const AuthHeader = require('hapi-auth-header');

//     server.register(AuthHeader, (err) => {
//       if (err) {
//         reject();
//       } else {
//         server.auth.strategy('simple', 'auth-header', {
//           validateFunc: function (tokens, callback) {
//             let tokenName = 'x-biz-token';

//             usersController.getUserByToken(tokens[tokenName]).then(
//               (user) => {
//                 return callback(null, true, user);
//               },
//               () => {
//                 return callback(null, false, null);
//               }
//             );
//           }
//         });
//         resolve();
//       }
//     });
//   });
// }
