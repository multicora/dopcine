'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');
  const Joi = require('joi');

  const usersController = require('../controllers/users.js')(DAL);

  // POST: /api/login
  server.route({
    method: 'POST',
    path: '/api/login',
    config: {
      description: 'Login',
      notes: 'Login with email and password',
      tags: ['api', 'users'],
      validate: {
        payload: {
          login: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      response: {
        schema: Joi.object({
          token: Joi.string().label('Token'),
        })
      },
      handler: function (request, reply) {
        const user = request.payload;

        usersController.login(user.login, user.password).then((res) => {
          reply(res);
        }).catch((err) => {
          if (err.type === 401) {
            reply(Boom.unauthorized(err.key));
          } else {
            reply(Boom.badImplementation(err));
          }
        });
      }
    }
  });
};
