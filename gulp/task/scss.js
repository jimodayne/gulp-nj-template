import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';
import mode from './mode.js';
import { filesPath, destPath } from '../config/index.js';

function scssTask() {
    return gulp
        .src(filesPath.scss)
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
        .pipe(mode.production(cssnano()))
        .pipe(gulp.dest(destPath.scss))
        .pipe(browserSync.stream());
}

export default scssTask;
