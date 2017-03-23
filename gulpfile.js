var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('images', function() {
   return gulp.src('./public/img/**/*.*')
        .pipe(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: false,
            // svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            // use: [pngquant({
            //   quality: 20,
            //   speed: 10,
            //   verbose: true
            // })] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./public/img/'));
});
gulp.task('build', ['images']);