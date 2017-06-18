var gulp = require('gulp');
var sequence = require('gulp-sequence');
var nodemon = require('gulp-nodemon');

require('./gulp/jslint.js')();

gulp.task('serve', function (done) {
  return sequence(['eslint'], ['start'], function () {
    done();
  });
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    // ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    tasks: function () {
      return [
        'eslint'
      ];
    }
  })
})
