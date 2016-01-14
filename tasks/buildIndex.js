'use strict';

// Create index.html from index.tpl file
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('buildIndex', function () {
  return gulp.src('app/index.tpl')
    .pipe($.concat('index.html'))
    .pipe(gulp.dest('app/'));
});
