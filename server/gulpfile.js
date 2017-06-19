'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');
var nodemon = require('gulp-nodemon');

require('./gulp/eslint.js')();

gulp.task('serve', function (done) {
  return sequence(['eslint'], ['start'], function () {
    done();
  });
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    env: { 'NODE_ENV': 'development' },
    tasks: function () {
      return [
        'eslint'
      ];
    }
  });
});

gulp.task('prepush', function (done) {
  return sequence(['eslintWithError'], function () {
    done();
  });
});
