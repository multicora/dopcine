'use strict';

const squel = require('squel');

squel.registerValueHandler('undefined', function() {
  return null;
});
squel.registerValueHandler(Date, function(date) {
  const d = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  const t = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  return '"' + d + ' ' + t + '"';
});

module.exports = squel;
