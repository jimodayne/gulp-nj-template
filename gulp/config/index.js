const BASE_DIR = 'src/';
const BASE_DEST = 'dest/';

const filesPath = {
    scss: BASE_DIR + 'scss/*.scss',
    scssFull: BASE_DIR + 'scss/**/*.scss',
    js: BASE_DIR + 'js/*.js',
    js3rd: BASE_DIR + 'js/3rd/*.js',
    html: BASE_DIR + 'template/*.{html,njk}',
    htmlFull: BASE_DIR + 'template/**/*.{html,njk}',
    img: BASE_DIR + 'images/**/*',
    font: BASE_DIR + 'fonts/**/*'
};
const destPath = {
    scss: BASE_DEST + 'css/',
    js: BASE_DEST + 'js/',
    js3rd: BASE_DEST + 'js/3rd',
    html: BASE_DEST,
    img: BASE_DEST + 'images/',
    font: BASE_DEST + 'fonts/'
};

const copyPath = [filesPath.font, filesPath.img, filesPath.js3rd];
export { BASE_DIR, BASE_DEST, filesPath, destPath, copyPath };
