/**
 * Created by meathill on 16/1/16.
 */
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './app',
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  }
};
