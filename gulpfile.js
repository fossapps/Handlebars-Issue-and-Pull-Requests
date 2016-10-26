const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const merge = require('merge2');
const dts = require("dts-bundle");
const plato = require('plato');
const runSequence = require('run-sequence');
const Builder = require('systemjs-builder');
const babel = require('gulp-babel');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function() {
    del(['./build', './dist']);
});

gulp.task('compile', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts
            .pipe(gulp.dest('build')),
        tsResult.js
            .pipe(sourcemaps.write('.', { sourceRoot: '.' }))
            .pipe(gulp.dest('build'))
    ]);
});

gulp.task('bundle-js', function() {
    var builder = new Builder('.');

    // Fix jspm trying to load .js files without extensions.
    builder.config({
        paths: {
            "*": "*.js"
        }
    });

    return builder
        .buildStatic('./build/src/**/*.js', './dist/bundle.js', {
            runTime: false,
            format: 'cjs',
            sourceMaps: false // paths are wrong and not very useful anyway
        });
});

gulp.task('bundle-js-babel', function() {
    gulp.src('dist/bundle.js')
        //.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'babili']
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('bundle-dts', function() {
    var result = dts.bundle({
        name: 'module',
        main: 'build/src/**/*.d.ts',
        out: "~/dist/bundle.d.ts",
        prefix: "",
        verbose: false,
        emitOnNoIncludedFileNotFound: true,
        emitOnIncludedFileNotFound: false,
        outputAsModuleFolder: true
    });
    if (!result.emitted) {
        throw Error("dts-bundle from main file not emit result.");
    }
});

gulp.task('build', function(done) {
    runSequence('clean', 'compile', 'bundle-js', 'bundle-js-babel', 'bundle-dts', done);
});

gulp.task('default', ['build'], function () {});

gulp.task('compile-w', function() {
  return gulp.watch(tscConfig.filesGlob, ['compile'])
});

gulp.task('tslint', function() {
  return gulp.src(tscConfig.filesGlob)
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report());
});

gulp.task('tslint-w', function() {
  return gulp.watch(tscConfig.filesGlob, ['tslint'])
});

gulp.task('plato', ['compile'], function () {
    var options = {
        jshint: {
            options: {
                strict: false
            }
        },
        complexity: {
            trycatch: true
        }
    };

    var cb = function(report) { };

    return plato.inspect('build/**/*.js', 'report', options, cb);
});
