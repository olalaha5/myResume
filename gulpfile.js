const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');



const cssnano = require('gulp-cssnano');
// const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');



function clear() {
    return src('./build/*', {
        read: false
    })
        .pipe(clean());
}



function fullCssCompilation() {
    return src('./src/blocks/**/*.sass')
        .pipe(concat('style.sass'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(cssnano())
        .pipe(dest('./build'))
        .pipe(browsersync.stream());
}



function img() {
    return src('./src/**/*.png')
        .pipe(imagemin())
        .pipe(dest('./build/img'));
}



function html() {
    return src('./src/*.html')
        .pipe(dest('./build/'))
        .pipe(browsersync.stream());
}

function fullHtmlCompilation() {
    return src('./src/pages/*.pug')
        .pipe(pug())
        .pipe(dest('./build'))
        .pipe(browsersync.stream());
}



function watchFiles() {
    watch('src/blocks/**/*.sass', fullCssCompilation);
    watch('./src/pages/*.pug', fullHtmlCompilation);
    watch('./src/**/*.png', img);
}



function browserSync() {
    browsersync.init({
        server: {
            baseDir: './build'
        },
        post: 3000
    });
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(fullHtmlCompilation, fullCssCompilation, img));