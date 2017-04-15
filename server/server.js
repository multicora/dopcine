'use strict';

// // External
// const _ = require('lodash');
const Promise = require('promise');
// const fs = require('fs');

// // Internal
const config = require('./config.js');
// const migrations = require('./migrations/migrations');

// function logError(error) {
//   console.log(' ======================= uncaughtException:');
//   console.log(error.stack);
// }

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
    return run(server);
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




  
    // function(DAL) {
    //   _.bind(registerACL, null, server)
    //   ).then(
    //     _.bind(registerStaticFilesServer, null, server)
    //   ).then(
    //     _.bind(registerAuth, null, server, DAL)
    //   ).then(
    //     _.bind(registerRouting, null, server, DAL)
    //   ).then(
    //   );
    // },
    // function (err) {
    //   logError(err);
    // }
};

function parseError(err) {
  const dbConnectionProblem = /ECONNREFUSED .*:3306/;

  if ( dbConnectionProblem.test(err.message) ) {
    return 'database connection problem';
  }

  return null;
}

function startServer(tls) {
  const Hapi = require('hapi');

  // const params = Object.assign({
  //   tls: null,
  //   dal: null
  // }, params);
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

// function registerStaticFilesServer(server) {
//   return new Promise(
//     function (resolve, reject) {
//       const plugin = require('inert');
//       server.register(plugin, function (err) {
//         err ? reject() : resolve();
//       });
//     }
//   );
// }

// function registerRouting(server, DAL) {
//   const routing = require('./routing');
//   routing.init(server, DAL);
// }

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

function run(server) {
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
