'use-strict';
const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');

const rev = require('gulp-rev');
const del = require('del');

gulp.task('css', function(){
  console.log('minifying css');
  gulp.src('./assets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cssnano())
  .pipe(gulp.dest('./assets.css'));

  return gulp.src('./assets/**/*.css')
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
    cwd: 'public',
    merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
});


//empty the directory after every build
gulp.task('clean:assets', function(done){
  del.sync('./public/assets');
  done();
});

gulp.task('build', gulp.series('clean:assets', 'css'), function(done){
  console.log('Building assets');
  done();
});



