var	name    = require('./package.json').moduleName,
    fs      = require('fs'),
    gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')()

var head = fs.readFileSync('./node_modules/@electerious/modulizer/head.js', { encoding: 'utf8' }),
    foot = fs.readFileSync('./node_modules/@electerious/modulizer/foot.js', { encoding: 'utf8' })

var catchError = function(err) {

	console.log(err.toString())
	this.emit('end')

}

gulp.task('styles', function() {

	// Ugly
	gulp.src('./src/styles/main.scss')
	    .pipe(plugins.sass())
	    .on('error', catchError)
	    .pipe(plugins.concat(name + '.min.css', { newLine: "\n" }))
	    .pipe(plugins.autoprefixer('last 2 version', '> 1%'))
	    .pipe(plugins.minifyCss())
	    .pipe(gulp.dest('./dist/styles/ugly/'))

	gulp.src('./src/styles/ugly/themes/*.scss')
	    .pipe(plugins.sass())
	    .on('error', catchError)
	    .pipe(plugins.rename(function(path) { path.basename += '.min' }))
	    .pipe(plugins.autoprefixer('last 2 version', '> 1%'))
	    .pipe(plugins.minifyCss())
	    .pipe(gulp.dest('./dist/styles/ugly/themes'))

	gulp.src('./src/styles/addons/*.scss')
	    .pipe(plugins.sass())
	    .on('error', catchError)
	    .pipe(plugins.rename(function(path) { path.basename += '.min' }))
	    .pipe(plugins.autoprefixer('last 2 version', '> 1%'))
	    .pipe(plugins.minifyCss())
	    .pipe(gulp.dest('./dist/styles/ugly/addons'))


	// Pretty
	gulp.src('./src/styles/main.scss')
		.pipe(plugins.sass())
		.on('error', catchError)
		.pipe(plugins.concat(name + '.css', { newLine: "\n" }))
		.pipe(plugins.autoprefixer('last 2 version', '> 1%'))
		.pipe(gulp.dest('./dist/styles/pretty'))

	gulp.src('./src/styles/themes/*.scss')
		.pipe(plugins.sass())
		.on('error', catchError)
		.pipe(plugins.rename(function(path) { path.basename += '.css' }))
		.pipe(plugins.autoprefixer('last 2 version', '> 1%'))
		.pipe(gulp.dest('./dist/styles/pretty/themes'))

	gulp.src('./src/styles/addons/*.scss')
		.pipe(plugins.sass())
		.on('error', catchError)
		.pipe(plugins.rename(function(path) { path.basename += '.css' }))
		.pipe(plugins.autoprefixer('last 2 version', '> 1%'))
		.pipe(gulp.dest('./dist/styles/pretty/addons'))
})

gulp.task('scripts', function() {
	// Ugly
	gulp.src('./src/scripts/*.js')
		.pipe(plugins.header(head, { name: name }))
		.pipe(plugins.footer(foot))
		.pipe(plugins.babel())
		.on('error', catchError)
		.pipe(plugins.concat(name + '.min.js', { newLine: "\n" }))
		.pipe(plugins.uglify())
		.on('error', catchError)
		.pipe(gulp.dest('./dist/scripts/ugly'))

	// Pretty
	gulp.src('./src/scripts/*.js')
		.pipe(plugins.header(head, { name: name }))
		.pipe(plugins.footer(foot))
		.pipe(plugins.babel())
		.on('error', catchError)
		.pipe(plugins.concat(name + '.js', { newLine: "\n" }))
		.on('error', catchError)
		.pipe(gulp.dest('./dist/scripts/pretty'))
})




gulp.task('default', ['styles', 'scripts'])

gulp.task('watch', ['styles', 'scripts'], function() {

	gulp.watch('./src/styles/**/*.scss', ['styles'])
	gulp.watch('./src/scripts/**/*.js', ['scripts'])

})