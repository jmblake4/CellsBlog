'use strict';

/*
* Vulcanize imports
* 
* Creates a file components.vulcanize.html with all the components in bower.json
* It excludes components that are under 'ignoreForVulcanize' attribute in bower.json
* 
*/

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var DEST_DIR = 'dist/components';
var dependenciesToIgnore = [];

function findDependenciesToVulcanize(name) {
  function checkName() {
    return name.indexOf('cells-') >= 0 || name.indexOf('bbva-') >= 0;
  }

  function shouldNotBeIgnored() {
    return dependenciesToIgnore.indexOf(name) === -1;
  }

  return checkName() && shouldNotBeIgnored();
}


function createRoutesToElements(name) {
  var file = 'components/' + name + '/' + name + '.html';
  var returnValue = '';
  try {
    if (fs.statSync(file)) {
      returnValue = '<link rel="import" href="' + name + '/' + name + '.html">\n';
    }
  } catch (e) {
    console.warn('File not found %s', file);
  }
  return returnValue;
}


function parseComponentsFile(src, nameTask) {
  var bower = JSON.parse(fs.readFileSync('./bower.json'));
  var dependencies = bower.dependencies;
  var nameDependencies = Object.keys(dependencies);
  var dependenciesToVulcanize;

  if (bower.ignoreForVulcanize) {
    dependenciesToIgnore = Object.keys(bower.ignoreForVulcanize);
  }
  dependenciesToVulcanize = nameDependencies.filter(findDependenciesToVulcanize);

  $.util.log($.util.colors.cyan('reading bower.json file\n'));

  function prepareRoutes() {
    var routesToElements = '';
    dependenciesToVulcanize.forEach(function (src) {
      routesToElements = routesToElements + createRoutesToElements(src);
    });
    $.util.log($.util.colors.cyan('preparing routes\n'));
    $.util.log($.util.colors.magenta(routesToElements));
    return routesToElements;

  }
  return gulp.src(src)
    .pipe($.replace(/<!-- put here the components to vulcanize -->/g, prepareRoutes()))
    .pipe(gulp.dest(path.dirname(src)))
    .pipe($.size({
      title: nameTask
    }));
}

gulp.task('includeComponents', function () {
  return parseComponentsFile(DEST_DIR + '/components.html', 'includeComponents');
})

gulp.task('includeComponents:serve', function () {
  return parseComponentsFile('components/components.html', 'includeComponents:serve');
})

gulp.task('prevulcanize', function () {
  return parseComponentsFile(DEST_DIR + '/components.html', 'prevulcanize');
});

gulp.task('vulcanize', ['prevulcanize'], function () {

  var filesToExclude = glob.sync('./dist/components/**/polymer.html');

  return gulp.src(DEST_DIR + '/components.html')
    .pipe($.vulcanize({
      dest: DEST_DIR,
      strip: true,
      inlineCss: true,
      inlineScripts: true,
      excludes: filesToExclude
    }))
    .on('error', function(err) {
      $.util.log($.util.colors.red(err));
    })
    .pipe($.size({
      title: 'Vulcanized file'
    }))
    .pipe($.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    }))
    .pipe($.size({
      title: 'Vulcanized file with HTML minified'
    }))
    .pipe($.minifyInline())
    .pipe($.size({
      title: 'Vulcanized minified'
    }))
    .pipe(gulp.dest(DEST_DIR))
    .pipe($.size({
      title: 'vulcanize'
    }));
});
