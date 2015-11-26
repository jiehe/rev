var gulp = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-run-sequence');
var minifyHTML = require('gulp-minify-html');
var override = require('gulp-rev-css-url');
gulp.task('assets', function () {
    return gulp.src('src/**/*.*', {merge: true})
        .pipe(rev())
        .pipe(override())
        .pipe(gulp.dest('release/assets/'))
        .pipe(rev.manifest('assets.json', {merge: true}))
        .pipe(gulp.dest('release/assets'));
});

gulp.task('html', function () {
    return gulp.src(['release/assets/*.json', '*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                //'src/css': 'assets/css',
                //'src/js': 'assets/js',
                //'src/images': 'assets/images',
                'src': 'assets',
                'cdn/': function (manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }))
        .pipe(minifyHTML({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest('release'));
});

gulp.task('release', function () {
    gulpSequence('assets', 'html');
});


/**
 *  用了css， 下面的办法弃用
 */
gulp.task('js', function () {
    return gulp.src('src/js/**/*.js', {merge: true})
        .pipe(rev())
        .pipe(gulp.dest('release/assets/js'))
        .pipe(rev.manifest('js.json', {merge: true}))
        .pipe(gulp.dest('release/assets'));
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*.*', {merge: true})
        .pipe(rev())
        .pipe(gulp.dest('release/assets/images'))
        .pipe(rev.manifest('images.json', {merge: true}))
        .pipe(gulp.dest('release/assets'));
});


