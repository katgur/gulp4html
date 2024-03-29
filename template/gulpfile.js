import gulp from "gulp";
import sass from "gulp-dart-sass";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import concat from "gulp-concat-css";
import minify from "gulp-csso";
import server from "browser-sync";
import gulpclean from "gulp-clean";
import rename from "gulp-rename";
import convertwebp from "gulp-webp";
import jsmin from "gulp-jsmin";
import htmlmin from "gulp-htmlmin";
import svgstore from "gulp-svgstore";

const { series, watch, src, dest } = gulp;

function clean() {
    return src("dist/", { read: false })
        .pipe(gulpclean());
}

function html() {
    return src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("dist"));
}

function style() {
    return src("src/css/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(concat("index.css"))
        .pipe(minify())
        .pipe(rename("index.min.css"))
        .pipe(dest("dist/style"));
}

function fonts() {
    return src("src/fonts/*.{ttf,woff}")
        .pipe(dest("dist/fonts"))
}

function img() {
    return src("src/images/*.{png,svg,webp,jpg}")
        .pipe(dest("dist/images"))
}

function webp() {
    return src("dist/images/*.{png,jpg}")
        .pipe(convertwebp({ quality: 90 }))
        .pipe(dest("dist/images"));
}

function sprite() {
    return src("src/images/sprite/*.svg")
        .pipe(svgstore())
        .pipe(rename("sprite.svg"))
        .pipe(dest("dist/images"))
}

function scripts() {
    return src("src/js/*.js")
        .pipe(jsmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("dist/js"))
}

function serve() {
    server.init({
        server: "dist",
        cors: true
    });

    watch("src/**/*.html").on("change", series(html, server.reload));
    watch("src/css/**/*.{scss,sass,css}").on("change", series(style, server.reload));
    watch("src/js/**/*.js").on("change", series(scripts, server.reload));
}

export const build = series(clean, html, fonts, img, webp, sprite, style, scripts);
export const graphics = series(img, webp, sprite);
export default series(clean, html, fonts, img, webp, sprite, style, scripts, serve);