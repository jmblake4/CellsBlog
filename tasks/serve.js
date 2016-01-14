'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');


gulp.task('default', function(cb){
  runSequence('clean', 'lint', 'sass', 'styles', 'components', 'images', 'buildIndex', 'buildCoreJS', 'buildComponents', 'buildI18n', 'includeComponents:serve', 'watch', cb);
})

// Build and serve the output from the app and .tmp folder
gulp.task('serve', ['default'], function(i, b) {
    browserSync({
        notify: false,
        server: {
            baseDir: ['.tmp', 'app'],
            routes: {
                '/components': 'components'
            },
            index: 'index.html'
        }
    });
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['dist'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: ['dist'],
            routes: {
                '/components': 'components'
            },
            index: 'index.html'
        }
    });
});

// Build and serve the output from the dist build vulcanized
gulp.task('serve:vulcanize', ['dist:vulcanize'], function() {
    browserSync({
        notify: false,
        server: {
            baseDir: ['dist'],
            routes: {
                '/components': 'components'
            },
            index: 'index.html'
        }
    });
});
