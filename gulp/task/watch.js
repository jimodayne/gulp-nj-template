import gulp from 'gulp';
import browserSync from 'browser-sync';
import cache from 'gulp-cache';
import scss from './scss.js';
import js from './js.js';
import html from './html.js';
import { filesPath } from '../config/index.js';

const { watch, series } = gulp;

const watchTask = () => {
    watch(filesPath.scssFull, scss);
    watch(filesPath.js, js);
    watch(filesPath.htmlFull, html).on(
        'change',
        series(cache.clearAll, browserSync.reload)
    );
};

export default watchTask;
