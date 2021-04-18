const gulp = require('gulp');
const terser = require('gulp-terser');
const cssMinify = require('gulp-clean-css');
const ejsMinify = require('gulp-minify-ejs');
const sourcemaps = require('gulp-sourcemaps');

const main = () => {
	return gulp
		.src('./src/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

const ejs = () => {
	return gulp
		.src('./src/**/*.ejs')
		.pipe(sourcemaps.init())
		.pipe(ejsMinify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

const css = () => {
	return gulp
		.src('./src/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(cssMinify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

exports.default = gulp.series(main, ejs, css);
