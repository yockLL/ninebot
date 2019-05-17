const gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      minifyCss = require('gulp-minify-css'),
      gulpSass = require('gulp-sass'),
      htmlmin = require('gulp-htmlmin'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');

gulp.task('css', () => {
    gulp.src(['src/css/*.scss',"!src/module/*.scss"])
        .pipe(gulpSass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
})

gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(htmlmin({
          removeComments: true,//清除HTML注释
          collapseWhitespace: true,//压缩HTML
          collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
          removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input checked/>
          removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
          removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
          minifyJS: true,//压缩页面JS
          minifyCSS: true//压缩页面CSS 
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
        
})

gulp.task('js', () => {
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
})

gulp.task('libs', () => {
    gulp.src('src/libs/**/*')
        .pipe(gulp.dest('dist/libs'));
})

gulp.task('images', () => {
    gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));
})

gulp.task('upload', () => {
    gulp.src('src/upload/**/*')
        .pipe(gulp.dest('dist/upload'));
})

gulp.task('server', () => {
   connect.server({
     root: "dist",
     port: 2333,
     livereload: true //热更新
   });
})

gulp.task('watch', () => {
    //监听所有html文件的修改，一旦被修改了，html任务就会被执行
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/css/**/*.scss', ['css']);

})

//把任务集中执行
gulp.task('default', ["html", "css", "js", "libs", "images", "upload", "server", "watch"]);