var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cp          = require('child_process');

var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

gulp.task('jekyll-dev', function (done) {
  browserSync.notify(messages.jekyllDev);
  //return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
 .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.notify("REBUILDING");
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-dev'], function() {
  browserSync.init({
    server: "_site",
    online: true
  });
});

gulp.task('sass', function () {
  return gulp.src('_dev/css/main.scss')
  .pipe(sass())
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('assets/css'));
});

/*
.pipe(sass({
  includePaths: ['scss'],
  onEr
*/

gulp.task('scripts', function() {
  return gulp.src('_dev/js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('_site/assets/js'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function () {
  gulp.watch(['_dev/css/**/*.scss'], ['sass']);
  gulp.watch(['_dev/js/**/*.js'], ['scripts']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '**/*.html'], ['jekyll-rebuild']);
});

gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
  .on('close', done);
});

gulp.task('sass-prod', function () {
  return gulp.src('_dev/css/main.scss')
  .pipe(sass())
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssnano())
  .pipe(gulp.dest('_site/css'));
  //.pipe(gulp.dest('css'));
});

/*
.pipe(sass({
  includePaths: ['scss'],
  onError: browserSync.notify
}))
*/

gulp.task('scripts-prod', function() {
  return gulp.src('_dev/js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest('_site/js'));
  //.pipe(gulp.dest('js'));
});

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('build', ['scripts-prod', 'sass-prod', 'jekyll-prod']);
