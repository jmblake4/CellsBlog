'use strict';

// Concat all the scripts files include in the scriptsList array
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var scriptsList = [
  'app/scripts/app.js'
];


gulp.task('buildCoreJS', function () {

  return gulp.src(scriptsList)
    .pipe($.concat('app-dist.js'))
    .pipe(gulp.dest('app/scripts/'));
});
