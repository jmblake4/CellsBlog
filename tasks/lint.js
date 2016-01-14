'use strict';

// Lint JavaScript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Lint JavaScript
gulp.task('lint', function () {
  return gulp.src([
    'app/scripts/**/*.js',
    'app/elements/**/*.html',
    'gulpfile.js',
	  '!app/scripts/vendor/**/*.js',
    '!app/scripts/**/*-dist.js'
  ])
    .pipe(reload({
      stream: true,
      once: true
    }))

  // Extract JS from .html files
    .pipe($.jshint.extract())
    .pipe($.jshint())

  // JSCS has not yet a extract option
    .pipe($.if('*.html', $.htmlExtract()))
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});
