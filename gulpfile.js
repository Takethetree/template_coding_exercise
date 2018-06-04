let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence');
let src = require('gulp-src');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let dest = require('gulp-dest');


gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/styles.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('./css/'));
});

gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('watch', function () {
	gulp.watch('./scss/*.scss', ['styles']);
});

// exercise 6

gulp.task('concat-js', function() {
  return gulp.src(['js/jquery-3.2.1.slim.js','js/popper.js','js/bootstrap.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/'));
});

 
gulp.task('uglify', function () {
    return gulp.src("js/all.js")
        .pipe(rename("all.min.js"))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("./js/"));
});

gulp.task('minify-js', function(callback) {
	gulpSequence('concat-js', 'uglify')(callback)
});

gulp.task('watch2', function () {
	gulp.watch('./js/*.js', ['minify-js']);
});


// Gulp functions you'll need:
// src() - find source files
// concat() - from gulp-concat package
// uglify() - from gulp-uglify-es package
// dest() - save file(s) to destination
