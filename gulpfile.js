const { src, dest, series } = require('gulp');

const gulpZip = require('gulp-zip');

const package = require('./package.json');
const clean = require('gulp-clean');

function cleanOutputTask(cb) {
    src('output/', { allowEmpty: true })
        .pipe(clean({ read: false}))

    cb();
}

function cleanDistTask(cb) {
    src('dist/', { allowEmpty: true })
        .pipe(clean({ read: false }))

    cb();
}

function copyTask(cb) {
    src('node_modules/**')
        .pipe(dest('output/node_modules/'));

    src('server.js')
        .pipe(dest('output/'));

    src('package-lock.json')
        .pipe(dest('output/'));

    src('package.json')
        .pipe(dest('output/'));
    cb();
}


function zip(cb) {
    console.log('ziping..');
    src('output/**')
        .pipe(gulpZip(`${package.name}_${package.version}.zip`))
        .pipe(dest('dist'));
        console.log('ziped!');
    cb();
}

exports.default = series(copyTask, zip);
