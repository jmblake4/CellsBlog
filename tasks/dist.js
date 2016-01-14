'use strict';

// Build Production Files into dist folder
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');


// version not vulcanize. Uncomment 'precache' if you are going to use service workers.
gulp.task('dist', ['clean'], function(cb) {
    runSequence(
        'sass', 'buildIndex', 'buildCoreJS', 'buildI18n', 'copy',
        'components', 'lint', ['images', 'fonts'], 'html', 'includeComponents',
        // 'precache',
        cb);
});


// vulcanize version. Uncomment 'precache' if you are going to use service workers.
gulp.task('dist:vulcanize', ['clean'], function(cb) {
    runSequence(
        'sass', 'buildIndex', 'buildCoreJS', 'buildI18n', 'copy',
        'components', 'lint', ['images', 'fonts'], 'html',
        'vulcanize', // 'precache',
        cb);
});
