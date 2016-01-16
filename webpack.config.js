/**
 * Created by meathill on 16/1/16.
 */

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: '/\.css$/',
        loader: 'style!css'
      },
      {
        test: '/\.js$/',
        exclude: /node_module/,
        loader: 'babel-loader'
      }
    ]
  }
};
