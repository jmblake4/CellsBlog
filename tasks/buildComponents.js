'use strict';

// Create components/components.html from componets.tpl file
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');

gulp.task('buildComponents', function() {

    return gulp.src(['app/components.tpl'])
        .pipe($.rename('components.html'))
        .pipe(gulp.dest('components'))
        .pipe($.size({
            title: 'buildComponents'
        }));

});
