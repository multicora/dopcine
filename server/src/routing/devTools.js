'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');
  const Joi = require('joi');

  const usersController = require('../controllers/users.js')(DAL);

  // POST: /api/dev-create-user
  server.route({
    method: 'POST',
    path: '/api/dev-create-user',
    config: {
      validate: {
        payload: {
          email: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      handler: function (request, reply) {
        const email = request.payload.email;
        const password = request.payload.password;

        usersController.create(email, password).then(() => {
          reply();
        }).catch((err) => {
          if (err.type === 400) {
            reply(Boom.badRequest(err.key));
          } else {
            reply(Boom.badImplementation(err));
          }
        });
      }
    }
  });
};
