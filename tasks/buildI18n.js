'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');


function buildI18n(language) {
  return gulp.src('components/*/locales/' + language + '.json')
    .pipe($.extend(language + '.json'))
    .pipe(gulp.dest('./app/locales/'))
    .pipe($.size({
      title: 'builI18n: ' + language
    }));
}

gulp.task('buildI18n', function () {

  var languages = ['en', 'es'];
  var len = languages.length;
  var streams = [];
  for (var i = 0; i < len; i++) {
    streams[i] = buildI18n(languages[i]);
  }

  return merge.apply(this, streams);

});
