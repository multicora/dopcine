'use strict';

module.exports = function() {
  return {
    esLintSelector: ['./**/*.js', '!./node_modules/**', '!./coverage/**']
  };
};
