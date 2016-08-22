import gulp from 'gulp';

import path from 'path';

import del from 'del';

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import exorcist from 'exorcist';
import notify from 'gulp-notify';
import source from 'vinyl-source-stream';
import transform from 'vinyl-transform';
import watchify from 'watchify';

import sourcemaps from 'gulp-sourcemaps';
import eslintify from 'eslintify';
import changed from 'gulp-changed';
import print from 'gulp-print';

import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';
import autoprefixer from 'gulp-autoprefixer';
import bourbon from 'bourbon';
import bourbonNeat from 'bourbon-neat';

var browserSync = require('browser-sync').create();


export const ENV = process.env.NODE_ENV || 'development';
export const DIR_SRC = path.join(__dirname, 'lib/assets/src');
export const DIR_DIST = path.join(__dirname, 'public');
export const DIR_NPM = path.join(__dirname, 'node_modules');

export const DIR_TESTS = path.join(__dirname, 'lib/assets/tests/');
export const DIR_TESTS_LEGACY = path.join(__dirname, 'spec/javascripts'); // TODO - deprecate
export const DIR_DIST_TESTS = path.join(__dirname, 'lib/assets/tests/.tmp');
export const DIR_DIST_TESTS_LEGACY = path.join(__dirname, './spec/build');   // TODO - deprecate

export const DIR_SRC_STYLES = path.join(DIR_SRC, 'styles');
export const DIR_SRC_SCRIPTS = path.join(DIR_SRC, 'scripts');
export const DIR_SRC_IMAGES = path.join(DIR_SRC, 'images');
export const DIR_DIST_STYLES = path.join(DIR_DIST, 'stylesheets');
export const DIR_DIST_SCRIPTS = path.join(DIR_DIST, 'javascripts');
export const DIR_DIST_IMAGES = path.join(DIR_DIST, 'images');

const jsSource = {
    dev: {
        name: 'dev',
        entry: DIR_SRC_SCRIPTS,
        build: 'javascripts/index.js',
        dest: DIR_DIST
    },
    test: {
        name: 'test',
        entry: DIR_TESTS_LEGACY,
        build: 'index.js',
        dest: DIR_DIST_TESTS_LEGACY
    }
};

const browserSyncConf = {
	proxy: 'http://localhost:3000',  // local node app address
	port: 3001,  // use *different* port than above to 'detach' client side
	notify: true,
	open: true
};


function reload() {
	browserSync.reload();
}

function handleErrors() {
    const args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}

function bundle(env, bundler, minify, catchErrors) {
    let result = bundler.bundle();
    if (catchErrors) {
        // Display errors to the user, and don't let them propagate.
        result = result.on('error', handleErrors);
    }
    result = result
        .pipe(source(env.build))
        .pipe(buffer());

    result = result
    // Extract the embedded source map to a separate file.
        .pipe(transform(function() { return exorcist(env.dest + '/' + env.build + '.map'); }))
        // Write the finished product.
        .pipe(gulp.dest(env.dest));

    return result;
}

function build(env) {
    return bundle(env, browserify({
            entries: env.entry,
            debug: true,
            paths: [
                `${DIR_SRC}/scripts/`
            ]
        })
            .transform({continuous: true}, eslintify)
            .transform(babelify),
        true,
        false
    );
}

function watch(env, minify) {
    const bundler = watchify(
        browserify({
            entries: env.entry,
            debug: true,
            cache: {},
            packageCache: {},
            paths: [
                `${DIR_SRC}/scripts/`
            ]
        })
            .transform({continuous: true}, eslintify)
            .transform(babelify),
        {poll: 1000}
    );

    function rebundle(ids) {
        // Don't rebundle if only the version changed.
        if (ids && ids.length === 1 && (/\/version\.js$/).test(ids[0])) {
            return false;
        }
        const start = new Date();
        const result = bundle(env, bundler, minify, true);
        result.on('end', function() {
            console.log('Rebuilt ' + env.build + ' in ' + (new Date() - start) + ' milliseconds.');
        });
        return result;
    }

    bundler.on('update', rebundle);
    return rebundle();
}

function clean(files, done) {
  return del(files, done);
}


/**
 * Tasks
 */

gulp.task('clean', (done) => {
	return clean([
		DIR_DIST_STYLES + '/**/*',  // don't remove the folder
		DIR_DIST_SCRIPTS + '/**/*',
		DIR_DIST_IMAGES + '/**/*',
	], done);
});

gulp.task('clean:tests', (done) => {
  return clean([
    DIR_DIST_TESTS
  ], done);
});

gulp.task('clean:tests:legacy', (done) => {
	return clean([
    DIR_DIST_TESTS_LEGACY
	], done);
});


gulp.task('sass', () => {
	return gulp.src(`${DIR_SRC_STYLES}/**/*.scss`)
		.pipe(sassLint({
			configFile: './.sass-lint.yml'
		}))
		.pipe(sassLint.format())
		.pipe(sourcemaps.init())
		.pipe(sass({
			includePaths: [
				DIR_NPM,
				bourbon.includePaths,   // todo - these aren't _really_ necessary
				bourbonNeat.includePaths
			]
		}).on('error', sass.logError))
		.pipe( print( (file) => 'Reading Sass: ' + file) )
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(DIR_DIST_STYLES));
});


gulp.task('scripts', () => build(jsSource.dev, false));

gulp.task('scripts_watch', () => watch(jsSource.dev, false));


gulp.task('test:legacy', () => build(jsSource.test, false));  // TODO - deprecate

gulp.task('test_watch:legacy', () => watch(jsSource.test, false));  // TODO - deprecate


gulp.task('images', () => {
	return gulp.src(`${DIR_SRC_IMAGES}/**/*.{jpg,png,gif,svg}`)
		.pipe( changed(DIR_DIST_IMAGES) )                       // ignore unchanged
		.pipe( print((file) => 'Reading IMAGE: ' + file))
		.pipe( gulp.dest(`${DIR_DIST_IMAGES}/`) );
});


function watch() {
	gulp.watch(`${DIR_SRC_STYLES}/**/*.scss`).on('change', gulp.series('sass', reload));
	gulp.watch(`${DIR_SRC_SCRIPTS}/**/*.js`).on('change', gulp.series('scripts_watch', reload));
	gulp.watch(`${DIR_SRC_IMAGES}/**/*.{jpg,png,gif,svg}`).on('change', gulp.series('images', reload));
}

gulp.task('connect', () => {
	browserSync.init(browserSyncConf);
});


/**
 * Workflows
 */

gulp.task('test', gulp.series('clean:tests:legacy', 'test:legacy'));

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'sass', 'images')));

gulp.task('watch', gulp.series('build', watch));

gulp.task('serve', gulp.series('build', 'connect', watch));
