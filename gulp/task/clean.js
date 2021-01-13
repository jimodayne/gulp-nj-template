import gulp from 'gulp';
import clean from 'gulp-clean';

const cleanTask = () => {
    return gulp
        .src('dest/*', {
            read: false
        })
        .pipe(clean());
};

export default cleanTask;
