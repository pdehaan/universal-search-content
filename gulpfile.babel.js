import {union} from 'lodash';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import webpack from 'webpack';

import webpackConfig from './webpack.config.js';

const WEBPACK_PROD_PLUGINS = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

webpackConfig.plugins = union(webpackConfig.plugins || [], WEBPACK_PROD_PLUGINS);

gulp.task('eslint', function () {
  return gulp.src(['*.js', 'src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.failOnError());
});

gulp.task('clean:dist', function (callback) {
  del(['dist'], callback);
});

gulp.task('webpack', ['clean:dist'], function (callback) {
  webpack(webpackConfig).run(function (err, stats) {
    callback(err);
  });
});

gulp.task('default', ['build']);
gulp.task('lint', ['eslint']);
gulp.task('build', ['lint', 'webpack']);
