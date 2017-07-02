'use strict';

module.exports = function (server, DAL) {
  const usersController = require('./controllers/users.js')(DAL);

  return new Promise(function (resolve, reject) {
    const AuthHeader = require('hapi-auth-header');

    server.register(AuthHeader, (err) => {
      if (err) {
        reject();
      } else {
        server.auth.strategy('simple', 'auth-header', {
          validateFunc: function (tokens, callback) {
            let tokenName = 'auth';

            usersController.getUserByToken(tokens[tokenName]).then(
              (user) => {
                return callback(null, true, user);
              },
              () => {
                return callback(null, false, null);
              }
            );
          }
        });
        resolve();
      }
    });
  });
};
