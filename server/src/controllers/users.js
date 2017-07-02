'use strict';

const passwordHash = require('password-hash');
// const Promise = require('promise');
const keys = require('../responseKeys.js');
const mailer = require('../services/mailer.js');
const utils = require('../utils.js');
const templates = require('../services/templates.js')();

module.exports = function (DAL) {

  return {
    login: (login, password) => {
      return DAL.users.getUserForLogin(login).then((user) => {
        // Check user
        const result = !user ? Promise.reject({
          key: keys.AUTH.USERNAME_OR_PASSWORD_IS_INCORRECT,
          type: 401
        }) : Promise.resolve(user);

        return result;
      }).then((user) => {
        // Check if user confirm his email
        const result = !user.confirmed ? Promise.reject({
          key: keys.AUTH.EMAIL_IS_NOT_CONFIRMED,
          type: 401
        }) : Promise.resolve(user);

        return result;
      }).then((user) => {
        // Verifying password
        const passwordIsCorrect = verifyPassword(password, user.password);
        const result = !passwordIsCorrect ? Promise.reject({
          key: keys.AUTH.USERNAME_OR_PASSWORD_IS_INCORRECT,
          type: 401
        }) : Promise.resolve(user);

        return result;
      }).then((user) => {
        // Generating token
        const token = utils.newToken();

        return DAL.tokens.create(
          token,
          user.id,
          DAL.tokens.TYPES.AUTH
        ).then(() => {
          return token;
        });
      });
    },

    verifyUser: (token) => {
      return DAL.tokens.get(token).then((tokenObj) => {
        // Check token
        const result = !tokenObj ? Promise.reject({
          key: keys.AUTH.TOKEN_IS_INCORRECT,
          type: 401
        }) : Promise.resolve(tokenObj);

        return result;
      }).then((tokenObj) => {
        // Get user profile
        return Promise.all([
          DAL.users.getUserById(tokenObj.user),
          DAL.usersDetails.getById(tokenObj.user)
        ]);
      }).then(response => {
        const user = response.reduce((res, val) => Object.assign({}, res, val), {});
        return Promise.resolve(user);
      });
    },

    confirmEmail: (token) => {
      return DAL.tokens.get(token).then((tokenObj) => {
        // Check token
        const result = !tokenObj ? Promise.reject({
          key: keys.AUTH.TOKEN_IS_INCORRECT,
          type: 401
        }) : Promise.resolve(tokenObj);

        return result;
      }).then((tokenObj) => {
        // Get user
        return DAL.users.getUserById(tokenObj.user);
      }).then((user) => {
        // Update user
        user.confirmed = true;

        return DAL.users.update(user);
      });
    },

    // verifyPassword: verifyPassword,

    resetPassword: (email, emailLink) => {
      let token = utils.newToken();

      return DAL.users.getUserByEmail(email).then((user) => {
        if (!user) {
          return Promise.reject({
            type: 400,
            key: keys.AUTH.USER_IS_ABSENT
          });
        }

        // Create token
        return DAL.tokens.create(
          token,
          user.id,
          DAL.tokens.TYPES.RESET
        );
      }).then(() => {
        // Make template
        return templates.resetPassword(emailLink + token);
      }).then( template => {
        // Send the letter
        const mail = {
          to: email,
          subject: 'Reset password',
          text: template.text,
          html: template.html
        };

        return mailer().send(mail);
      });
    },

    register: (email, password, confirmPassword, emailLink, firstName, lastName) => {
      const confirmToken = utils.newToken();
      const link = emailLink + confirmToken;

      return DAL.users.getUserByEmail(email).then((user) => {
        // Check user
        const result = user ? Promise.reject({
          key: keys.AUTH.EMAIL_ALREADY_IN_USE,
          type: 400
        }) : Promise.resolve();

        return result;
      }).then(() => {
        // Check passwords
        const passwordsMach = confirmPassword === password;
        const result = !passwordsMach ? Promise.reject({
          type: 400,
          key: keys.AUTH.PASSWORDS_DO_NOT_MATCH,
        }) : Promise.resolve();

        return result;
      }).then(() => {
        // Create user
        const hash = passwordHash.generate(password);

        return DAL.users.register(email, hash);
      }).then((res) => {
        // create user details if needed
        return !!firstName || !!lastName
          ? DAL.usersDetails.create(res.insertId, firstName, lastName)
            .then(() => Promise.resolve(res))
          : Promise.resolve(res);
      }).then((res) => {
        // Add token
        return DAL.tokens.create(confirmToken, res.insertId, DAL.tokens.TYPES.RESET);
      }).then(() => {
        // Ask template
        return templates.registration(link);
      }).then((template) => {
        // Ask template
        const mail = {
          to: email,
          subject: 'Dopcine: register',
          text: template.text,
          html: template.html
        };

        return mailer().send(mail);
      }).then(() => {
        return;
      });
    },

    setPassword: (password, confirmPassword, token) => {
      if (password !== confirmPassword) {
        return Promise.reject({
          type: 400,
          key: keys.AUTH.PASSWORDS_DO_NOT_MATCH,
        });
      } else {
        return DAL.tokens.get(token).then((tokenObj) =>{
          if (!tokenObj) {
            return Promise.reject({
              type: 400,
              key: keys.AUTH.TOKEN_IS_INCORRECT,
            });
          }
          const hash = passwordHash.generate(password);

          return DAL.users.setPassword(tokenObj.user, hash);
        });
      }
    },

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


  // function isUserExist(email) => {
  //   return new Promise((resolve) => {
  //     DAL.users.getUserByEmail(email).then(() => {
  //       resolve(true);
  //     }, () => {
  //       resolve(false);
  //     });
  //   });
  // }
};
