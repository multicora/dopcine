'use strict';

module.exports = {
  // newToken: () => {
  //   const RandToken = require('rand-token');

  //   return RandToken.generate(16);
  // },

  getServerUrl: request => {
    let server = request.server;
    let serverUrl = server.info.protocol + '://' + request.info.host;

    return serverUrl;
  },

  readFile: (path, encoding) => {
    const fs = require('fs');

    return new Promise(function (resolve, reject) {
      fs.readFile(path, encoding, function (err, content) {
        err ? reject(err) : resolve(content);
      });
    });
  }

};
