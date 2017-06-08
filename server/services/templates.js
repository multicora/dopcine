'use strict';

module.exports = () => {
  const Promise = require('promise');

  let EmailTemplate = require('email-templates').EmailTemplate;
  let templatesDir = './emailTemplates';

  return {
    registration: (link) => {
      return new Promise( (resolve, reject) => {
        const path = require('path');
        let registerTemplateDir = '/registration';
        let templateDir = path.join(__dirname, templatesDir, registerTemplateDir);
        console.log(templateDir);
        let letter = new EmailTemplate(templateDir);
        let props = {
          link: link
        };

        letter.render(props, function (err, result) {
          err ? reject(err) : resolve(result);
        });
      });
    }
  };
};
