const gulp = require('gulp');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

// eslint-disable-next-line arrow-body-style
gulp.task('default', () => {
	return gulp
		.src('./src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
});
