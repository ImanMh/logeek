var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
		uglify = require('gulp-uglify');

gulp.task('ES6', function () {
  return gulp.src('src/logeek.js').
    pipe(sourcemaps.init()).
    pipe(babel({modules: 'ignore'})).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest('dist'));
});

gulp.task('uglify', function () {
  return gulp.src('dist/logeek.js').
    pipe(uglify()).
    pipe(rename('logeek.min.js')).
    pipe(gulp.dest('dist'));
});

gulp.task('default', ['ES6', 'uglify']);

gulp.task('watch', function () {
  watch('src/**', function () {
    gulp.start('default');
  });
});
