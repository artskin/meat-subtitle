/**
 * Created by meathill on 16/1/16.
 */
var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + 'js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: '/\.js$/',
        exclude: /(node_module|bower_components|js)/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true
        }
      }
    ]
  }
};
