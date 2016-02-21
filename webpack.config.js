/**
 * Created by meathill on 16/1/16.
 */
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './app.js',
    injector: './injector.js'
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  },
  externals: {
    "underscore": "_",
    "backbone": "Backbone",
    "jquery": "$",
    "SparkMD5": "SparkMD5",
    "handlebars": "Handlebars"
  },
  devtool: 'source-map'
};
