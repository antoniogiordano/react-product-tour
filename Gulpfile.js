var gulp = require('gulp')
var less = require('gulp-less')
var util = require('gulp-util')

gulp.task('less', function () {
  return gulp.src('./src/rpt.less')
    .pipe(less({
        paths: [ '/src/' ]
      })).on('error', util.log)
    .pipe(gulp.dest('./dist/'))
})

gulp.watch('src/rpt.less', ['less'])

gulp.task('default', function() {

});