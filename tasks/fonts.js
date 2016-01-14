'use strict';

// Copy Web Fonts To Dist
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('fonts', function() {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size({
            title: 'fonts'
        }));
});
