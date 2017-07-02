'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');
  const Joi = require('joi');

  const videoCtrl = require('../controllers/videos.js')(DAL);

  server.route({
    method: 'POST',
    path: '/api/file',
    config: {
      description: 'Upload file',
      notes: 'Upload file to the storage, max sze 5Gb',
      tags: ['api', 'files'],
      auth: 'simple',
      payload: {
        output: 'stream',
        parse: true,
        maxBytes: 5e+9, // 5000Mb
        allow: 'multipart/form-data'
      },
      validate: {
        payload: {
          file: Joi.object().required(),
          title: Joi.string().required(),
          price: Joi.string().required(),
          currency: Joi.string(),
          description: Joi.string(),
          keywords: Joi.string(),
          owner: Joi.string(),
          published: Joi.boolean()
        }
      },

      handler: function (request, reply) {
        if (!request.payload.file) {
          reply( Boom.badRequest('Property "file" is absent') );
        } else {
           videoCtrl.addVideo(request.payload, request.auth.credentials).then((res) => {
            reply();
          }).catch((err) => {
            if (err.type === 401) {
              reply(Boom.unauthorized(err.key));
            } else {
              reply(Boom.badImplementation(err));
            }
          });
        }
      }
    }
  });
};
