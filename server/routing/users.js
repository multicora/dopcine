'use strict';

module.exports = function (server, DAL) {
  const Boom = require('boom');
  const Joi = require('joi');
  const utils = require('../utils.js');

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
          reply({
            token: res
          });
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

  // POST: /api/confirm-email
  server.route({
    method: 'POST',
    path: '/api/confirm-email',
    config: {
      description: 'Email confirmation',
      notes: 'Email confirmation with token',
      tags: ['api', 'users'],
      validate: {
        payload: {
          token: Joi.string().required()
        }
      },
      handler: function (request, reply) {
        const token = request.payload.token;

        usersController.confirmEmail(token).then(() => {
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
  });

  // POST: /api/register
  server.route({
    method: 'POST',
    path: '/api/register',
    config: {
      description: 'Register',
      notes: 'Register new user',
      tags: ['api', 'users'],
      validate: {
        payload: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          confirmPassword: Joi.string().required(),
        }
      },
      handler: function (request, reply) {
        const email = request.payload.email;
        const password = request.payload.password;
        const confirmPassword = request.payload.confirmPassword;
        const emailLink = utils.getServerUrl(request) + '/login/';

        usersController.register(email, password, confirmPassword, emailLink).then(() => {
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
