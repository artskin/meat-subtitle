/**
 * Created by meathill on 16/2/28.
 */
var gulp = require('gulp')
  , handlebars = require('gulp-handlebars')
  , wrap = require('gulp-wrap')
  , declare = require('gulp-declare')
  , fs = require('fs')
  , script_reg = /<script([^>]*)>([\S\s]+)<\/script>/g;

gulp.task('templates', function () {
  let promise = new Promise(function (resolve, reject) {
    fs.readFile('popup.html', { encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
  promise.then(function (content) {
    content.replace(script_reg, function (match, attr, template) {
      attr = _.chain(attr.split(' '))
        .map(function (item) {
          let pair = item.split('=');
          if (pair.length === 1) {
            pair[1] = true;
          }
          return pair;
        })
        .object()
        .value();
      if (attr.type && attr.type.match(/handlebars-template/)) {

      }
    });

  });
});