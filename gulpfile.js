const gulp = require('gulp');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

const defaultTask = () => {
	return gulp
		.src('./src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

const webTask = () => {
	return gulp.src('./src/**/*.ejs').pipe(sourcemaps.init()).pipe(sourcemaps.write('./')).pipe(gulp.dest('./dist'));
};

exports.default = gulp.series(defaultTask, webTask);
