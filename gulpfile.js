var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

var scripts = require('./scripts');
var styles = require('./styles');

gulp.task('css', function() {
  gulp
    .src(styles)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('js', function() {
  gulp
    .src(scripts)
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('image', function() {
  gulp
    .src(['./src/**/*.png', './src/**/*.jpg', './src/**/*.gif'])
    .pipe(gulp.dest('./build/assets/img'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('fonts', function() {
  return gulp
    .src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
    .pipe(gulp.dest('./build/assets/fonts/'));
});

gulp.task('html', function() {
  return gulp
    .src('./src/**/*.html')
    .pipe(gulp.dest('./build/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('build', function() {
  gulp.start(['css', 'js', 'image', 'fonts', 'html']);
});

gulp.task('browser-sync', function() {
  var open = process.argv.find(function(arg) {
    return arg == '-open';
  });
  browserSync.init(null, {
    open: open,
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('start', function() {
  gulp.start(['build', 'browser-sync']);
  gulp.watch(['./src/app/**/*.css'], ['css']);
  gulp.watch(['./src/app/**/*.js'], ['js']);
  gulp.watch(['./src/app/**/*.html'], ['html']);
});
