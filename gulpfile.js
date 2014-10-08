var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');


gulp.task('styles', function() {
  return gulp.src('css/sass/main.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function() {
  return gulp.src(['css', 'js', 'img'], {read: false})
    .pipe(clean());
});


gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});


gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/sass/**/*.scss', ['styles']);

  // Watch .js files
  // gulp.watch('assets/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('images/**/*', ['images']);

});







