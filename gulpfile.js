/**
 * Created by meathill on 16/2/28.
 */
'use strict';

var gulp = require('gulp')
  , gUtil = require('gulp-util')
  , handlebars = require('gulp-handlebars')
  , wrap = require('gulp-wrap')
  , declare = require('gulp-declare')
  , fs = require('fs')
  , vinylBuffer = require('vinyl-buffer')
  , source = require('vinyl-source-stream')
  , runSequence = require('run-sequence')
  , _ = require('underscore')
  , webpack = require('webpack')
  , script_reg = /<script([^>]*)>([\S\s]+?)<\/script>/g;

gulp.task('templates', function () {
  let promise = new Promise( (resolve, reject) => {
    fs.readFile('popup.html', { encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  return promise.then( (content) => {
    content.replace(script_reg, (match, attr, template) => {
      attr = _.chain(attr.split(' '))
        .map( (item) => {
          let pair = item.split('=');
          if (pair.length === 1) {
            pair[1] = true;
          } else {
            pair[1] = pair[1].replace(/^"|"$/g, '');
          }
          return pair;
        })
        .object()
        .value();
      if (attr.type && attr.type.match(/handlebars-template/)) {
        let stream = source(attr['data-name']);
        stream.write(template.replace(/\s{2}|\n|\r/g, ''));
        process.nextTick(function () {
          stream.end();
        });
        stream
          .pipe(vinylBuffer())
          .pipe(handlebars())
          .pipe(wrap('let ' + attr['data-name'] + ' = Handlebars.template(<%= contents %>);\n' +
            'export default ' + attr['data-name'] + ';'))
          .pipe(gulp.dest('src/template'));
      }
      return '';
    });
  });
});

gulp.task('webpack', function (callback) {
  webpack({

  }, function (err, stats) {
    if (err) {
      throw new gUtil.PluginError('webpack', err);
    }
    gUtil.log('[webpack]', stats.toString());
    callback();
  })
});

gulp.task('default', function (taskDone) {
  runSequence(
    'templates',
    'webpack',
    taskDone
  );
});