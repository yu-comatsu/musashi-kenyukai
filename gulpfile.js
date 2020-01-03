const gulp = require('gulp');
const ejs = require('gulp-ejs');
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const ctlModule = "/Users/yuta_comatsu/Google ドライブ/Web Media Office/04顧客対応/単発案件/武蔵剣友会/musashi-kenyukai";
const src = ctlModule+"/src"
const public = ctlModule+"/public"

// 監視 ※gulp4の書き方です。
gulp.task( "default", function () {
    gulp.watch( src+"/**/*.scss", gulp.series( "sass" ) ); // srcディレクトリ以下の.scssファイルの更新を監視
    gulp.watch( src+"/**/*.ejs", gulp.series( "ejs" ) ); // srcディレクトリ以下の.ejsファイルの更新を監視
});

//ejs
gulp.task("ejs", function() {
    return gulp.src(src+'/**/[^_]*.ejs')
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "ejsエラー発生！",
                message: "<%= error.message %>"
            })
        }))
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest(public))
        .pipe(notify({
            title: 'Task running Gulp',
            message: 'ejs file compiled.',
            sound: 'Purr',
        }));
});


//sass
gulp.task("sass", function() {
    // style.scssファイルを取得
    return gulp.src(src+'/scss/[^_]*.scss')
        .pipe(plumber({
            errorHandler: notify.onError({
                title: "sassエラー発生！",
                message: "<%= error.message %>"
            })
        }))
        .pipe(sass()) // Sassのコンパイルを実行
        .pipe( autoprefixer())
        .pipe(gulp.dest(public+"/css")) // cssフォルダー以下に保存
        .pipe(notify({
            title: 'Task running Gulp',
            message: 'sass file compiled.',
            sound: 'Purr',
        }));
});