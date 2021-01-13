import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import { filesPath, destPath } from '../config/index.js';

const htmlTask = () => {
    return gulp
        .src(filesPath.html)
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(destPath.html));
};

export default htmlTask;
