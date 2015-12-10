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
  .pipe(gulp.dest('./build/public/css'))
  .pipe(livereload());
});

gulp.task('es6:server', () => {
  gulp.src(['./src/**/*.js', '!./src/public/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('./build/'));
});

gulp.task('es6', () => {
  gulp.src(['./src/public/**/*.js'])
  .pipe(webpack({
    entry: {
      index: './src/public/js/index.js',
      index2: './src/public/js/index2.js',
    },
    output: {
      filename: '[name].js',
    },
    module: {
      loaders: [{
        test: /\.js$/, loader: 'babel-loader'
      }]
    }
  }))
  .pipe(gulp.dest('./build/public/js/'))
  .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./src/public/css/*.less', ['less']);
  gulp.watch('./src/public/**/*.js', ['es6']);
  gulp.watch(['./src/**/*.js', '!./src/public/**/*.js'], ['es6:server']);
});

gulp.task('copy', () => {
  gulp.src('./src/app/views/**')
  .pipe(gulp.dest('./build/app/views/'));
  gulp.src('./src/public/img/**')
  .pipe(gulp.dest('./build/public/img/'));
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'build/app.js',
    ext: 'js',
    stdout: false
  }).on('readable', () => {
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
  'es6',
  'es6:server',
  'less',
  'copy',
  'develop',
  'watch'
  ]);
