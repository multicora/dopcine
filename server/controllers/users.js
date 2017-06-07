
const passwordHash = require('password-hash');
// const Promise = require('promise');
const keys = require('../responseKeys.js');
// const mailer = require('../services/mailer.js');
// const config = require('../config.js');
const utils = require('../utils.js');
// const templates = require('../services/templates.js')();

// const EMAIL_IS_NOT_CONFIRMED = 'EMAIL_IS_NOT_CONFIRMED';
// const USERNAME_OR_PASSWORD_IS_INCORRECT = 'USERNAME_OR_PASSWORD_IS_INCORRECT';

module.exports = function (DAL) {
  'use strict';

  return {
    login: (login, password) => {
      let token;

      return DAL.users.getUserForLogin(login).then((response) => {
        let result;

        if (!response) {
          result = Promise.reject({
            key: keys.AUTH.USERNAME_OR_PASSWORD_IS_INCORRECT,
            type: 401
          });
        } else if (!response.confirmed) {
          result = Promise.reject({
            key: keys.AUTH.EMAIL_IS_NOT_CONFIRMED,
            type: 401
          });
        } else if (!verifyPassword(password, response.password)) {
          result = Promise.reject({
            key: keys.AUTH.USERNAME_OR_PASSWORD_IS_INCORRECT,
            type: 401
          });
        } else {
          token = utils.newToken();
          result = DAL.users.updateToken(token, login);
        }

        return result;
      }).then(() => {
        return {
          token: token,
        };
      });
    }

    // verifyPassword: verifyPassword,

    // resetPassword: (email, serverUrl, dataError, serverError) => {
    //   return new Promise((resolve, reject) => {
    //     let resetToken = utils.newToken();
    //     DAL.users.addResetToken(resetToken, email).then((response) => {
    //       let result = null;

    //       if (response.affectedRows) {
    //         result = templates.resetPassword(serverUrl + '/new-password/' + resetToken);
    //       }

    //       return result;
    //     }).then( template => {
    //         const mail = {
    //           to: email,
    //           subject: 'Reset password',
    //           text: template.text,
    //           html: template.html
    //         };

    //         mailer(config).send(mail).then(
    //           () => {
    //             resolve();
    //           }, (err) => {
    //             reject(err);
    //           }
    //         );
    //     }, () => {
    //       reject(serverError);
    //     });
    //   });
    // },

    // isUserExist: (email) => {
    //   return new Promise((resolve) => {
    //     DAL.users.getUserByEmail(email).then(() => {
    //       resolve(true);
    //     }, () => {
    //       resolve(false);
    //     });
    //   });
    // },

    // register: (email, password, confirmPassword, confirmToken, link) => {
    //   return new Promise((resolve, reject) => {
    //     if (confirmPassword !== password) {
    //       reject({
    //         'statusCode': 400,
    //         'message': 'Passwords do not match!'
    //       });
    //     } else {
    //       DAL.company.add().then((res) => {
    //         return DAL.users.register(email, password, res.insertId);
    //       }).then(() => {
    //         return DAL.users.addConfirmToken(confirmToken, email);
    //       }).then(() => {
    //         return templates.registration(link);
    //       }).then((template) => {
    //         const mail = {
    //           to: email,
    //           subject: 'Register',
    //           text: template.text,
    //           html: template.html
    //         };

    //         mailer(config).send(mail).then(
    //           () => {
    //             resolve();
    //           }, (err) => {
    //             reject(err);
    //           }
    //         );
    //       }, (err) => {
    //         reject(err);
    //       });
    //     }
    //   });
    // },

    // inviteUser: (email) => {
    //   return new Promise((resolve, reject) => {
    //     let resetToken = utils.newToken();
    //     DAL.users.addUserInvite(email).then(function() {
    //        return DAL.users.addResetToken(resetToken, email);
    //     }).then(() => {
    //       const message = [
    //         // TODO: config.mail.linkForNewPassword should get server addres from request
    //         'Enter password for your login: ' + config.mail.linkForNewPassword + resetToken
    //       ].join('\n');

    //       const mail = {
    //         to: email,
    //         subject: 'Invitation',
    //         text: message
    //       };

    //       mailer(config).send(mail).then(
    //         () => {
    //           resolve();
    //         }, (err) => {
    //           reject(err);
    //         }
    //       );
    //     }, (err) => {
    //       reject(err);
    //     });
    //   });
    // },

    // getUserByToken: (token) => {
    //   let actionsArr;
    //   let rolesArr;
    //   let user;

    //   return DAL.users.getUserByToken(token).then((res) => {
    //     user = res;

    //     return DAL.roles.getRolesByUserId(user.id);
    //   }).then((roles) => {
    //     let rolesPromisies = roles.map(function(role) {
    //       return DAL.roles.getRoleById(role.id_role);
    //     });

    //     return Promise.all(rolesPromisies);
    //   }).then((roles) => {
    //     rolesArr = roles.map(function(role) {
    //       return role.name;
    //     });

    //     let getActionsPromisies = roles.map(function(role) {
    //       return DAL.actions.getActionsByRoleId(role.id);
    //     });

    //     return Promise.all(getActionsPromisies);
    //   }).then((actions) => {
    //     let actionsId = [];
    //     if (actions.length > 0) {
    //       actionsId = actions[0].map(function(action) {
    //         return action.id_action;
    //       });
    //     }

    //     let actionsPromisies = actionsId.map(function(action) {
    //       return DAL.actions.getActionById(action);
    //     });

    //     return Promise.all(actionsPromisies);
    //   }).then((actions) => {
    //     actionsArr = actions.map(function(action) {
    //       return action.name;
    //     });
    //   }).then(() => {
    //     user.roles = rolesArr;
    //     user.actions = actionsArr;

    //     return user;
    //   });
    // },

    // parseToken: (token) => {
    //   token = token || '';

    //   let splitted = token.split(' ');

    //   return {
    //     name: splitted[0] || '',
    //     value: splitted[1] || ''
    //   };
    // },
  };

  function verifyPassword(password, passwordForVerify) {
    return !!password && passwordHash.verify(password, passwordForVerify);
  }
};