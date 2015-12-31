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
 * Html
 */
gulp.task('html', () => {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

/**
 * Styles
 */
gulp.task('styles', () => {
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
gulp.task('default', ['styles', 'html'], () => {
  return browserify(config.componentEntry, {extensions: ['.js','.jsx']})
    .bundle()
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

/**
 * Watch
 */
gulp.task('watch', ['default'], () => {
  gulp.watch([config.stylesWatch, config.componentWatch], ['default']);
  return gulp.src('./dist').pipe(server());
});
