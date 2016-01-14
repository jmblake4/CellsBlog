'use strict';

// Generate a list of files that should be precached when serving from 'dist'.
// The list will be consumed by the <platinum-sw-cache> element.
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var packageJson = require('../package.json');


gulp.task('precache', function (callback) {
  var dir = 'dist';
  var config = {
    cacheId: packageJson.name || path.basename(__dirname),
    disabled: false
  };

  glob('{config,locales,elements,components,scripts,styles}/**/*.*', {cwd: dir}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files.push('index.html', './', 'components/webcomponentsjs/webcomponents.min.js');
      config.precache = files;

      var md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(config.precache));
      config.precacheFingerprint = md5.digest('hex');

      var configPath = path.join(dir, 'precache.json');
      fs.writeFile(configPath, JSON.stringify(config), callback);
    }
  });
});
