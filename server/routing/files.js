'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');

  // const videoCtrl = require('../controllers/video.js')(DAL);

  server.route({
    method: 'POST',
    path: '/api/file',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        // maxBytes: 2e+8, // 200Mb
        // allow: 'multipart/form-data'
      },
      // auth: 'simple',

      handler: function (request, reply) {
        console.log('=-=');
        require('../services/storage.js')(DAL).then( storage => {
          // let user = request.auth.credentials;
          let name;
          // if (request.payload.name) {
          //   name = request.payload.name;
          // } else {
            name = request.payload.file.hapi.filename;
          // }
          // videoCtrl.saveFile(
          //   name,
          //   user.id,
          //   request.payload.file._data
          // ).then(
          //   function () {
          //     reply();
          //   },
          //   function (err) {
          //     console.log('Error:');
          //     console.log(new Error(err));
          //     reply(Boom.badImplementation(500, err));
          //   }
          // );
          return storage.addFile(request.payload.file._data, name, 'test', 'test');
        }).then( res => {
          // console.log('reply');
          // console.log(res);
          reply();
        }).catch( err => {
          console.error(err);
          reply(err);
        });
      }
    }
  });
};
