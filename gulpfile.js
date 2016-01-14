'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Load custom tasks from the `tasks` directory
require('require-dir')('./tasks', {
  recurse: true
});
