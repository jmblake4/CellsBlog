'use strict';

/*
* Compile and Automatically Prefix Stylesheets
*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var routesSass = ['app/**/*.scss', 'components/**/*.scss'];


var styleTask = function (stylesPath, srcs) {
  return gulp.src(srcs.map(function (src) {
    return path.join(stylesPath, src);
  }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/' + stylesPath))
    .pipe($.if('*.css', $.cssmin()))
    .pipe(gulp.dest('dist/' + stylesPath))
    .pipe($.size({
      title: stylesPath
    }))
    .pipe(reload({ stream: true }));
};

function flatten(array) {
  return array.reduce(function (a, b) {
    return a.concat(b);
  }, []);
}

function prepareSassFiles() {
  var files = [];
  for (var i = 0, len = routesSass.length; i < len; i++) {
    files.push(glob.sync(routesSass[i]));
  }
  return flatten(files);
}

// compiles all sass files in 'routesSass' array 
gulp.task('sass', function () {
  var files = prepareSassFiles();
  return sass(files, { base: './', tempDir: '.tmp' })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest('.'));
});

// copies the css files from styles folder, minified into .tmp and dist folders and reload the server
gulp.task('styles', ['sass'], function () {
  return styleTask('app/styles', ['**/*.css']);
});

// copies the css files from components folder, minified into .tmp and dist folders and reload the server
gulp.task('components', ['sass'], function () {
  return styleTask('components', ['**/*.css']);
});
