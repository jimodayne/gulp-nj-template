import gulp from 'gulp';
import copy from 'gulp-copy';
import { copyPath, BASE_DEST } from '../config/index.js';

const copyTask = () => {
    return gulp.src(copyPath).pipe(
        copy(BASE_DEST, {
            prefix: 1
        })
    );
};

export default copyTask;
