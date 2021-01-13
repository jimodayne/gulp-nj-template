import { filesPath, destPath } from '../config/index.js';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import gulp from 'gulp';
import changed from 'gulp-changed';
import mode from './mode.js';

const jsTask = () => {
    return gulp
        .src(filesPath.js)
        .pipe(changed(filesPath.js))
        .pipe(concat('bundle.js'))
        .pipe(mode.production(terser()))
        .pipe(gulp.dest(destPath.js));
};

export default jsTask;
