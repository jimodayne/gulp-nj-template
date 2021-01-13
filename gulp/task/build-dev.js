import gulp from 'gulp';
import clean from './clean.js';
import copy from './copy.js';
import scss from './scss.js';
import js from './js.js';
import html from './html.js';
import watch from './watch.js';
import browserSync from './browserSync.js';

const { series, parallel } = gulp;

const dev = series(
    clean,
    parallel(scss, js, html, copy),
    parallel(browserSync, watch)
);

export default dev;
