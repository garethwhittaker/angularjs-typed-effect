/* jshint node: true */
'use strict';

var gulp        = require('gulp'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    cleancss    = require('gulp-clean-css'),
    jshint      = require('gulp-jshint'),
    uglify      = require('gulp-uglify'),
    karma       = require('karma').Server;

// Minify typed-effect.css and save in dist folder.
gulp.task('styles', function() {
    return gulp.src('src/typed-effect.css')
        .pipe(plumber())
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist'));
});

// Lint typed-effect.js with JSHint using the Stylish reporter.
gulp.task('lint', function() {
    return gulp.src('src/typed-effect.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Minify typed-effect.js and save in dist folder.
gulp.task('scripts', ['lint'], function() {
    return gulp.src('src/typed-effect.js')
        .pipe(plumber())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// Start Karma test runner.
gulp.task('test', function(done) {
    new karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

// Master task, triggered by running 'gulp'.
gulp.task('default', ['styles', 'scripts']);
