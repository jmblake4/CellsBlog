'use strict';

// Copy All Files At The Root Level (app)
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var merge = require('merge-stream');

var app, locales, config, bower, components, componentsJs, swBootstrap, swToolbox;

function doCopy() {
    app = gulp.src([
        'app/*',
        '!app/test',
        '!app/index.tpl',
        '!app/components.tpl',
        '!app/precache.json',
        '!components/components.html',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));

    bower = gulp.src([
        'components/**/*'
    ]).pipe(gulp.dest('dist/components'));

    locales = gulp.src([
        'app/locales/**/*'
    ]).pipe(gulp.dest('dist/locales'));

    config = gulp.src([
        'app/config/**/*'
    ]).pipe(gulp.dest('dist/config'));

    components = gulp.src(['components/**/*.html'])
        .pipe(gulp.dest('dist/components'));

    componentsJs = gulp.src(['components/**/*.js'])
        .pipe(gulp.dest('dist/components'));

    swBootstrap = gulp.src(['components/platinum-sw/bootstrap/*.js'])
        .pipe(gulp.dest('dist/components/bootstrap'));

    swToolbox = gulp.src(['components/sw-toolbox/*.js'])
        .pipe(gulp.dest('dist/sw-toolbox'));
}

// version not vulcanized
gulp.task('copy', function() {

    doCopy();

    var componentsInclude = gulp.src(['app/components.tpl'])
        .pipe($.rename('components.html'))
        .pipe(gulp.dest('dist/components'));

    return merge(app, bower, locales, config, components, componentsJs, componentsInclude, swBootstrap, swToolbox)
        .pipe($.size({
            title: 'copy'
        }));
});
