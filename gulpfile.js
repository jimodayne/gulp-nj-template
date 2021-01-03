const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const nunjucks = require('gulp-nunjucks');
const changed = require('gulp-changed');
const browserSync = require('browser-sync').create();

const BASE_DIR = 'src/';
const BASE_DEST = 'dest/';

const filesPath = {
    scss: BASE_DIR + 'scss/**/*.scss',
    js: BASE_DIR + 'js/**/*.js',
    html: BASE_DIR + 'template/*.{html,njk}',
    img: BASE_DIR + 'images/**/*'
};
const destPath = {
    scss: BASE_DEST + 'css/',
    js: BASE_DEST + 'js/',
    html: BASE_DEST,
    img: BASE_DEST + 'images/'
};

function clearTask() {
    return src('dest/*', {
        read: false
    }).pipe(clean());
}

function jsTask() {
    return src(filesPath.js)
        .pipe(changed(filesPath.js))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(dest(destPath.js));
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
    watch(filesPath.scss, scssTask);
    watch(filesPath.js, jsTask);
    watch(filesPath.html, htmlTask).on('change', browserSync.reload);
}

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: './dest/'
        }
    });
}

exports.default = series(
    clearTask,
    parallel(scssTask, jsTask, htmlTask, imgTask),
    parallel(browserSyncTask, watchTask)
);
