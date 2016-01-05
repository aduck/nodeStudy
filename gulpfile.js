//引用模块
var gulp=require('gulp');
var uglify=require('gulp-uglify');
var minifycss=require('gulp-minify-css');
var rename=require('gulp-rename');
var jshint=require('gulp-jshint');
var concat=require('gulp-concat');
var spriter=require('gulp-css-spriter');
/*语法检查
gulp.task('jshint',function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
})
*/
//压缩合并js
gulp.task('script',function(){
	return gulp.src('js/*.js')
		.pipe(concat('merge.js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
})
//监控js变化并压缩
gulp.task('autojs',function(){
	return gulp.watch('js/*.js',['script'])
})
//压缩css并生成雪碧图
gulp.task('css',function(){
	//var timestamp=Date.now();
	return gulp.src('css/*.css')
		.pipe(spriter({
			'spriteSheet':'./dist/images/spritesheet.png',
			'pathToSpriteSheetFromCSS':'../images/spritesheet.png'
		}))
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
})
//监控css变化并压缩
gulp.task('autocss',function(){
	return gulp.watch('css/*.css',['css'])
})
//自动执行css.js压缩任务
gulp.task('default',['script','autojs','css','autocss'])
