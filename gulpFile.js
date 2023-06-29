const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const svgSprite = require("gulp-svg-sprites");
const webp = require('gulp-webp');


function copyData() {
    return gulp.src(['src/data/**/*.json'])
        .pipe(gulp.dest('dist/data'))
};
function convertToWebp() {
    return gulp.src(['src/img/**/*.png','src/img/**/*.jpg'])
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
};
function copyGifAndIco() {
    return gulp.src(['src/img/**/*.gif','src/img/**/*.ico'])
        .pipe(gulp.dest('dist/img'))
};
function onSvgSprite() {
    return gulp.src('./src/img/*.svg')
        .pipe(svgSprite({ mode: "symbols" }))
        .pipe(gulp.dest("dist/img"));
}

function buildStylesTask() {
    return gulp
        .src("./src/styles/styles.scss")
        .pipe(sass())
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./dist/styles"));
}
function copyHTMLFile() {
    return gulp.src("./src/**.html").pipe(gulp.dest("./dist"));
}
function buildScripts() {
    return gulp
        .src("./src/script/*.js")
        .pipe(uglify())
        .pipe(concat("script.js"))
        .pipe(gulp.dest("./dist/script"));
}
function watchСhanges() {
    gulp.watch("./src/styles/**/*.scss", buildStylesTask);
    gulp.watch("./src/**.html", copyHTMLFile);
    gulp.watch("./src/script/*.js", buildScripts);
    gulp.watch('./src/img/*.svg', onSvgSprite);
    gulp.watch(['src/img/**/*.png', 'src/img/**/*.jpg'], convertToWebp);
    gulp.watch(['src/img/**/*.gif','src/img/**/*.ico'], copyGifAndIco);
    gulp.watch(['src/data/**/*.json'], copyData);
}

exports.copyHTMLFile = copyHTMLFile;
exports.buildScripts = buildScripts;
exports.watchСhanges = watchСhanges;
exports.buildStylesTask = buildStylesTask;
exports.onSvgSprite = onSvgSprite;
exports.convertToWebp = convertToWebp;
exports.copyGifAndIco = copyGifAndIco;
exports.copyData = copyData;

exports.watchProject = gulp.series(
    onSvgSprite,
    copyHTMLFile,
    buildStylesTask,
    buildScripts,
    convertToWebp,
    copyGifAndIco,
    copyData,
    watchСhanges
);

exports.buildProject = gulp.series(
    onSvgSprite,
    copyHTMLFile,
    buildStylesTask,
    buildScripts,
    convertToWebp,
    copyGifAndIco,
    copyData,
);
