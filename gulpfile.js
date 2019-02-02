const { src, dest, series } = require('gulp');
const debug = require('gulp-debug');

const gulpZip = require('gulp-zip');

const package = require('./package.json');
const clean = require('gulp-clean');

function cleanOutputTask() {
    return src('output/', { allowEmpty: true })
        .pipe(clean({ read: false }));
}

function cleanDistTask(cb) {
    return src('dist/', { allowEmpty: true })
        .pipe(clean({ read: false }));
}

function copyNodeModulesTask() {
    return src(['node_modules/**'], 
        { buffer: false })
        .pipe(dest('output/node_modules/'));
}

function copyFilesTask() {
    return src(['server.js', 'package-lock.json', 'package.json'], 
        { buffer: false })
        .pipe(dest('output/'));
}

function zip() {
    return src('output/**', { buffer: false })
        .pipe(gulpZip(`${package.name}_${package.version}.zip`))
        .pipe(debug())
        .pipe(dest('dist'));
}

exports.default = series(cleanOutputTask, cleanDistTask, copyNodeModulesTask, copyFilesTask, zip);
