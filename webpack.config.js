const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: './src/boot.js',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      async: 'list-item',
      chunks: ['list', 'item']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'item-user',
      chunks: ['item', 'user']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'commons',
      minChunks: 2
    }),
    new MinifyPlugin()
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["env", {
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ],
            plugins: [
              'syntax-dynamic-import',
              'transform-object-rest-spread'
            ]
          }
        }
      }
    ]
  }
};
