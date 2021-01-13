import browserSync from 'browser-sync';
import { BASE_DEST } from '../config/index.js';

function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: BASE_DEST
        }
    });
}

export default browserSyncTask;
