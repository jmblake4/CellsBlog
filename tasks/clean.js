'use strict';

// Clean Output Directory
var gulp = require('gulp');
var del = require('del');
gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'app/locales', 'app/index.html', 'components/components.html']));
