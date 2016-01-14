'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Watch Files For Changes
gulp.task('watch', function () {
  gulp.watch(['app/index.tpl'], ['buildIndex']);
  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['components/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.scss'], ['styles']).on('change', reload);
  gulp.watch(['components/**/*.scss'], ['components']).on('change', reload);
  gulp.watch(['app/scripts/**/*.js'], ['lint']).on('change', reload);
  gulp.watch(['app/images/**/*'], reload);
});

