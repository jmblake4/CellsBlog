'use strict';

// Scan Your HTML For Assets & Optimize Them
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


gulp.task('html', function() {
    var assets = $.useref.assets({
        searchPath: ['.tmp', 'app', 'dist']
    });

    return gulp.src(['app/**/*.html', '!app/{components,test}/**/*.html', '!app/index.tpl', '!app/components.tpl'])
        .pipe(assets)
        // Concatenate And Minify JavaScript
        .pipe($.if('*.js', $.uglify({
            preserveComments: 'some'
        })))
        // Concatenate And Minify Styles
        // In case you are still using useref build blocks
        .pipe($.if('*.css', $.cssmin()))
        .pipe(assets.restore())
        .pipe($.useref())
        // Output Files
        .pipe(gulp.dest('dist'))
        .pipe($.size({
            title: 'html'
        }));
});
