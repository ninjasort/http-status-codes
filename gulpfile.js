/**
 * Gulp
 */
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify   = require('babelify');
var server     = require('gulp-webserver');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var rename     = require('gulp-rename');
var babel      = require('gulp-babel');
var uglify     = require('gulp-uglify');
var jshint     = require('gulp-jshint');

var componentName = 'app';
var config = {
    stylesWatch: './src/styles/**/*.scss',
    stylesEntry: './src/styles/' + componentName + '.scss',
    componentWatch: './src/**/*.{jsx, js}',
    componentEntry: './src/' + componentName + '.jsx'
};

/**
 * Lint JS
 */
gulp.task('lint', function () {
  return gulp.src(config.componentEntry)
    .pipe(babel())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Styles
 */
gulp.task('styles', function () {
  return gulp.src(config.stylesEntry)
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Styles Dist
 */
gulp.task('build:styles', function () {
  return gulp.src(config.stylesEntry)
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      outputStyle: 'compressed'
    }))
    .pipe(rename(componentName + '.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Build node module
 */
gulp.task('build:npm', function () {
  return gulp.src(config.componentEntry)
    .pipe(babel())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(rename(componentName + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename(componentName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Default
 */
gulp.task('default', ['lint','styles'], function () {
  return browserify(config.componentEntry)
    .bundle()
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(source('bundle.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('dist'));
});

/**
 * Watch
 */
gulp.task('watch', ['default'], function () {
  gulp.watch([config.stylesWatch, config.componentWatch], ['dist']);
  return gulp.src('.').pipe(server());
});

/**
 * Dist
 */
gulp.task('dist', ['default', 'build:styles', 'build:npm']);
