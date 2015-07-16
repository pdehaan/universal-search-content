const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DedupePlugin = webpack.optimize.DedupePlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: './src/main.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Universal Search'
    }),
    new DedupePlugin(),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.html$/, loader: 'mustache' },
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' }
    ]
  },
  devServer: {
    contentBase: './dist',
    https: true
  }
};
