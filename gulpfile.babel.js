var webpack = require('gulp-webpack');
var gulp = require('gulp'),
nodemon = require('gulp-nodemon'),
plumber = require('gulp-plumber'),
livereload = require('gulp-livereload'),
less = require('gulp-less'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
to5 = require('gulp-6to5');


gulp.task('less', () => {
  gulp.src('./src/public/css/*.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(gulp.dest('./src/public/css'))
  .pipe(livereload());
});

gulp.task('es6:server', () => {
  gulp.src(['./src/**/*.js', '!./src/public/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ()=> {
  gulp.watch('./src/public/css/*.less', ['less']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee jade',
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'less',
  'watch'
  ]);
