var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch');

gulp.task('default', function () {
  return gulp.src('src/loggify.js').
    pipe(sourcemaps.init()).
    pipe(babel()).
    pipe(sourcemaps.write('.')).
    pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  watch('src/**', function () {
    gulp.start('default');
  });
});
