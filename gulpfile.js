const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const livereload = require('gulp-livereload');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const nodemon = require('gulp-nodemon');



gulp.task('sass', () => {
  return sass('./src/*.scss')
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

gulp.task('jade', () => {
  return gulp.src('src/*.jade')
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(livereload());
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app',
    ext: 'js',
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


gulp.task('watch', () => {
  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.jade', ['jade']);
});


gulp.task('default', [
  'sass', 'jade', 'develop' , 'watch'
]);
