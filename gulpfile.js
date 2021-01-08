const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const nunjucks = require('gulp-nunjucks');
const changed = require('gulp-changed');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');

const BASE_DIR = 'src/';
const BASE_DEST = 'dest/';

const filesPath = {
    scss: BASE_DIR + 'scss/*.scss',
    scssFull: BASE_DIR + 'scss/**/*.scss',
    js: BASE_DIR + 'js/*.js',
    js3rd: BASE_DIR + 'js/3rd/*.js',
    html: BASE_DIR + 'template/*.{html,njk}',
    htmlFull: BASE_DIR + 'template/**/*.{html,njk}',
    img: BASE_DIR + 'images/**/*',
    font: BASE_DIR + 'fonts/**/*'
};
const destPath = {
    scss: BASE_DEST + 'css/',
    js: BASE_DEST + 'js/',
    js3rd: BASE_DEST + 'js/3rd',
    html: BASE_DEST,
    img: BASE_DEST + 'images/',
    font: BASE_DEST + 'fonts/'
};

function clearTask() {
    return src('dest/*', {
        read: false
    }).pipe(clean());
}

function jsTask() {
    return src(filesPath.js)
        .pipe(changed(filesPath.js))
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(dest(destPath.js));
}
function js3rdTask() {
    return src(filesPath.js3rd).pipe(dest(destPath.js3rd));
}
function fontTask() {
    return src(filesPath.font).pipe(dest(destPath.font));
}

function imgTask() {
    return src(filesPath.img).pipe(dest(destPath.img));
}

function scssTask() {
    return src(filesPath.scss)
        .pipe(changed(filesPath.scss))
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(cssnano())
        .pipe(dest(destPath.scss))
        .pipe(browserSync.stream());
}

function htmlTask() {
    return src(filesPath.html)
        .pipe(nunjucks.compile())
        .pipe(dest(destPath.html));
}

function watchTask() {
    watch(filesPath.scssFull, scssTask);
    watch(filesPath.js, jsTask);
    watch(filesPath.htmlFull, htmlTask).on(
        'change',
        series(cache.clearAll, browserSync.reload)
    );
}

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: BASE_DEST
        }
    });
}

exports.default = series(
    clearTask,
    parallel(scssTask, jsTask, htmlTask, imgTask, js3rdTask, fontTask),
    parallel(browserSyncTask, watchTask)
);
