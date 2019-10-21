'use strict';

const gulp = require('gulp'),
	babel = require('gulp-babel'),
	less = require('gulp-less'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require("gulp-uglify");

// Minify js file
gulp.task('js', () => {
	gulp.src([
		'./src/js/**/*.js',
		'./src/js/app.js',
	])
		.on('error', function (err) {
			console.log(err);
		})
		.pipe(babel({
			presets: ['env']
		}))
		// .pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('./dist/js'));
});


// Minify vendors file
gulp.task('vendors-js', () => {
	gulp.src([
		'node_modules/jquery/dist/jquery.min.js'
	])
		.pipe(concat('vendors.min.js'))
		.pipe(gulp.dest('./dist/js'));
});


// Minify less file
gulp.task('less', () => {
	gulp.src([
		'./src/less/app.less'
	])
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('./dist/css'));
});


// Copy all images from src to dist
gulp.task('copy-image', () => {
	gulp.src([
		'./src/img/**/*'
	])
		.pipe(gulp.dest('./dist/img/'));
});


// Build setup
gulp.task('build', ['less', 'copy-image', 'vendors-js', 'js']);


// Run gulp and watchers
gulp.task('default', ['build'], () => {

	// Watch Images
	gulp.watch(["./src/img/**/*"], ['copy-image']);

	// Watch LESS Files
	gulp.watch(["./src/less/**/*.less"], ['less']);

	// Watch JS Files
	gulp.watch(["./src/js/*.js"], ['js']);
	gulp.watch(["./src/js/**/*.js"], ['js']);

	// Watch HTML Files
	gulp.watch([
		"*.html",
		"**/*.html"
	]);
});
