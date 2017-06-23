'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');

  // const videoCtrl = require('../controllers/video.js')(DAL);

  server.route({
    method: 'POST',
    path: '/api/file',
    config: {
      description: 'Upload file',
      notes: 'Upload file to the storage, max sze 5Gb',
      tags: ['api', 'files'],
      payload: {
        output: 'stream',
        parse: true,
        maxBytes: 5e+9, // 5000Mb
        // allow: 'multipart/form-data'
      },
      // auth: 'simple',

      handler: function (request, reply) {
        if (!request.payload.file) {
          reply( Boom.badRequest('Property "file" is absent') );
        } else {
          require('../services/storage.js')(DAL).then( storage => {
            let name = request.payload.file.hapi.filename;

            return storage.addFile(request.payload.file._data, name, 'test', 'test');
          }).then( () => {
            reply();
          }).catch( err => {
            console.error(err);
            reply(err);
          });
        }
      }
    }
  });
};
