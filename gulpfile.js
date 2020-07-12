
let projectFolder = 'dist';
let sourceFolder = 'src';

let path = {
    build: {
        pug: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        icons: projectFolder + '/icons/',
        video: projectFolder + '/video/',
    },
    src: {
        pug: [sourceFolder + '/*.pug', "!" + sourceFolder + '/_*.pug'],
        css: sourceFolder + '/sass/style.sass',
        js: sourceFolder + '/js/index.js', 
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        icons: sourceFolder + '/icons/**/*.{jpg,png,svg,gif,ico,webp}',
        video: sourceFolder + '/video/**/*',
    },
    watch: {
        pug: sourceFolder + '/**/*.pug',
        css: sourceFolder + '/sass/**/*.sass',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        icons: sourceFolder + '/icons/**/*.{jpg,png,svg,gif,ico,webp}',
        video: sourceFolder + '/video/**/*',
    },
    clean: "./" + projectFolder + "/"
};

let { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersynk = require("browser-sync").create(),
    fileInclude = require("gulp-file-include"),
    del = require("del"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    groupmedia = require("gulp-group-css-media-queries"),
    cleancss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    pug = require("gulp-pug"),
    webpack = require("webpack-stream");
    imagemin = require("gulp-imagemin");
    

    function browserSynk() {
        browsersynk.init({
            server: {
                baseDir: "./" + projectFolder + "/"
            },
            port: 3000,
            notify: false
        });
    }

    function clean() {
        return del(path.clean);
    }

    function pugInit() {
        return src(path.src.pug)
            .pipe(pug({
                pretty: true
            }))
            .pipe(dest(path.build.pug))
            .pipe(browsersynk.stream());
    }

    function css() {
        return src(path.src.css)
            .pipe(
                sass({
                    outputStyle: "expanded"
                })
            )
            .pipe(
                autoprefixer({
                    overrideBrowserslist: ["last 5 versions"],
                    cascade: true   
                })
            )
            .pipe(
                groupmedia()
            )
            .pipe(dest(path.build.css))
            .pipe(cleancss() )
            .pipe(
                rename({
                    extname: ".min.css"
                })
            )
            .pipe(dest(path.build.css))
            .pipe(browsersynk.stream());
    }
    function js() {
        return src(path.src.js)
            .pipe(fileInclude())
            .pipe(dest(path.build.js))
            .pipe(
                uglify()
            )
            .pipe(
                rename({
                    extname: ".min.js"
                })
            )
            .pipe(dest(path.build.js))
            .pipe(browsersynk.stream());
    }
    function video() {
        return src(path.src.video)
            .pipe(dest(path.build.video))
            .pipe(browsersynk.stream());
    }
    function images() {
        return src(path.src.img)
            .pipe(
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3
                })
            )
            .pipe(dest(path.build.img))
            .pipe(browsersynk.stream());
    }
    function icon() {
        return src(path.src.icons)
            .pipe(dest(path.build.icons))
            .pipe(browsersynk.stream());
    }

    function watchFiles() {
        gulp.watch([path.watch.pug], pugInit);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.icons], icon);
        gulp.watch([path.watch.js], js);
        gulp.watch([path.watch.img], images);
    }

    let build = gulp.series(clean, gulp.parallel(css, js, pugInit, images, video, icon));
    let watch = gulp.parallel(build, watchFiles, browserSynk);


    

    exports.icon = icon;
    exports.video = video;
    exports.images = images;
    exports.js = js;
    exports.css = css;
    exports.pugInit = pugInit;
    exports.build = build;
    exports.watch = watch;
    exports.default = watch;


    
