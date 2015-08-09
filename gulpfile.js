// gulp
var gulp = require('gulp');

// plugins
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var stylish = require('jshint-stylish');
var sequence = require('run-sequence');

var paths = {
  all: 'app/**',
  distribution: 'dist/',
  app: {
    scripts: 'app/js/**/*.js',
    html: 'app/view/**/*.html',
    index: 'app/index.html',
    css: 'app/css/**/*.css'
  },
  vendor: {
    scripts: 'app/vendor/**/*.js',
    css: 'app/vendor/**/*.css'
  }
};

// tasks
gulp.task('clean', function() {
    return gulp.src(paths.distribution + '*')
      .pipe(clean({force: true}));
});

gulp.task('lint', function() {
  gulp.src([paths.app.scripts])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('minify-app', function () {
  var assets = useref.assets();

  gulp.src(paths.app.index)
    .pipe(assets)
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(paths.distribution));
});

gulp.task('copy-view', function () {
  gulp.src(paths.app.html)
    .pipe(gulp.dest(paths.distribution + 'view/'));
});


// default task
gulp.task('default',
  ['lint']
);
// build task
gulp.task('build-prod', function(cb) {
    sequence('clean', ['minify-app', 'copy-view'], cb);
});
