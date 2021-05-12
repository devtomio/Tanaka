// Build Script
const gulp = require('gulp');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const cssMinify = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

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
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

const css = () => {
	return gulp
		.src('./src/**/*.css')
		.pipe(sourcemaps.init())
		.pipe(cssMinify())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'));
};

const img = () => {
	return gulp.src('./src/**/*.png').pipe(imagemin()).pipe(gulp.dest('./dist'));
};

exports.default = gulp.series(main, ejs, css, img);
