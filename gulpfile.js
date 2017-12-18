var gulp = require('gulp'),
		gulpSass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		uglifycss = require('gulp-uglifycss'),
		extender = require('gulp-html-extend'),
		broeserSync = require('browser-sync');

gulp.task('browser-sync', ['rebuild'], function() {
  return broeserSync({
    files: "**",
    server: {
      baseDir: './',
      index:'index.html'
    },

    port: 8080,
    host: '0.0.0.0',
    ui: {
      port: 8081
    }
  });
});

gulp.task('rebuild', function() {
  return broeserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(['./dist/*.*'], ['rebuild']);
  gulp.watch(['./html/*.html'], ['build_html']);
  gulp.watch(['./scss/*/*.scss','./scss/*.scss'], ['make:scss']);
});

gulp.task('build_html', function() {
	return gulp.src('./html/index.html').pipe(extender({
	      annotations: false,
	      verbose: false
	    })).pipe(gulp.dest('./'));
});



// // make scss to css file
gulp.task('make:scss',function(){
	return gulp.src('scss/style.scss')
        .pipe(gulpSass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
}); 


// combine and uglify css to one
gulp.task('uglify:css', ['make:scss'], function(){
	return gulp.src([
			'css/style.css'
		])
		.pipe(concat('style.min.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('css'));
});

// combine and uglify plugin-js to one file
gulp.task('uglify:plugin-js', ['uglify:css'], function(){
	return gulp.src([
			'vendor/modernizr/modernizr.js',
			'vendor/jquery/jquery-1.10.2.min.js',
			'vendor/bootstrap/js/bootstrap.min.js',
			'vendor/bootstrap-validator/validator.min.js',
			'vendor/breakpoint/breakpoint.js',
			'vendor/count-to/jquery.countTo.js',
			'vendor/countdown/jquery.countdown.js',
			'vendor/easing/jquery.easing.1.3.js',
			'vendor/easy-pie-chart/jquery.easypiechart.min.js',
			'vendor/elasic-slider/jquery.eislideshow.js',
			'vendor/flex-slider/jquery.flexslider-min.js',
			'vendor/gmap/jquery.gmap.min.js',
			'vendor/images-loaded/imagesloaded.js',
			'vendor/isotope/jquery.isotope.js',
			'vendor/magnific-popup/jquery.magnific-popup.min.js',
			'vendor/mailchimp/jquery.ajaxchimp.min.js',
			'vendor/menuzord/menuzord.js',
			'vendor/nav/jquery.nav.js',
			'vendor/owl-carousel/owl.carousel.min.js',
			'vendor/parallax-js/parallax.min.js',
			'vendor/smooth/smooth.js',
			'vendor/sticky/jquery.sticky.min.js',
			'vendor/touchspin/touchspin.js',
			'vendor/typist/typist.js',
			'vendor/visible/visible.js',
			'vendor/wow/wow.min.js',
			'js/scripts.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});

// uglify main-js
gulp.task('uglify:main-js', ['uglify:plugin-js'], function(){
	return gulp.src([
			'js/index.js'
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
});


// gulp.task('build',['uglify:main-js']);

gulp.task('default', ['browser-sync', 'watch']);