/**
 * Gulp
 */
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import server from 'gulp-webserver';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

var componentName = 'app';
var config = {
    stylesWatch: './src/styles/**/*.scss',
    stylesEntry: './src/styles/' + componentName + '.scss',
    componentWatch: './src/**/*.{jsx, js}',
    componentEntry: './src/' + componentName + '.jsx'
};

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
      outputStyle: 'compressed'
    }))
    .pipe(rename(componentName + '.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Default
 */
gulp.task('default', ['styles'], function () {
  return browserify(config.componentEntry, {extensions: ['.js','.jsx']})
    .bundle()
    .on('error', function (err) {
      console.log(err);
    })
    .pipe(source('bundle.js'))
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
