//REQUIRES
var gulp = require('gulp')
  
  //POSTCSS
  , postcss = require('gulp-postcss')
  , cssnano = require('cssnano')
  , cssnext = require('postcss-cssnext')
  , scss = require('postcss-scss')
  
  //DEFAULT
  , sass = require('gulp-sass')
  , sourcemaps = require('gulp-sourcemaps')
  , ext_replace = require('gulp-ext-replace');

//PATHS FILES
var paths = {
	src : {
		css 	: {
		  sass : 'assets/scss/clefs.scss',
		  watch : 'assets/scss/**/*.scss',
		}
	} ,
	dest : {
		css 	: 	'assets/',
		beauty : {
		  css  : 'assets/beauty'
		}
	}
}

//TASKS
gulp.task('css', function(){
  gulp.src( paths.src.css.sass )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      cssnext()
    ]).on('error', function(err) {
        console.log(err.message);
    }))
    .pipe(gulp.dest( paths.dest.css ))
    .pipe(postcss([
      cssnano
    ]))
    .pipe(ext_replace('.min.css'))
    .pipe(sourcemaps.write( '.' ))
    .pipe(gulp.dest( paths.dest.css ));
});

//WATCH
gulp.task('watch', function(){
  gulp.watch(paths.src.css.watch, ['css']);
});

gulp.task('default', ['css', 'watch']);