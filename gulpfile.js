var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject');

var appConfig = {
    bower: 'bower_components',
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
};

// 启动web服务器
// -------------------------------
gulp.task('connect:dev', function() {
    connect.server({
        root: [appConfig.app],
        port: 9002,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                connect.static('.tmp'),
                connect().use(
                    '/' + appConfig.dist,
                    connect.static('./' + appConfig.dist)
                ),
                connect().use(
                    '/bower_components',
                    connect.static('./bower_components')
                ),
                connect().use(
                    '/bower_components/tinymce-dist/skins',
                    connect.static('./bower_components/angular-ui-tinymce/src/skins')
                ),
            ]
        }
    });
});

gulp.task('connect:build', function() {
    connect.server({
        root: [appConfig.dist],
        port: 9002
    });
});


// 打开浏览器
// -------------------------------
gulp.task('open', function() {
    return gulp.src(__filename).pipe(open({
        uri: 'http://localhost:9002'
    }));
});


// 监听文件改动
// -------------------------------
gulp.task('watch', function() {
    gulp.watch(path.join(appConfig.app, '/styles/**/*.scss'), ['sass']);
    gulp.watch(path.join(appConfig.app, '/scripts/**/*.js'), ['jshint']);
});


// 编译SASS
// -------------------------------
gulp.task('sass', function() {
    return gulp.src(path.join(appConfig.app, '/styles/**/*.scss'))
        .pipe(sass())
        .pipe(gulp.dest('./.tmp/styles'))
        .pipe(connect.reload());
});


// JS校验(jshint)
// -------------------------------
gulp.task('jshint', function() {
    return gulp.src(path.join(appConfig.app, '/scripts/**/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Clean
// -------------------------------
gulp.task('clean:build', function() {
    return del([path.join(appConfig.dist, '/**')]);
});


// usemin
// -------------------------------
gulp.task('usemin', ['clean:build', 'sass'], function() {
    return gulp.src(path.join(appConfig.app, '/index.html'))
        .pipe(usemin({
             css: [ minifyCss({keepSpecialComments:0}) ],
             js_demo: [ ngAnnotate(), uglify() ]
        }))
        .pipe(gulp.dest(appConfig.dist));
});


// 编译angular template
// -------------------------------
gulp.task('template:seed', ['clean:build'], function() {
    return gulp.src(path.join(appConfig.app, '/scripts/**/*.html'))
        .pipe(templateCache('seedTemplate.js', {
            module: 'pasp.ui.seed',
            root: 'scripts'
        }))
        .pipe(gulp.dest(path.join(appConfig.dist, 'scripts')));
});


// 插入angular template
// -------------------------------
gulp.task('inject', ['usemin', 'template:seed'], function() {
    var partialsInjectFile = gulp.src([path.join(appConfig.dist, 'scripts/seedTemplate.js')], { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:ngTemplate -->',
        ignorePath: appConfig.dist,
        addRootSlash: false
    };

    return gulp.src(path.join(appConfig.dist, '/index.html'))
        .pipe(inject(partialsInjectFile, partialsInjectOptions))
        .pipe(gulp.dest(appConfig.dist));
});

// 复制依赖包
// -------------------------------
gulp.task('copy:lib', ['clean:build'], function() {
    gulp.src(path.join(appConfig.app, 'libs/**/*'))
        .pipe(gulp.dest(path.join(appConfig.dist, 'libs')));
});

// 复制图片
// -------------------------------
gulp.task('copy:image', ['clean:build'], function() {
    gulp.src(path.join(appConfig.app, 'images/**/*'))
        .pipe(gulp.dest(path.join(appConfig.dist, 'images')));
});

gulp.task('copy:pic', ['clean:build'], function() {
    gulp.src(path.join(appConfig.app, 'pics/**/*'))
        .pipe(gulp.dest(path.join(appConfig.dist, 'pics')));
});

// 复制测试JSON API
// -------------------------------
gulp.task('copy:api', ['clean:build'], function() {
    gulp.src(path.join(appConfig.app, 'api/**/*'))
        .pipe(gulp.dest(path.join(appConfig.dist, 'api')));
});

// 复制文件
// -------------------------------
gulp.task('copy', ['copy:image', 'copy:pic', 'copy:api', 'copy:lib']);


// 运行开发环境
// -------------------------------
gulp.task('default', ['sass', 'jshint', 'watch', 'connect:dev', 'open'], function() {
    console.log('Started App!');
});

// 编译生产环境
// -------------------------------
gulp.task('build', ['clean:build', 'sass', 'usemin', 'template:demo', 'inject', 'copy'], function() {

});