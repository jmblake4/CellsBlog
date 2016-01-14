'use strict';

// Optimize Images
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({
      title: 'images'
    }));
});
