const { src, dest, parallel, series, watch } = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean assets

function clear() {
    return src('./dest/*', {
        read: false
    }).pipe(clean());
}

function html() {}

// JS function

function js() {
    const source = './src/js/*.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest('./dest/js/'))
        .pipe(browsersync.stream());
}

// CSS function

function css() {
    const source = './src/css/*.scss';

    return src(source)
        .pipe(changed(source))
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
        .pipe(dest('./dest/css/'))
        .pipe(browsersync.stream());
}

// Optimize images

function img() {
    return (
        src('./src/img/*')
            // .pipe(imagemin())
            .pipe(dest('./dest/images'))
    );
}

// Watch files

function watchFiles() {
    watch('./src/scss/*', css);
    watch('./src/js/*', js);
    watch('./src/images/*', img);
    watch('./src/template/*', html);
}

// BrowserSync

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img));
